import React from "react";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Google } from "expo";

const googleCreds = {
  androidClientID:
    "218040000398-cvv2mgdrhhber8m0tn66uc4mj37uu8jm.apps.googleusercontent.com",
  iosClientID:
    "489426297462-t2b25so438okp7j0t7rhi6vhn36g981i.apps.googleusercontent.com",
};

class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Inscription   ",
      headerStyle: {
        backgroundColor: "#111111",
      },
      headerTintColor: "#fff",
    };
  };

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

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          style={styles.bottomContainer}
          behavior="padding"
        >
          <TextInput
            autoCapitalize="none"
            style={styles.textInputSignUp}
            placeholder="Nom"
            placeholderTextColor="#fff"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInputSignUp}
            placeholder="Prénom"
            placeholderTextColor="#fff"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInputSignUp}
            placeholder="Username *"
            placeholderTextColor="#fff"
          />
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.textInputSignUp}
            placeholder="Email *"
            placeholderTextColor="#fff"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInputSignUp}
            placeholder="Téléphone"
            placeholderTextColor="#fff"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInputSignUp}
            placeholder="Password *"
            placeholderTextColor="#fff"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.textInputSignUp}
            placeholder="Confirm password *"
            placeholderTextColor="#fff"
          />
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonTextSignUp}>S'inscrire</Text>
          </TouchableOpacity>

          <View style={styles.or}>
            <Text style={styles.separator} />
            <Text style={{ color: "#fff" }}>OU</Text>
            <Text style={styles.separator} />
          </View>

          <TouchableOpacity
            onPress={this.onGoogleSignIn}
            style={styles.googleContainer}
          >
            {this.state.loginInProgress ? <ActivityIndicator /> : null}
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
              }}
            />
            <Text style={styles.googleConnectText}>S'inscrire avec Google</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    flex: 1,
    paddingHorizontal: 15,
  },
  bottomContainer: {
    flex: 1,
    // alignItems: "center"
  },
  textInputSignUp: {
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: "#fff",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
  buttonSignUp: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  buttonTextSignUp: {
    textAlign: "center",
  },
  or: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  separator: {
    width: "42%",
    height: 1,
    backgroundColor: "#fff",
    marginHorizontal: 15,
  },
  googleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  googleConnectText: {
    color: "#fff",
    marginLeft: 20,
  },
});

export default SignUpScreen;
