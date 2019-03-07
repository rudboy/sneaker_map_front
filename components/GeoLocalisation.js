import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ImageEditor,
  AsyncStorage
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { MapView, Location, Permissions } from "expo";

class GeoLocalisation extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    newmarker: null
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    } else {
      const Currentlocation = await Location.getCurrentPositionAsync({});
      this.setState({
        location: Currentlocation
      });
      this.props.get_location(Currentlocation);
    }
  };

  getImage = async () => {
    // Construct a crop data object.
    cropData = {
      offset: { x: 0, y: 0 },
      size: { width: 20, height: 20 }
      //  displaySize:{width:20, height:20}, THESE 2 ARE OPTIONAL.
      //  resizeMode:'contain',
    };
    // Crop the image.
    newurl = await AsyncStorage.getItem("imageForMarker");
    //console.log(newurl);

    try {
      await ImageEditor.cropImage(
        "https://stockx.imgix.net/Air-Jordan-1-Retro-High-OG-Defiant-Couture-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=100&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1551112186",
        cropData,
        successURI => {
          this.setState({ newmarker: successURI });
          //console.log(successURI);
        },
        error => {
          console.log("cropImage,", error);
        }
      );
    } catch (error) {
      console.log("Error caught in this.cropImage:", error);
    }
  };

  mapview = () => {
    if (this.state.location) {
      return (
        <>
          <MapView
            style={{
              width: 300,
              height: 150,
              marginTop: 20,
              borderRadius: 8
            }}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
              title={"Vous etes ici"}
              description={"?????"}
              //image={require(this.state.newmarker)}
            />
          </MapView>
        </>
      );
    }
  };

  render() {
    {
    }
    return (
      <View
        style={{
          marginTop: 25
        }}
      >
        <TouchableOpacity
          style={{
            color: "black",
            backgroundColor: "white",
            borderRadius: 5,
            // justifyContent: "center",
            // alignItems: "center",
            height: 40
          }}
          onPress={this.pickImage}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "600"
            }}
          >
            AJOUTER UNE LOCALISATION
          </Text>
        </TouchableOpacity>
        <View>{this.mapview()}</View>
      </View>
    );
  }
  componentDidMount() {
    this.getLocationAsync();
    this.getImage();
  }
}

export default GeoLocalisation;
