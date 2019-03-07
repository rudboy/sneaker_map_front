import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
<<<<<<< HEAD
  TouchableOpacity,
  ActionSheetIOS
=======
  TouchableOpacity
>>>>>>> pulled master branch from github
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
<<<<<<< HEAD
  getCameraAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    }
  };

  pickImageLibrary = async () => {
    if (this.props.tab_photo.length === 3) {
=======

  pickImage = async () => {
    if (
      this.state.image !== null &&
      this.state.image2 !== null &&
      this.state.image3 !== null
    ) {
>>>>>>> pulled master branch from github
      alert("Vous ne pouvez pas ajouter plus de 3 images");
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
<<<<<<< HEAD
        base64: true,
        aspect: [4, 3]
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
        aspect: [4, 3]
      });
      let temp = this.props.tab_photo;
      console.log(result);
      if (!result.cancelled) {
        temp.push("data:image/jpeg;base64," + result.base64);
        this.props.get_photo(temp);
=======
        aspect: [4, 3]
      });

      // console.log(result);
      if (this.state.image === null && !result.cancelled) {
        this.setState({ image: result.uri });
      } else if (this.state.image2 === null && !result.cancelled) {
        this.setState({ image2: result.uri });
      } else if (this.state.image3 === null && !result.cancelled) {
        this.setState({ image3: result.uri });
>>>>>>> pulled master branch from github
      }
    }
  };

<<<<<<< HEAD
  cameraOrRoll = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Prendre une photo", "Choisir une photo"],
        title: "Which one do you like ?",
        rollButtonIndex: 2,
        cameraButtonIndex: 1,
        cancelButtonIndex: 0
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
=======
  cross = () => {
    if (this.state.image !== null) {
>>>>>>> pulled master branch from github
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
<<<<<<< HEAD
    if (this.props.tab_photo.length > 1) {
=======
    if (this.state.image2 !== null) {
>>>>>>> pulled master branch from github
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
<<<<<<< HEAD
    if (this.props.tab_photo.length > 2) {
=======
    if (this.state.image3 !== null) {
>>>>>>> pulled master branch from github
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
<<<<<<< HEAD
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
=======
    toto === 1
      ? this.setState({ image: null })
      : toto === 2
      ? this.setState({ image2: null })
      : toto === 3
      ? this.setState({ image3: null })
      : "";
>>>>>>> pulled master branch from github
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
<<<<<<< HEAD
          onPress={this.cameraOrRoll}
=======
          onPress={this.pickImage}
>>>>>>> pulled master branch from github
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
<<<<<<< HEAD
            {this.props.tab_photo[0] && (
              <Image
                source={{ uri: this.props.tab_photo[0] }}
=======
            {this.state.image && (
              <Image
                source={{ uri: this.state.image }}
>>>>>>> pulled master branch from github
                style={{ width: 85, height: 85 }}
              />
            )}
            {this.cross()}
          </View>
          <View style={styles.cadre}>
<<<<<<< HEAD
            {this.props.tab_photo[1] && (
              <Image
                source={{ uri: this.props.tab_photo[1] }}
=======
            {this.state.image2 && (
              <Image
                source={{ uri: this.state.image2 }}
>>>>>>> pulled master branch from github
                style={{ width: 85, height: 85 }}
              />
            )}
            {this.cross2()}
          </View>
          <View style={styles.cadre}>
<<<<<<< HEAD
            {this.props.tab_photo[2] && (
              <Image
                source={{ uri: this.props.tab_photo[2] }}
=======
            {this.state.image3 && (
              <Image
                source={{ uri: this.state.image3 }}
>>>>>>> pulled master branch from github
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
<<<<<<< HEAD
    this.getCameraAsync();
=======
>>>>>>> pulled master branch from github
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
