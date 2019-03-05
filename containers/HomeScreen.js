import React from "react";
import { Text, View, Image } from "react-native";

class HomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    const name = navigation.getParam("name");
    const userInfo = navigation.getParam("userInfo");
    return (
      <View>
        <Text>Home</Text>
        <Text>Bienvenue {name}</Text>
        <Text>Photo :</Text>
        <Image
          // source={{ uri: userInfo.picture.data.url }}
          style={{ width: 45, height: 45, borderRadius: 23 }}
        />
      </View>
    );
  }
}

export default HomeScreen;
