import React from "react";
import { Image, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

class googlegeoloc extends React.Component {
  state = {
    values: [0, 1000]
  };
  GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="Entrer une Adresse de localisation"
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
          this.props.get_location(coords);
          this.props.mapViewer(coords);
          //  console.log(coords);
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
            width: "100%"
            //backgroundColor: "white"
          },
          textInput: {
            backgroundColor: "white",
            height: 30,
            color: "black"
          },
          description: {
            fontWeight: "bold",
            color: "black"
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

  render() {
    return (
      <>
        <View style={{ height: 80, width: 300, position: "absolute" }}>
          {this.GooglePlacesInput()}
        </View>
        <Text
          style={{
            color: "grey",
            marginTop: 38,
            marginLeft: 12,
            marginBottom: 30,
            position: "relative"
          }}
        >
          *l'adresse exacte ne sera pas divulguée
        </Text>
      </>
    );
  }
}

export default googlegeoloc;
