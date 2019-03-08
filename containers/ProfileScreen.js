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
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

class ProfileScreen extends React.Component {
  state = {
    profile: {},
    editable: true,
  };

  async componentDidMount() {
    try {
      let tempToken = await AsyncStorage.getItem("userInfo");
      tempToken = JSON.parse(tempToken);
      if (this.state.password === this.state.repassword) {
        const response = await axios.get(
          "http://localhost:5500/get_my_user_info?token=" + tempToken.token
        );

        this.setState({
          profile: response.data,
        });
        console.log(this.state);
      } else {
        alert("toto");
      }
    } catch (error) {
      alert(error);
    }
  }

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
        "http://localhost:5500/update_user_info",
        {
          username: this.state.profile.username,
          email: this.state.profile.email,
          nom: this.state.profile.nom,
          prenom: this.state.profile.prenom,
          adresse: this.state.profile.adresse,
          size: this.state.profile.size,
        },
        {
          headers: {
            authorization: "Bearer " + tempToken.token,
          },
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  change = (value, name) => {
    const newState = {
      profile: {
        ...this.state.profile,
        [name]: value,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <>
        <ScrollView>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerProfile}>
            <Text />
            <View style={{ alignItems: "center", position: "relative" }}>
              <Ionicons
                style={styles.posterBorder}
                name="ios-person"
                size={100}
                color="#fff"
              />

              <TouchableOpacity>
                <View style={styles.cameraView}>
                  <Ionicons
                    style={{ textAlign: "center" }}
                    name="ios-camera"
                    size={30}
                    color="#000"
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.usernameContainer}>
              <TextInput
                keyboardType="number-pad"
                style={styles.usernameInput}
                editable={this.state.editable === true ? false : true}
                selectTextOnFocus={false}
                placeholder={
                  this.state.profile.username === ""
                    ? "Votre téléphone"
                    : this.state.profile.username
                }
                placeholderTextColor={"#fff"}
              />
            </View>
          </View>
          <View
            style={{
              position: "relative",
              paddingHorizontal: 15,
              marginTop: 20,
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
                    this.change(text, "nom");
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
                    this.change(text, "prenom");
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
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Ionicons
                    style={{
                      position: "absolute",
                      top: "25%",
                    }}
                    name="ios-phone-portrait"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    onChangeText={text => {
                      this.change(text, "telephone");
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
                      this.change(text, "email");
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
                    this.change(text, "adresse");
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
                    this.change(text, "size");
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
                <TouchableOpacity onPress={() => this.updateFn()}>
                  <Text>Confirmer</Text>
                </TouchableOpacity>
              ) : (
                <Text />
              )}
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
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
    alignItems: "center",
  },
  posterBorder: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 55,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  cameraView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 30,
  },
  usernameContainer: {
    position: "relative",
    marginTop: 20,
  },
  usernameInput: {
    color: "#fff",
    fontSize: 20,
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
    shadowRadius: 2,
  },
  inputTextName: {
    fontSize: 30,
    marginTop: 5,
  },
  inputText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 25,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "grey",
    marginVertical: 20,
  },
});

export default ProfileScreen;
