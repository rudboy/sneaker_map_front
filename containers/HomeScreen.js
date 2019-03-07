import React from "react";
import { Text, View, Button, AsyncStorage } from "react-native";

class HomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    const name = navigation.getParam("name");
    // const userInfo = navigation.getParam("userInfo");

    const user = AsyncStorage.getItem("userInfo");
    console.log("User :", user);

    return (
      <View>
        <Button
          onPress={() => {
            AsyncStorage.setItem("userInfo", "");
            this.props.navigation.navigate("SignIn");
          }}
          title="Se déconnecter"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text>Home</Text>
        <Text>Bienvenue {name}</Text>
        <Text>Photo :</Text>
        {/* <Image
          source={{ uri: userInfo.picture.data.url }}
          style={{ width: 45, height: 45, borderRadius: 23 }}
        /> */}
      </View>
    );
  }
}

export default HomeScreen;
