import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import { Entypo } from "@expo/vector-icons";

class Add_photo extends React.Component {
  state = {
    etat: "",
    errorMessage: null,
    image: null,
    image2: null,
    image3: null,
  };

  getCameraRollAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée",
      });
    }
  };
  getCameraAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée",
      });
    }
  };

  pickImageLibrary = async () => {
    if (this.props.tab_photo.length === 3) {
      alert("Vous ne pouvez pas ajouter plus de 3 images");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });
      let temp = this.props.tab_photo;
      console.log(result);
      if (!result.cancelled) {
        temp.push("data:image/jpeg;base64," + result.base64);
        this.props.get_photo(temp);
      }
    }
  };

  pickImageCamera = async () => {
    if (this.props.tab_photo.length === 3) {
      alert("Vous ne pouvez pas ajouter plus de 3 images");
    } else {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });
      let temp = this.props.tab_photo;
      console.log(result);
      if (!result.cancelled) {
        temp.push("data:image/jpeg;base64," + result.base64);
        this.props.get_photo(temp);
      }
    }
  };

  cameraOrRoll = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Prendre une photo", "Choisir une photo"],
        title: "Which one do you like ?",
        rollButtonIndex: 2,
        cameraButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          this.pickImageCamera();
        } else if (buttonIndex === 2) {
          this.pickImageLibrary();
        }
      }
    );
  };

  cross = () => {
    if (this.props.tab_photo.length > 0) {
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
    if (this.props.tab_photo.length > 1) {
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
    if (this.props.tab_photo.length > 2) {
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
    let temptab = [...this.props.tab_photo];
    if (toto === 1) {
      temptab.splice(0, 1);
      this.props.get_photo(temptab);
    } else if (toto === 2) {
      temptab.splice(1, 1);
      this.props.get_photo(temptab);
    } else if (toto === 3) {
      temptab.splice(2, 1);
      this.props.get_photo(temptab);
    }
  };

  render() {
    {
    }
    //let { image } = this.state;
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
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
          onPress={this.cameraOrRoll}
        >
          <Text
            style={{
              color: "black",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            AJOUTER PHOTOS
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.cadre}>
            {this.props.tab_photo[0] && (
              <Image
                source={{ uri: this.props.tab_photo[0] }}
                style={{ width: 85, height: 85 }}
              />
            )}
            {this.cross()}
          </View>
          <View style={styles.cadre}>
            {this.props.tab_photo[1] && (
              <Image
                source={{ uri: this.props.tab_photo[1] }}
                style={{ width: 85, height: 85 }}
              />
            )}
            {this.cross2()}
          </View>
          <View style={styles.cadre}>
            {this.props.tab_photo[2] && (
              <Image
                source={{ uri: this.props.tab_photo[2] }}
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
    this.getCameraAsync();
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
    alignItems: "center",
  },
});

export default Add_photo;
