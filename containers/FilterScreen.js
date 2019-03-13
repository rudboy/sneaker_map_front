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
import Picker_mark from "../components/filter_pickerMark";
import Picker_category from "../components/filter_pickerCategory";
import Picker_model from "../components/filter_pickerModel";
import Picker_size from "../components/picker_size";
import Etat from "../components/etat";
import PriceSelect from "../components/PriceSelect";
import SizeSelect from "../components/filter_pickerSize";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import geolib from "geolib";

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
    price: [0, 1000],
    size: "",
    tab_location: "",
    title: "",
    styleID: "",
    url: "",
    latitude: "",
    longitude: "",
    localisationTab: []
  };

  // checks if 51.525, 7.4575 is within a radius of 5km from 51.5175, 7.4678
  // triGeoloc = () => {
  //   return geolib.isPointInCircle(
  //     { latitude: 48.874883, longitude: 2.373836 },
  //     { latitude: this.state.latitude, longitude: this.state.longitude },
  //     5000
  //   );
  // };

  triGeoloc = tableau => {
    console.log(tableau[0].localisation[0]);
    for (let i = 0; i < tableau.length; i++) {
      let lat = tableau[i].localisation[0];
      let lon = tableau[i].localisation[1];
      var points = [{ latitude: lat, longitude: lon }];
      var everyPointInCircle = points.some(point => {
        return geolib.isPointInCircle(
          point,
          {
            latitude: Number(this.state.latitude),
            longitude: Number(this.state.longitude)
          },
          5000
        );
      });
      console.log(everyPointInCircle);
      if (everyPointInCircle === true) {
        let temptab = [...this.state.localisationTab];
        console.log(tableau[i]);
        temptab.push(tableau[i]);
        this.setState({ localisationTab: temptab });
      }
    }
    if (this.state.localisationTab.length !== 0) {
      this.props.navigation.navigate("ResultView", {
        result: this.state.localisationTab
      });
    } else {
      this.props.navigation.navigate("ResultView", {
        result: this.state.tab_location
      });
    }
    //console.log(this.state.localisationTab);
  };

  GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="Entrer une Adresse de localisation"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          let coords = {
            coords: {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            }
          };
          // this.props.get_location(coords);
          // this.props.mapViewer(coords);
          this.setState({
            latitude: coords.coords.latitude,
            longitude: coords.coords.longitude
          });
          // console.log(coords);
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyB1o6dYvykmEjwLDrttX6GWu1rGZQFa-Us",
          language: "fr", // language of the results
          types: "geocode" // default: ''(cities)
        }}
        styles={{
          textInputContainer: {
            width: "100%",
            backgroundColor: "white"
          },
          textInput: {
            backgroundColor: "#2d2d2d",
            height: 30,
            color: "white"
          },
          description: {
            fontWeight: "bold",
            color: "white"
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Position Actuel"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          type: "cafe"
        }}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: "formatted_address"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        //predefinedPlaces={[homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderLeftButton={() => (
        //   <Image source={require("../assets/images/google-plus.png")} />
        // )}
        // renderRightButton={() => <Text>Custom text after the input</Text>}
      />
    );
  };

  Get_Category = mark => {
    if (mark === "Jordan") {
      this.setState({
        tabcategory: require("../assets/json/Jordan/Jordan.json")
      });
    }
    this.setState({ mark: mark });
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
      this.setState({ category: category });
    }
  };
  Get_Size = () => {
    if (this.state.mark !== "Adidas") {
      let temp = require("../assets/json/size.json");
      this.setState({ tabsize: temp });
    }
  };
  toggleSwitch = value => {
    this.setState({ neuf: value });
    //console.log("Switch 1 is: " + value);
  };

  toggleSwitch2 = value => {
    this.setState({ usager: value });
  };

  getinfo = async () => {
    let token = await AsyncStorage.getItem("userInfo");
    token = JSON.parse(token);

    try {
      let findThisText = "";
      if (
        this.state.model === "" &&
        this.state.category === "" &&
        this.state.mark !== ""
      ) {
        findThisText = this.state.mark;
      } else if (
        this.state.model === "" &&
        this.state.category !== "" &&
        this.state.mark !== ""
      ) {
        findThisText = this.state.category;
      } else {
        findThisText = this.state.model;
      }
      const response = await axios.post(
        "https://sneaker-map-api.herokuapp.com/Product",
        {
          title: findThisText,
          size: this.state.size,
          etat:
            this.state.neuf && this.state.usager
              ? ""
              : this.state.neuf
              ? this.state.neuf
              : this.state.usager
              ? false
              : "",
          priceMin: this.state.price[0],
          priceMax: this.state.price[1]
        },
        {
          headers: {
            authorization: "Bearer " + token.token
          }
        }
      );
      //console.log(this.state.usager);
      console.log(response.data);
      this.setState({ tab_location: response.data });
      this.triGeoloc(this.state.tab_location);
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
  getURL = url => {
    this.setState({ url: url });
  };
  getPrice = price => {
    console.log(price);
    this.setState({ price: price });
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
          <View style={{ height: 80, width: 300 }}>
            {this.GooglePlacesInput()}
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
          />
          <SizeSelect
            tab_size={this.state.tabsize}
            get_size_db={this.get_size_db}
            size={this.state.size}
          />
          <Etat
            switchValue={this.state.neuf}
            switchValue2={this.state.usager}
            toggleSwitch={this.toggleSwitch}
            toggleSwitch2={this.toggleSwitch2}
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
          <PriceSelect price={this.getPrice} pricevalue={this.state.price} />
          <TouchableOpacity
            style={styles.valider}
            onPress={() => {
              this.getinfo();
            }}
          >
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
