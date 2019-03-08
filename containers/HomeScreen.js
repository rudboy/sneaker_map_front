import React from "react";
<<<<<<< HEAD
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Text
} from "react-native";
import SneakerCard from "../components/SneakerCard";
import { Ionicons } from "@expo/vector-icons";
import PriceSelect from "../components/PriceSelect";

class HomeScreen extends React.Component {
  state = {
    sneakers: [],
    isLoading: true
  };

  arrayholder = [];

  static navigationOptions = ({ navigation }) => ({
    title: "Welcome"
  });

  componentDidMount() {
    return fetch("http://localhost:5500/all_product")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            sneakers: responseJson
          },
          function() {
            arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  SearchFilterFunction(text) {
    const newData = arrayholder.filter(function(item) {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      sneakers: newData,
      text: text
    });
  }

  render() {
    if (this.state.isLoading === true) {
      return <ActivityIndicator />;
    }

    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              color: "white",
              marginTop: 30,
              fontSize: 30,
              fontWeight: "500"
            }}
          >
            Bienvenue
          </Text>
        </View>
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.searchbar}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Que recherchez-vous ?"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "grey",
              fontSize: 15,
              fontWeight: "500",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              marginBottom: 10
            }}
            onPress={() =>
              this.props.navigation.navigate("Filter", { name: "Filtres" })
            }
          >
            <Text
              style={{
                color: "white"
              }}
            >
              FILTRER
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            numColumns={2}
            data={this.state.sneakers}
            keyExtractor={item => {
              return String(item._id);
            }}
            renderItem={obj => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Sneaker", {
                      id: obj.item._id
                    });
                  }}
                >
                  <SneakerCard sneaker={obj.item} itemOfList={true} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
=======
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
>>>>>>> pulled master branch from github
      </View>
    );
  }
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center"
  },
  searchbar: {
    width: Dimensions.get("window").width,
    height: 50,
    backgroundColor: "white",
    textAlign: "center",
    marginTop: 20
  }
});

=======
>>>>>>> pulled master branch from github
export default HomeScreen;
