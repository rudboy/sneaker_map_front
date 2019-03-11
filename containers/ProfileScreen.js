import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  StatusBar,
  View,
  TouchableOpacity,
  TextInput,

  KeyboardAvoidingView,
  ActionSheetIOS,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { ImagePicker, Permissions } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class ProfileScreen extends React.Component {
  state = {
    profile: {},

    editable: true,
    tab_photo: [],
    isLoading: true,
    profileModified: false,
  };

  async componentDidMount() {
    try {
      let tempToken = await AsyncStorage.getItem("userInfo");
      tempToken = JSON.parse(tempToken);
      if (this.state.password === this.state.repassword) {
        const response = await axios.get(
          "https://sneaker-map-api.herokuapp.com/get_my_user_info?token=" +
            tempToken.token
        );

        this.setState({

          profile: response.data,
          isLoading: false,
        });
        // console.log(this.state);
        this.getCameraRollAsync();
        this.getCameraAsync();
      } else {
        alert("toto");
      }
    } catch (error) {
      alert(error);
    }
  }

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

  get_photo = tab => {
    this.setState({ tab_photo: tab });
  };

  pickImageLibrary = async () => {
    if (this.state.tab_photo.length === 1) {
      // alert("Vous ne pouvez pas ajouter plus d' une image");
      this.setState({ tab_photo: [] });
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });
      let temp = this.state.tab_photo;
      console.log(result);
      if (!result.cancelled) {
        temp.push("data:image/jpeg;base64," + result.base64);
        this.get_photo(temp);
      }
      console.log(this.state.tab_photo);
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });
      let temp = this.state.tab_photo;
      console.log(result);
      if (!result.cancelled) {
        temp.push("data:image/jpeg;base64," + result.base64);
        this.get_photo(temp);
      }
    }
    console.log(this.state.tab_photo);
  };

  pickImageCamera = async () => {
    if (this.state.tab_photo.length === 1) {
      alert("Vous ne pouvez pas ajouter plus d' 1 image");
    } else {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });
      let temp = this.state.tab_photo;
      console.log(result);
      if (!result.cancelled) {
        temp.push("data:image/jpeg;base64," + result.base64);
        this.get_photo(temp);
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

  renderPosterProfile = () => {
    if (this.state.profile.poster_profile[0]) {
      return (
        <Image
          source={{ uri: this.state.profile.poster_profile[0] }}
          style={{ width: 110, height: 110, borderRadius: 55 }}
        />
      );
    }
    if (this.state.tab_photo[0]) {
      return (
        <Image
          source={{ uri: this.state.tab_photo[0] }}
          style={{ width: 110, height: 110, borderRadius: 55 }}
        />
      );
    }
    if (!this.state.profile.poster_profile[0]) {
      return (
        <Ionicons
          style={styles.posterBorder}
          name="ios-person"
          size={100}
          color="#fff"
        />
      );
    }
  };

  editableFn = () => {
    if (this.state.editable === false) {
      this.setState({ editable: true });
    } else {
      this.setState({ editable: false });
    }
  };

  updateFn = async () => {
    let tempToken = await AsyncStorage.getItem("userInfo");
    tempToken = JSON.parse(tempToken);
    try {
      await axios.post(
        "https://sneaker-map-api.herokuapp.com/update_user_info",
        {
          username: this.state.profile.username,
          email: this.state.profile.email,
          nom: this.state.profile.nom,
          prenom: this.state.profile.prenom,
          adresse: this.state.profile.adresse,

          size: this.state.profile.size,
          poster_profile: this.state.tab_photo,
        },
        {
          headers: {
            authorization: "Bearer " + tempToken.token
          }
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  validateButton = () => {
    this.updateFn();
    this.profileModified();
    this.setState({ editable: true });
  };

  changeInput = (value, name) => {
    const newState = {
      profile: {
        ...this.state.profile,
        [name]: value
      }
    };
    this.setState(newState);
  };

  profileModified = () => {
    this.timeoutHandle = setTimeout(() => {
      this.setState({ profileModified: false });
    }, 3000);
    this.setState({ profileModified: true });
  };

  render() {
    console.log("this.state.tab_photo.length", this.state.tab_photo.length);
    console.log(
      "this.state.profile.poster_profile",
      this.state.profile.poster_profile
    );
    console.log(this.state.profileModified);
    if (this.state.isLoading === true) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <StatusBar barStyle="light-content" />
          <ActivityIndicator size="large" color="#111" />
        </View>
      );
    }
    return (
      <>
        <KeyboardAwareScrollView>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerProfile}>
            <Text />
            <View style={{ alignItems: "center", position: "relative" }}>
              {this.renderPosterProfile()}
              {this.state.editable === false ? (
                <TouchableHighlight onPress={() => this.cameraOrRoll()}>
                  <View style={styles.cameraView}>
                    <Ionicons
                      style={{ textAlign: "center" }}
                      name="ios-camera"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableHighlight>
              ) : null}

              {/* <TouchableOpacity onPress={() => this.cameraOrRoll()}>
                <View style={styles.cameraView}>
                  <Ionicons
                    style={{ textAlign: "center" }}
                    name="ios-camera"
                    size={30}
                    color="#000"
                  />
                </View>
              </TouchableOpacity> */}
            </View>

            <View style={styles.usernameContainer}>
              <TextInput
                keyboardType="number-pad"
                style={styles.usernameInput}
                editable={this.state.editable === true ? false : true}
                selectTextOnFocus={false}
                placeholder={
                  this.state.profile.username === ""
                    ? "Votre nom d'utilisateur"
                    : this.state.profile.username
                }
                placeholderTextColor={"#fff"}
              />
            </View>
            {this.state.profileModified === true ? (
              <Text style={styles.profileModified}>Profil modifié</Text>
            ) : null}
          </View>

          <View
            style={{
              position: "relative",
              paddingHorizontal: 15,

              paddingTop: 30,
            }}
          >
            <TouchableOpacity
              style={styles.modifProfile}
              onPress={() => this.editableFn()}
            >
              <MaterialCommunityIcons
                style={{ textAlign: "center" }}
                name="pencil"
                size={30}
                color="#000"
              />
            </TouchableOpacity>
            <KeyboardAvoidingView enabled behavior="padding">
              <View>
                <TextInput
                  onChangeText={text => {
                    this.changeInput(text, "nom");
                  }}
                  // value={this.state.profile.nom}
                  editable={this.state.editable === true ? false : true}
                  style={styles.inputTextName}
                  placeholder={
                    this.state.profile.nom === ""
                      ? "Votre nom"
                      : this.state.profile.nom
                  }
                  placeholderTextColor={
                    this.state.editable === false ? "grey" : "#000"
                  }
                />
              </View>
              <View>
                <TextInput
                  onChangeText={text => {
                    this.changeInput(text, "prenom");
                  }}
                  // value={this.state.profile.prenom}
                  editable={this.state.editable === true ? false : true}
                  style={styles.inputTextName}
                  placeholder={
                    this.state.profile.prenom === ""
                      ? "Votre prénom"
                      : this.state.profile.prenom
                  }
                  placeholderTextColor={
                    this.state.editable === false ? "grey" : "#000"
                  }
                />
              </View>
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={{ width: "50%" }}>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: "25%"
                    }}
                    name="ios-phone-portrait"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    onChangeText={text => {
                      this.changeInput(text, "telephone");
                    }}
                    editable={this.state.editable === true ? false : true}
                    style={styles.inputText}
                    placeholder={
                      this.state.profile.phone === null
                        ? "Votre téléphone"
                        : this.state.profile.phone
                    }
                    placeholderTextColor={
                      this.state.editable === false ? "grey" : "#000"
                    }
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <Ionicons
                    style={{ position: "absolute", top: "25%" }}
                    name="ios-mail"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    onChangeText={text => {
                      this.changeInput(text, "email");
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={this.state.editable === true ? false : true}
                    style={styles.inputText}
                    placeholder={
                      this.state.profile.email === null
                        ? "Votre mail"
                        : this.state.profile.email
                    }
                    placeholderTextColor={
                      this.state.editable === false ? "grey" : "#000"
                    }
                  />
                </View>
              </View>
              <View style={styles.separator} />
              <View>
                <Ionicons
                  style={{ position: "absolute", top: "25%" }}
                  name="ios-pin"
                  size={20}
                  color="#000"
                />
                <TextInput
                  onChangeText={text => {
                    this.changeInput(text, "adresse");
                  }}
                  editable={this.state.editable === true ? false : true}
                  style={styles.inputText}
                  placeholder={
                    this.state.profile.adresse === ""
                      ? "Votre adresse"
                      : this.state.profile.adresse
                  }
                  placeholderTextColor={
                    this.state.editable === false ? "grey" : "#000"
                  }
                />
              </View>
              <View>
                <MaterialCommunityIcons
                  style={{ position: "absolute", top: "25%" }}
                  name="shoe-formal"
                  size={20}
                  color="#000"
                />
                <TextInput
                  onChangeText={text => {
                    this.changeInput(text, "size");
                  }}
                  editable={this.state.editable === true ? false : true}
                  style={styles.inputText}
                  placeholder={"Votre pointure"}
                  placeholderTextColor={
                    this.state.editable === false ? "grey" : "#000"
                  }
                />
              </View>
              {this.state.editable === false ? (
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => this.validateButton()}
                >
                  <Text style={styles.updateButtonText}>Confirmer</Text>
                </TouchableOpacity>
              ) : (
                <Text />
              )}
            </KeyboardAvoidingView>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  // mainContainer: {
  //   backgroundColor: "#111",
  // },
  headerProfile: {
    paddingVertical: 20,
    backgroundColor: "#111",
    alignItems: "center"
  },
  posterBorder: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 55,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  cameraView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 30
  },
  usernameContainer: {
    position: "relative",
    marginTop: 20
  },
  usernameInput: {
    color: "#fff",
    fontSize: 20
  },
  modifProfile: {
    position: "absolute",
    right: 10,
    top: -30,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  inputTextName: {
    fontSize: 30,
    marginTop: 5
  },
  inputText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 25
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "grey",

    marginVertical: 20,
  },
  updateButton: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#111",
    marginTop: 20,
  },
  updateButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  profileModified: {
    textAlign: "center",
    backgroundColor: "#4cae4c",
    color: "#fff",
    position: "absolute",
    bottom: -35,
    width: "100%",
    fontSize: 16,
    padding: 10,
  },
});

export default ProfileScreen;
