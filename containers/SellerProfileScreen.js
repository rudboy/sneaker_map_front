import React from "react";
import {
  Text,
  StyleSheet,
  AsyncStorage,
  StatusBar,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
// import { ImagePicker, Permissions } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class SellerProfileScreen extends React.Component {
  state = {
    sellerProfile: {},
    isLoading: true,
    title: "",
    description: "",
    price: "",
    etat: "",
    size: "",
    localisation: null,
    sellerProduct: [],
  };

  async componentDidMount() {
    try {
      // let tempToken = await AsyncStorage.getItem("userInfo");
      // tempToken = JSON.parse(tempToken);

      const response = await axios.get(
        "http://localhost:5500/get_other_user_info?id=5c83ea60fa2b1d1474cfb845"
      );

      const productResponse = await axios.get(
        "http://localhost:5500/get_seller_product_info?id=5c83ea60fa2b1d1474cfb845"
      );

      // console.log(response.data);

      this.setState({
        sellerProfile: response.data,
        sellerProduct: productResponse.data,
        isLoading: false,
      });
      console.log(this.state);
    } catch (error) {
      alert(error);
    }
  }

  renderPosterProfile = () => {
    if (this.state.sellerProfile.poster_profile[0]) {
      return (
        <Image
          source={{ uri: this.state.sellerProfile.poster_profile[0] }}
          style={{ width: 110, height: 110, borderRadius: 55 }}
        />
      );
    }
    if (!this.state.sellerProfile.poster_profile[0]) {
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

  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <StatusBar barStyle="light-content" />
          <ActivityIndicator size="large" color="#111" />
        </View>
      );
    }
    console.log(this.state.sellerProduct[0].pictures[0]);
    return (
      <>
        <KeyboardAwareScrollView>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerProfile}>
            <Text />
            <View style={{ alignItems: "center", position: "relative" }}>
              {this.renderPosterProfile()}
            </View>

            <View style={styles.usernameContainer}>
              <Text style={styles.usernameInput}>
                {this.state.sellerProfile.username}
              </Text>
            </View>
          </View>

          <View
            style={{
              position: "relative",
              paddingHorizontal: 15,
              paddingTop: 30,
            }}
          >
            <View>
              {this.state.sellerProfile.nom ? (
                <Text style={styles.inputTextName}>
                  {this.state.sellerProfile.nom}
                </Text>
              ) : null}
            </View>

            <View>
              {this.state.sellerProfile.prenom ? (
                <Text style={styles.inputTextName}>
                  {this.state.sellerProfile.prenom}
                </Text>
              ) : null}
            </View>

            {this.state.sellerProfile.nom && this.state.sellerProfile.prenom ? (
              <View style={styles.separator} />
            ) : null}

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
                <Text style={styles.inputText}>
                  {this.state.sellerProfile.phone
                    ? this.state.sellerProfile.phone
                    : "N.C."}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Ionicons
                  style={{ position: "absolute", top: "25%" }}
                  name="ios-mail"
                  size={20}
                  color="#000"
                />

                <Text style={styles.inputText}>
                  {this.state.sellerProfile.email
                    ? this.state.sellerProfile.email
                    : "N.C."}
                </Text>
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

              <Text style={styles.inputText}>
                {this.state.sellerProfile.adresse
                  ? this.state.sellerProfile.adresse
                  : "N.C."}
              </Text>
            </View>
            <View>
              <MaterialCommunityIcons
                style={{ position: "absolute", top: "25%" }}
                name="shoe-formal"
                size={20}
                color="#000"
              />

              <Text style={styles.inputText}>
                {this.state.sellerProfile.size
                  ? this.state.sellerProfile.size
                  : "N.C."}
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
            <FlatList
              data={this.state.sellerProduct}
              numColumns={this.state.sellerProduct.length}
              keyExtractor={item => String(item._id)}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View>
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{ uri: item.pictures[0] }}
                    />

                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
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
  usernameContainer: {
    position: "relative",
    marginTop: 20,
  },
  usernameInput: {
    color: "#fff",
    fontSize: 20,
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

export default SellerProfileScreen;
