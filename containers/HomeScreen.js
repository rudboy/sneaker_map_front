import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Text,
  ScrollView
} from "react-native";
import SneakerCard from "../components/SneakerCard";
import { Ionicons } from "@expo/vector-icons";
import PriceSelect from "../components/PriceSelect";
import axios from "axios"; // const axios = require('axios');

let arrayholder = [];

class HomeScreen extends React.Component {
  state = {
    sneakers: [],
    isLoading: true
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Welcome"
  });

  async componentDidMount() {
    return await fetch("https://sneaker-map-api.herokuapp.com/all_product")
      .then(response => response.json())
      .then(responseJson => {
        // console.log("responseJson ", responseJson);
        const reverse = responseJson.reverse();
        this.setState(
          {
            isLoading: false,
            sneakers: reverse
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
  update = async () => {
    const response = await axios.get(
      "https://sneaker-map-api.herokuapp.com/all_product"
    );

    if (response.data.length > this.state.sneakers.length) {
      const reverse = response.data.reverse();
      this.setState({ sneakers: reverse }, function() {
        arrayholder = response.data;
      });
    }
  };

  // reload = () => {
  //   this.setState({
  //     reload: true
  //   });
  // };

  render() {
    this.update();

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
        <ScrollView>
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
                    this.props.navigation.navigate("Product", {
                      id: obj.item._id
                    });
                  }}
                >
                  <SneakerCard sneaker={obj.item} itemOfList={true} />
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

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

export default HomeScreen;
