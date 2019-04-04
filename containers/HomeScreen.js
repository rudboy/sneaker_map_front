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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios"; // const axios = require('axios');

let arrayholder = [];

class HomeScreen extends React.Component {
  state = {
    sneakers: [],
    isLoading: true
  };

  async componentDidMount() {
    try {
      this._navListener = this.props.navigation.addListener(
        "didFocus",
        async () => {
          return await fetch(
            "https://sneaker-map-api.herokuapp.com/all_product"
          )
            .then(response => response.json())
            .then(responseJson => {
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
      );
    } catch (error) {}
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

  render() {
    // this.update();

    if (this.state.isLoading === true) {
      return <ActivityIndicator />;
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            position: "relative",
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TextInput
            style={styles.searchbar}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Que recherchez-vous ?"
          />
          <TouchableOpacity
            style={{ marginTop: 30 }}
            onPress={() =>
              this.props.navigation.navigate("Filter", { name: "Filtres" })
            }
          >
            <MaterialIcons
              style={{
                color: "grey",
                marginTop: 30,
                marginLeft: 10
              }}
              name="playlist-add"
              size={35}
            />
            <Text style={{ marginLeft: 5, color: "grey", fontWeight: "400" }}>
              Avancer
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
    backgroundColor: "white",
    flex: 1,
    marginLeft: 10
  },
  searchbar: {
    width: Dimensions.get("window").width - 100,
    height: 50,
    backgroundColor: "white",
    textAlign: "center",
    marginTop: 50,
    borderBottomColor: "grey",
    borderBottomWidth: 1
  }
});

export default HomeScreen;
