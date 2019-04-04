import React from "react";
import { View, StyleSheet, ActionSheetIOS, Image, Text } from "react-native";
import { MapView, Location, Permissions } from "expo";
import InputGeoloc from "./googleAutoComplete";

class GeoLocalisation extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    newmarker: null
  };
  //Verifie si la permission de la localisation
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    } else {
      //si la permission est activé on recupere la position actuel
      const Currentlocation = await Location.getCurrentPositionAsync({});
      this.setState({
        location: Currentlocation
      });
      //on renvois la localisation au parent New_Product
      this.props.get_location(Currentlocation);
    }
  };
  //fonction pour mettre a jour la localisation
  onRegionChange = location => {
    //console.log(location);
    this.setState({
      location: location
    });
  };

  //afficher la map
  mapview = location => {
    if (location) {
      return (
        <>
          <View>
            {/* ici on recupere la lagitude et la longitude des adressse rentrer en input */}
            <InputGeoloc
              get_location={this.props.get_location}
              mapViewer={this.onRegionChange}
            />
          </View>

          <MapView
            style={{
              width: 300,
              height: 150,
              marginTop: 5,
              borderRadius: 8
            }}
            //localisation initial positition actuel
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002
            }}
            //localisation apres la mise a jour de l'adressse
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002
            }}
          >
            {/* affichage un marker sur la map */}
            <MapView.Marker
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
              title={"Vous etes ici"}
              description={"?????"}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  //  borderWidth: 1,
                  // borderColor: "grey",
                  backgroundColor: "white",
                  display: this.props.url === "" ? "none" : "flex"
                }}
              >
                {/* customa du marquer avec la photo de la sneaker */}
                <Image
                  source={{
                    uri:
                      this.props.url === ""
                        ? "https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png"
                        : this.props.url
                  }}
                  resizeMode="contain"
                  style={{
                    width: 45,
                    height: 45,
                    marginTop: 5,
                    marginLeft: 6
                  }}
                />
              </View>
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
          marginTop: 20
        }}
      >
        <View>{this.mapview(this.state.location)}</View>
      </View>
    );
  }
  componentDidMount() {
    this.getLocationAsync();
  }
}
const styles = StyleSheet.create({});

export default GeoLocalisation;
