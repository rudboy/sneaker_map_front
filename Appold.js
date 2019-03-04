import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import { Constants, Google } from "expo";

// You can import from local files
import AssetExample from "./components/AssetExample";

const googleCreds = {
  androidClientID:
    "218040000398-uku3des2hbqfsfsc02mqrfv1lgglibbt.apps.googleusercontent.com",
  iosClientID: ""
};

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInProgress: false
    };
  }
  onGoogleSignIn = async () => {
    console.log("Trying google sign in");

    this.setState({ loginInProgress: true });
    try {
      const result = await Google.logInAsync({
        androidClientId: googleCreds.androidClientID,
        iosClientId: googleCreds.iosClientID,
        scopes: ["profile", "email"]
      });
      console.log({ result });
      this.setState({ loginInProgress: false });
      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log({ e });
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login in With Google" onPress={this.onGoogleSignIn} />
        {this.state.loginInProgress ? <ActivityIndicator /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  }
});
