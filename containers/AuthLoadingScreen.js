import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import Axios from "axios";

class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      const response = await Axios.get(
        "https://sneaker-map-api.herokuapp.com/get_my_user_info?token=" +
          userInfo.token
      );
      console.log("response ", response.data);

      if (response.data === undefined) {
        this.props.navigation.navigate("Auth");
      } else {
        this.props.navigation.navigate("App");
      }
    } else {
      this.props.navigation.navigate("Auth");
    }
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
