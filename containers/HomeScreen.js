import React from "react";
import { Text, View } from "react-native";

class HomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    const name = navigation.getParam("name");
    return (
      <View>
        <Text>Home</Text>
        <Text>Bienvenue {name}</Text>
      </View>
    );
  }
}

export default HomeScreen;
