import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";
import SneakerCard from "../components/SneakerCard";
import { MaterialIcons } from "@expo/vector-icons";
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
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.searchbar}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="What do you want ?"
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 40
            }}
            onPress={() => console.log("Pressed!")}
          >
            <View>
              <MaterialIcons name="filter-variant" size={32} color="green" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 40
            }}
            onPress={() =>
              this.props.navigation.navigate("Filter", { name: "Jane" })
            }
          >
            <View>
              <MaterialIcons name="filter-variant" size={32} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <PriceSelect />
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
    textAlign: "center"
  },
  iconsearch: {
    marginTop: 300
  }
});

export default HomeScreen;
