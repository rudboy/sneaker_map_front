import React from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "axios"; // const axios = require('axios');
import Picker_mark from "../components/filter_pickerMark";
import Picker_category from "../components/filter_pickerCategory";
import Picker_model from "../components/filter_pickerModel";
import Etat from "../components/etat";
import PriceSelect from "../components/PriceSelect";
import Rayon from "../components/Rayon";
import SizeSelect from "../components/filter_pickerSize";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import geolib from "geolib";

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
    price: [0, 5000],
    size: "",
    tab_location: "",
    title: "",
    styleID: "",
    url: "",
    latitude: "",
    longitude: "",
    localisationTab: [],
    rayon: [0]
  };

  static navigationOptions = ({ navigation }) => {
    return {
      // header: null

      title: "Rechercher Avancée",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "grey",
      headerTitleStyle: {
        fontSize: 21,
        fontWeight: "600"
      }
    };
  };

  // pour de coordonne geoloc autour d'un point precis
  triGeoloc = tableau => {
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
          Number(this.state.rayon) * 1000
        );
      });
      if (everyPointInCircle === true) {
        let temptab = [...this.state.localisationTab];
        temptab.push(tableau[i]);
        this.setState({ localisationTab: temptab });
      }
    }
    if (this.state.localisationTab.length !== 0) {
      this.props.navigation.navigate("ResultView", {
        result: this.state.localisationTab
      });
    } else {
      Alert.alert(
        undefined,
        "Aucun résultat dans la zone choisie, voulez-vous voir le résultat hors zone?",
        [
          {
            text: "Annuler",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.navigate("ResultView", {
                result: this.state.tab_location
              });
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  //function pour obtenir les coordonées d'une adresse rentrer
  GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="Entrer une Zone de recherche, ville ou adress.."
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed="false" // true/false/undefined
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
          this.setState({
            latitude: coords.coords.latitude,
            longitude: coords.coords.longitude
          });
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
            backgroundColor: "white",
            height: 30,
            color: "grey"
          },
          description: {
            fontWeight: "bold",
            color: "grey"
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

  Get_Category = async mark => {
    if (mark === "Adidas") {
      let temp = await AsyncStorage.getItem("category" + mark);
      temp = JSON.parse(temp);
      this.setState({
        tabcategory: temp,
        mark: mark
      });
    }
    if (mark === "Jordan") {
      let temp = await AsyncStorage.getItem("category" + mark);
      temp = JSON.parse(temp);
      this.setState({
        tabcategory: temp,
        mark: mark
      });
    }
    if (mark === "Nike") {
      let temp = await AsyncStorage.getItem("category" + mark);
      temp = JSON.parse(temp);
      this.setState({
        tabcategory: temp,
        mark: mark
      });
    }
  };
  Get_Model = async category => {
    for (let i = 0; i < this.state.tabcategory.length; i++) {
      if (category === this.state.tabcategory[i].value) {
        let temp = await AsyncStorage.getItem("modele" + category);
        temp = JSON.parse(temp);
        this.setState({ tab_model: temp, category: category });
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
    this.setState({ neuf: value });
  };

  toggleSwitch2 = value => {
    this.setState({ usager: value });
  };

  getinfo = async () => {
    let token = await AsyncStorage.getItem("userInfo");
    token = JSON.parse(token);
    try {
      let findThisText = "";
      let idstyle = "";
      if (
        (this.state.styleID === "" && this.state.category === null) ||
        (this.state.category === "" && this.state.mark !== "")
      ) {
        findThisText = this.state.mark;
      } else if (
        this.state.styleID === "" &&
        this.state.category !== "" &&
        this.state.mark !== ""
      ) {
        findThisText = this.state.category;
      } else {
        idstyle = this.state.styleID;
      }
      const response = await axios.post(
        "https://sneaker-map-api.herokuapp.com/Product",
        {
          title: findThisText,
          id_style: idstyle,
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

      if (response.data.length > 0) {
        this.setState({ tab_location: response.data });
        this.triGeoloc(this.state.tab_location);
      } else {
        alert("Aucun Résultat, Veuilliez modifier votre recherche");
      }
    } catch (error) {}
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
    this.setState({ price: price });
  };
  GetRayon = rayon => {
    this.setState({ rayon: rayon });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.principal}>
          <View
            style={{
              height: 75,
              width: 300
            }}
          >
            {this.GooglePlacesInput()}
          </View>
          <Rayon Get_rayon={this.GetRayon} rayon={this.state.rayon} />

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
              color: "grey",
              fontSize: 20,
              fontWeight: "600",
              marginRight: 10,
              marginBottom: 10,
              marginTop: 20
            }}
          >
            Prix Min - Max
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
                color: "grey",
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
    backgroundColor: "white",
    color: "black",
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
    marginBottom: 40,
    borderColor: "grey",
    borderWidth: 0.5
  }
});

export default FilterScreen;
