import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios"; // const axios = require('axios');
import { Constants, Google, Expo } from "expo";
import HomeScreen from "./HomeScreen";

const googleCreds = {
  androidClientID:
    "218040000398-cvv2mgdrhhber8m0tn66uc4mj37uu8jm.apps.googleusercontent.com",
  iosClientID:
    "489426297462-t2b25so438okp7j0t7rhi6vhn36g981i.apps.googleusercontent.com",
};

export default class App extends React.Component {
  state = {
    user: "",
    password: "",
    loginInProgress: false,
    ignedIn: false,
    name: "",
    photoUrl: "",
  };

  onGoogleSignIn = async () => {
    console.log("Trying google sign in");

    this.setState({ loginInProgress: true });
    try {
      const result = await Google.logInAsync({
        androidClientId: googleCreds.androidClientID,
        iosClientId: googleCreds.iosClientID,
        scopes: ["profile", "email"],
      });
      console.log({ result });
      this.setState({ loginInProgress: false });
      if (result.type === "success") {
        this.setState({
          ignedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
        });
        const value = JSON.stringify(result.user);
        alert("Login OK");
        await AsyncStorage.setItem("userInfo", value);

        return result.accessToken;
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
      const response = await axios.post("http://192.168.0.32:5500/login", {
        email: this.state.user,
        password: this.state.password,
      });
      if (response.data.token) {
        const value = JSON.stringify(response.data);
        alert("Login OK");
        await AsyncStorage.setItem("userInfo", value);
      } else {
        await AsyncStorage.setItem("userInfo", "");
      }

      //console.log(response.data);
    } catch (error) {
      alert(error.message);
    }
    // console.log(await AsyncStorage.getItem("userInfo"));
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <HomeScreen />
          <TextInput
            style={styles.input}
            onChangeText={user => this.setState({ user })}
            value={this.state.user}
          />
          <TextInput
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.onPress} style={styles.button}>
            <Text>Valider</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onGoogleSignIn}>
            {this.state.loginInProgress ? <ActivityIndicator /> : null}
            <Image
              style={{
                width: 50,
                height: 50,
                marginLeft: 10,
              }}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
              }}
            />
            <Text>Login in With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={{ color: "#fff" }}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
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
  },
  button: {
    backgroundColor: "white",
    height: 50,
    width: 150,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    fontSize: 20,
    width: 200,
    height: 50,
    borderRadius: 10,
    color: "white",
  },
});
