import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image
} from "react-native";
import axios from "axios"; // const axios = require('axios');
import { Constants, Google, Expo } from "expo";

const googleCreds = {
  androidClientID:
    "218040000398-cvv2mgdrhhber8m0tn66uc4mj37uu8jm.apps.googleusercontent.com",
  iosClientID:
    "489426297462-t2b25so438okp7j0t7rhi6vhn36g981i.apps.googleusercontent.com" // cette clé n'est plus valide
};

export default class LogIn extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    loginInProgress: false,
    signedIn: false,
    photoUrl: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  onGoogleSignIn = async () => {
    this.setState({ loginInProgress: true });
    try {
      const result = await Google.logInAsync({
        androidClientId: googleCreds.androidClientID,
        iosClientId: googleCreds.iosClientID,
        scopes: ["profile", "email"]
      });
      // console.log("result user : ", result.user);
      // console.log("result idToken : ", result.idToken);
      // console.log("result : ", result);
      this.setState({ loginInProgress: false });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          email: result.user.email,
          photoUrl: result.user.photoUrl
        });

        const user = JSON.stringify(result.user);

        console.log("password ", result.idToken);
        // Si l'email est dans la BDD : connexion et redirection vers le home screen

        // Quand je teste; le serveur me renvoie une erreur 400
        const response = await axios.post(
          "http://localhost:5500/google_connection",
          {
            familyName: result.user.familyName,
            givenName: result.user.givenName,
            username: result.user.name,
            email: result.user.email,
            password: result.idToken
          }
        );
        console.log("response.data.token : ", response.data); // ce console log n'apparaît pas

        if (response.data.token) {
          const value = JSON.stringify(response.data);
          alert("Login OK");
          await AsyncStorage.setItem("userInfo", value);
          this.props.navigation.navigate("Home"); // redirige vers l'écran d'accueil
        }
        // Sinon : création de compte via l'api
        else {
          //
        }

        // console.log("user ", user);
        // alert("Login OK");
        await AsyncStorage.setItem("userInfo", user);
        // redirige vers la page d'accueil :
        // this.props.navigation.navigate("Home", { googleUserInfo: result.user });
        // return result.accessToken;
      } else {
        await AsyncStorage.setItem("userInfo", "");

        return { cancelled: true };
      }
    } catch (e) {
      console.log({ e });
      return { error: true };
    }
  };

  onPress = async () => {
    try {
      //console.log(this.state.user, this.state.password);
      // On charge les données ici
      const response = await axios.post("http://localhost:5500/login", {
        email: this.state.email,
        password: this.state.password
      });
      if (response.data.token) {
        const value = JSON.stringify(response.data);
        alert("Login OK");
        await AsyncStorage.setItem("userInfo", value);

        // redirige vers la page d'accueil :
        this.props.navigation.navigate("Home");
      } else {
        await AsyncStorage.setItem("userInfo", "");
        alert(response.data); // ici `response.data`renvoie le message `erreur dans l'adresse email`
        this.setState({ password: "" });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={100}
          style={styles.container}
        >
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Votre email"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Votre mot de passe"
            placeholderTextColor="white"
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.onPress} style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("SignUp")}>
            {/* navigate = destructuring de `this.props.navigation` (voir ligne 103) */}
            <Text style={{ color: "white" }}>
              Pas encore inscrit ? Créez un compte
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 45
            }}
          >
            <View style={styles.separator} />
            <Text style={{ color: "white", marginHorizontal: 10 }}>Ou</Text>
            <View style={styles.separator} />
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around"
            }}
            onPress={this.onGoogleSignIn}
          >
            {this.state.loginInProgress ? <ActivityIndicator /> : null}
            <Image
              style={{
                width: 35,
                height: 35
              }}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              }}
            />
            <Text style={{ color: "white" }}>
              Se connecter ou s'inscrire avec Google
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  button: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600"
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
    height: 50,
    borderRadius: 10,
    color: "white"
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "white"
  }
});
