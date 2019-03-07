import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { Entypo } from "@expo/vector-icons";

class Add_photo extends React.Component {
  state = {
    etat: "",
    errorMessage: null,
    image: null,
    image2: null,
    image3: null
  };

  getCameraRollAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    }
  };

  pickImage = async () => {
    if (
      this.state.image !== null &&
      this.state.image2 !== null &&
      this.state.image3 !== null
    ) {
      alert("Vous ne pouvez pas ajouter plus de 3 images");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      // console.log(result);
      if (this.state.image === null && !result.cancelled) {
        this.setState({ image: result.uri });
      } else if (this.state.image2 === null && !result.cancelled) {
        this.setState({ image2: result.uri });
      } else if (this.state.image3 === null && !result.cancelled) {
        this.setState({ image3: result.uri });
      }
    }
  };

  cross = () => {
    if (this.state.image !== null) {
      return (
        <TouchableOpacity
          style={{ marginLeft: 60, marginTop: -35 }}
          onPress={() => {
            this.onPress(1);
          }}
        >
          <Entypo name="circle-with-cross" size={30} color="white" />
        </TouchableOpacity>
      );
    }
  };
  cross2 = () => {
    if (this.state.image2 !== null) {
      return (
        <TouchableOpacity
          style={{ marginLeft: 60, marginTop: -35 }}
          onPress={() => {
            this.onPress(2);
          }}
        >
          <Entypo name="circle-with-cross" size={30} color="white" />
        </TouchableOpacity>
      );
    }
  };
  cross3 = () => {
    if (this.state.image3 !== null) {
      return (
        <TouchableOpacity
          style={{ marginLeft: 60, marginTop: -35 }}
          onPress={() => {
            this.onPress(3);
          }}
        >
          <Entypo name="circle-with-cross" size={30} color="white" />
        </TouchableOpacity>
      );
    }
  };

  onPress = toto => {
    toto === 1
      ? this.setState({ image: null })
      : toto === 2
      ? this.setState({ image2: null })
      : toto === 3
      ? this.setState({ image3: null })
      : "";
  };

  render() {
    {
    }
    //let { image } = this.state;
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
            justifyContent: "center",
            alignItems: "center",
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
            AJOUTER PHOTOS
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.cadre}>
            {this.state.image && (
              <Image
                source={{ uri: this.state.image }}
                style={{ width: 85, height: 85 }}
              />
            )}
            {this.cross()}
          </View>
          <View style={styles.cadre}>
            {this.state.image2 && (
              <Image
                source={{ uri: this.state.image2 }}
                style={{ width: 85, height: 85 }}
              />
            )}
            {this.cross2()}
          </View>
          <View style={styles.cadre}>
            {this.state.image3 && (
              <Image
                source={{ uri: this.state.image3 }}
                style={{ width: 85, height: 85 }}
              />
            )}
            {this.cross3()}
          </View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    this.getCameraRollAsync();
  }
}

const styles = StyleSheet.create({
  cadre: {
    marginTop: 20,
    width: 90,
    height: 90,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 8,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Add_photo;
