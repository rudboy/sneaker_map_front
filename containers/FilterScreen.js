import React from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from "react-native";
import axios from "axios"; // const axios = require('axios');
import Picker_mark from "../components/picker_mark";
import Picker_category from "../components/picker_category";
import Picker_model from "../components/picker_model";
import Picker_size from "../components/picker_size";
import Etat from "../components/etat";
import PriceSelect from "../components/PriceSelect";

const jordan = require("../assets/json/Jordan/Jordan.json");

class FilterScreen extends React.Component {
  state = {
    mark: "",
    tab_model: [],
    tab_async: [],
    tabcategory: [],
    tabsize: [],
    category: "",
    model: "",
    index: 0,
    neuf: true,
    usager: false,
    price: "",
    size: "",
    tab_location: "",
    title: "",
    styleID: ""
  };

  Get_Category = mark => {
    if (mark === "Jordan") {
      this.setState({
        tabcategory: require("../assets/json/Jordan/Jordan.json")
      });
    }
  };
  Get_Model = async category => {
    for (let i = 0; i < jordan.length; i++) {
      if (category === jordan[i].value) {
        this.setState({
          tab_async: await AsyncStorage.getItem(category)
        });
        this.setState({ tab_async: JSON.parse(this.state.tab_async) });
        this.setState({ tab_model: this.state.tab_async });
      }
    }
  };
  Get_Size = () => {
    if (this.state.mark !== "Adidas") {
      let temp = require("../assets/json/size.json");
      this.setState({ tabsize: temp });
    }
  };
  toggleSwitch = value => {
    this.setState({ neuf: value, usager: !value });
    console.log("Switch 1 is: " + value);
  };

  addToDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/create_product",
        {
          title: this.state.title,
          description: this.state.title,
          price: this.state.price,
          size: this.state.size,
          etat: this.state.neuf ? this.state.neuf : this.state.usager,
          localisation: [
            this.state.tab_location.coords.latitude,
            this.state.tab_location.coords.longitude
          ],
          id_style: this.state.styleID
        },
        {
          headers: {
            authorization:
              "Bearer " +
              "QgYUcG9McBGs4qPzPuohYTawoLK5tD4BB6gHb0uUOb0MrsxjSvAHGwvKIN9ff5Yn"
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  get_size_db = size => {
    this.setState({ size: size });
  };
  get_title = (title, styleID) => {
    this.setState({ title: title, styleID: styleID });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.principal}>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "400",
              marginBottom: 30
            }}
          >
            TRIER PAR
          </Text>
          <Picker_mark Get_Category={this.Get_Category} />
          <Picker_category
            Get_Model={this.Get_Model}
            tabcategory={this.state.tabcategory}
          />
          <Picker_model
            index={this.state.index}
            tab_model={this.state.tab_model}
            category={this.state.category}
            Get_Size={this.Get_Size}
            get_title={this.get_title}
          />
          <Picker_size
            tab_size={this.state.tabsize}
            get_size_db={this.get_size_db}
            size={this.state.size}
          />
          <Etat
            switchValue={this.state.neuf}
            switchValue2={this.state.usager}
            toggleSwitch={this.toggleSwitch}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              marginRight: 10,
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Prix
          </Text>
          <PriceSelect />
          <TouchableOpacity style={styles.valider} onPress={this.addToDB}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "600"
              }}
            >
              VALIDER
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    paddingTop: 30
  },
  principal: {
    justifyContent: "center",
    alignItems: "center"
  },
  sizeselect: {
    height: 100,
    width: 300
  },
  text: {
    fontSize: 25,
    fontWeight: "600",
    color: "white"
  },
  valider: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 20,
    height: 40,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  }
});

export default FilterScreen;
