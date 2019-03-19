import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { withNavigationFocus } from "react-navigation";
import axios from "axios"; // const axios = require('axios');
import Picker_mark from "../components/picker_mark";
import Picker_category from "../components/picker_category";
import Picker_model from "../components/picker_model";
import Picker_size from "../components/picker_size";
import Input_price from "../components/input_price";
import Etat from "../components/etat";
import Add_photo from "../components/Add_photo";
import GeoLocalisation from "../components/GeoLocalisation";

const jordan = require("../assets/json/Jordan/Jordan.json");
const initialState = {
  mark: null,
  tab_model: [],
  tab_async: [],
  tabcategory: [],
  tabsize: [],
  category: null,
  model: null,
  index: 0,
  childindex: "",
  neuf: true,
  usager: false,
  price: null,
  size: null,
  tab_location: null,
  title: null,
  styleID: null,
  tab_photo: [],
  url: ""
};

class NewProduct extends React.Component {
  state = {
    mark: null,
    tab_model: [],
    tab_async: [],
    tabcategory: [],
    tabsize: [],
    category: null,
    model: null,
    index: 0,
    childindex: "",
    neuf: true,
    usager: false,
    price: null,
    size: null,
    tab_location: null,
    title: null,
    styleID: null,
    tab_photo: [],
    url: "",
    token: null
  };

  Get_Category = mark => {
    //console.log(this.state.mark);
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
    //console.log("Switch 1 is: " + value);
  };
  reset_state = () => {
    this.setState(initialState);
  };

  addToDB = async () => {
    if (
      this.state.title === null ||
      this.state.price === null ||
      this.state.size === null
    ) {
      alert("Veuillez Remplir tous les Champs");
    } else if (this.state.tab_photo.length !== 0) {
      try {
        // On charge les données ici
        const response = await axios.post(
          "https://sneaker-map-api.herokuapp.com/create_product",
          {
            title: this.state.title,
            description: this.state.title,
            price: this.state.price,
            size: this.state.size,
            etat: this.state.neuf ? this.state.neuf : false,
            localisation: [
              this.state.tab_location.coords.latitude,
              this.state.tab_location.coords.longitude
            ],
            id_style: this.state.styleID,
            pictures: this.state.tab_photo
          },
          {
            headers: {
              authorization: "Bearer " + this.state.token
            }
          }
        );
        if (response.data.creator._id) {
          this.reset_state();
          this.props.navigation.navigate("Home", { reload: "reload" });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // On charge les données ici
        const response = await axios.post(
          "https://sneaker-map-api.herokuapp.com/create_product",
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
            id_style: this.state.styleID,
            pictures: [this.state.url]
          },
          {
            headers: {
              authorization: "Bearer " + this.state.token
            }
          }
        );
        if (response.data.creator._id) {
          this.reset_state();
          this.props.navigation.navigate("Home", { realod: "realod" });
        }
      } catch (error) {
        console.log(error);
      }

      //alert("Vous devais ajouter au moin une photo de la Sneaker a vendre");
    }
  };

  get_size_db = size => {
    this.setState({ size: size });
  };
  get_title = (title, styleID) => {
    this.setState({ title: title, styleID: styleID });
  };
  get_location = location => {
    // console.log("toto", location);
    this.setState({ tab_location: location });
  };
  get_price = price => {
    this.setState({ price: price });
  };
  get_photo = tab => {
    this.setState({ tab_photo: tab });
  };
  getURL = url => {
    this.setState({ url: url });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.principal}>
          <View style={{ marginBottom: 40 }}>
            <Text style={styles.text}>Ajouter une Sneaker a Vendre</Text>
          </View>
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
            getURL={this.getURL}
            childindex={this.state.childindex}
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
          <Input_price get_price={this.get_price} price={this.state.price} />
          <Add_photo
            get_photo={this.get_photo}
            tab_photo={this.state.tab_photo}
          />
          <GeoLocalisation
            get_location={this.get_location}
            location={this.state.tab_location}
            title={this.state.title}
            url={this.state.url}
          />
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

  componentDidMount = async () => {
    try {
      // On charge les données ici
      for (let i = 0; i < jordan.length; i++) {
        const response = await axios.get(
          "http://sneakersmap.fr/sneaker_map/jordan/" +
            jordan[i].value +
            ".json"
        );
        const value = JSON.stringify(response.data);
        await AsyncStorage.setItem(jordan[i].value, value);
      }
    } catch (error) {
      console.log(error);
    }

    let tempToken = await AsyncStorage.getItem("userInfo");
    tempToken = JSON.parse(tempToken);
    this.setState({ token: tempToken.token });
    //console.log(this.state.token);
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#212429",
    color: "white"
  },
  principal: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
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

export default withNavigationFocus(NewProduct);
