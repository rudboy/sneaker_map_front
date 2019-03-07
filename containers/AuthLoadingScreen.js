import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    this.props.navigation.navigate(userInfo ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
