import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ImageEditor,
  AsyncStorage,
  ActionSheetIOS,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { MapView, Location, Permissions } from "expo";

class GeoLocalisation extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    newmarker: null,
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée",
      });
    } else {
      const Currentlocation = await Location.getCurrentPositionAsync({});
      this.setState({
        location: Currentlocation,
      });
      this.props.get_location(Currentlocation);
    }
  };

  pickgeoloc = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          /* destructive action */
        }
      }
    );
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
              borderRadius: 8,
            }}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
              }}
              title={"Vous etes ici"}
              description={"?????"}
            >
              {/* <Image source={{uri:""}}></Image> */}
            </MapView.Marker>
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
          marginTop: 25,
        }}
      >
        <TouchableOpacity
          style={{
            color: "black",
            backgroundColor: "white",
            borderRadius: 5,
            // justifyContent: "center",
            // alignItems: "center",
            height: 40,
          }}
          onPress={this.pickgeoloc}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "600",
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
  }
}

export default GeoLocalisation;
