import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text
} from "react-native";
import Axios from "axios";
const marque = require("../assets/json/marque.json");

class AuthLoadingScreen extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo) {
      const response = await Axios.get(
        "https://sneaker-map-api.herokuapp.com/get_my_user_info?token=" +
          userInfo.token
      );
      //console.log("response ", response.data);

      if (response.data === undefined) {
        this.props.navigation.navigate("Auth");
      } else {
        this.CheckUpdate();
      }
    } else {
      this.props.navigation.navigate("Auth");
    }
  };

  CheckUpdate = async () => {
    let curent_version = await AsyncStorage.getItem("version");
    curent_version = JSON.parse(curent_version);
    //console.log(curent_version);
    try {
      const response = await Axios.get(
        "http://sneakersmap.fr/sneaker_map/update/version.json"
      );
      // console.log(response.data.version);
      if (Number(curent_version) !== Number(response.data.version)) {
        await AsyncStorage.setItem("version", response.data.version);
        // On charge les données ici
        for (let i = 0; i < marque.length; i++) {
          const TabCate = await Axios.get(
            "http://sneakersmap.fr/sneaker_map/" +
              marque[i].value +
              "/" +
              marque[i].value +
              ".json"
          );
          const value = JSON.stringify(TabCate.data);
          //sauvegarde de category ds l'asyncstorage
          await AsyncStorage.setItem("category" + marque[i].value, value);
          //console.log(value);
          for (let x = 0; x < TabCate.data.length; x++) {
            // console.log(
            //   "http://sneakersmap.fr/sneaker_map/" +
            //     marque[i].value +
            //     "/" +
            //     TabCate.data[x].value +
            //     ".json"
            // );
            const Tabmodele = await Axios.get(
              "http://sneakersmap.fr/sneaker_map/" +
                marque[i].value +
                "/" +
                TabCate.data[x].value +
                ".json"
            );
            const value = JSON.stringify(Tabmodele.data);
            //sauvegarde de modele ds l'asyncstorage

            await AsyncStorage.setItem("modele" + TabCate.data[x].value, value);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({ isLoading: false });
    this.props.navigation.navigate("App");
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <StatusBar barStyle="light-content" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: "grey",
              marginBottom: 20
            }}
          >
            Mise a jour en cours
          </Text>
          <ActivityIndicator size="large" color="#111" />
        </View>
      );
    }
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
