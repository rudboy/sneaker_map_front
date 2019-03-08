import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  AppRegistry
} from "react-native";
import { MapView } from "expo";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Communications from "react-native-communications";

class ProductScreen extends React.Component {
  state = {
    isLoading: true,
    productId: "",
    title: "",
    description: "",
    price: "",
    etat: "",
    size: "",
    localisation: null,
    isFavorite: false,
    isOpen: false,
    favory: [],
    userToken: null,
    phone: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        height: 5
      }
    };
  };

  componentDidMount = async () => {
    const response = await axios.get(
      "http://localhost:5500/get_product_info?id=5c80f22710b1f405ffdfd7b5" // remplacer l'id par la props reçue de la page précédente
    );
    console.log("response.data ", response.data);
    const title = response.data.title;
    const description = response.data.description;
    const price = response.data.price;
    const etat = response.data.etat;
    const size = response.data.size;
    const productId = response.data._id;
    const localisation = response.data.localisation;

    // const userInfo = await AsyncStorage.getItem("userInfo");
    // console.log("userInfo ", userInfo);

    const userResponse = await axios.post(
      "http://localhost:5500/get_my_user_info",
      {
        token:
          "prIBF6l0ZjP6bkOHeeFGR0llZs0H1hB7L1QKJoNWnBsj3bvUdgHOZPvyZVnUUdyZ" // remplacer par le token du AsyncStorage
      }
    );

    this.setState(
      {
        isLoading: false,
        productId: productId,
        title: title,
        description: description,
        price: price,
        etat: etat,
        size: size,
        favory: userResponse.data.favory,
        userToken: userResponse.data.token,
        phone: userResponse.data.phone,
        localisation: localisation
      },
      () => {
        // vérifier si l'id produit se trouve dans le tableau de favoris
        // si oui : changer le state favory en `true``
        // si non : le mettre en false
        const favs = this.state.favory;
        let isInFavs = false;
        for (let i = 0; i < favs.length; i++) {
          if (this.state.productId === favs[i]) {
            isInFavs = true;
          }
        }
        if (isInFavs) {
          if (this.state.isFavorite === false) {
            this.setState(
              {
                isFavorite: true
              },
              () => {
                console.log("this.state.isFavorite ", this.state.isFavorite);
              }
            );
          }
        }

        //////////////////
      }
    );
  };

  renderDesc = () => {
    if (this.state.isOpen === true) {
      return (
        <>
          <Text style={styles.p}>{this.state.description}</Text>
          <Ionicons
            style={{ textAlign: "center" }}
            name="ios-arrow-up"
            size={35}
          />
        </>
      );
    } else {
      return (
        <>
          <Text numberOfLines={3} style={styles.p}>
            {this.state.description}
          </Text>
          <Ionicons
            style={{ textAlign: "center" }}
            name="ios-arrow-down"
            size={35}
          />
        </>
      );
    }
  };

  handlePress = () => {
    this.setState({
      isOpen: this.state.isOpen === true ? false : true
    });
  };

  renderFavorite = () => {
    return (
      <Ionicons
        onPress={this.handleFavorite}
        style={{ position: "absolute", right: 8, top: 12 }}
        name={this.state.isFavorite === false ? "ios-heart-empty" : "ios-heart"}
        size={35}
        color={this.state.isFavorite === true ? "red" : null}
      />
    );
  };

  handleFavorite = async () => {
    // Modifier tableau de favoris de l'utilisateur:
    // appeler la route update user
    const response = await axios.post(
      "http://192.168.86.54:5500/update_user_info",
      {
        //body
        favory: this.state.productId
      },
      {
        headers: {
          authorization: "Bearer " + this.state.userToken
        }
      }
    );
    //////////test:
    // Changer le state :
    this.setState({
      isFavorite: this.state.isFavorite === true ? false : true
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return <ActivityIndicator style={{ flex: 1 }} />;
    } else {
      return (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={{ position: "relative" }}>
              <Image
                resizeMode="cover"
                style={styles.productPic}
                source={{
                  uri:
                    "https://www.lesitedelasneaker.com/wp-content/images/2018/04/air-jordan-3-katrina-136064-116-3.jpg"
                }}
              />
              {this.renderFavorite()}
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.title}>{this.state.title}</Text>
              <Text style={styles.title}>Description</Text>
              <TouchableOpacity onPress={this.handlePress}>
                {this.renderDesc()}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text style={styles.title}>Pointure</Text>

                  <Text style={styles.p}>{this.state.size}</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text style={styles.title}>Prix</Text>

                  <Text style={styles.p}>{this.state.price} €</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text style={styles.title}>Etat</Text>

                  <Text style={styles.p}>
                    {this.state.etat === true ? "Neuf" : "Occasion"}
                  </Text>
                </View>
              </View>
              <Text style={styles.title}>Localisation</Text>
            </View>

            <MapView
              style={{ height: 250 }}
              initialRegion={{
                latitude: this.state.localisation[1],
                longitude: this.state.localisation[0],
                latitudeDelta: 0.025,
                longitudeDelta: 0.0029
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.localisation[1],
                  longitude: this.state.localisation[0]
                }}
                title={"La sneaker dont tu rêves"}
                description={"Elle est là, elle t'attend !"}
              >
                <Image
                  source={{
                    uri:
                      "https://www.lesitedelasneaker.com/wp-content/images/2018/04/air-jordan-3-katrina-136064-116-3.jpg"
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "grey"
                  }}
                />
              </MapView.Marker>
            </MapView>
          </ScrollView>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "black"
            }}
          />
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Chat")}
              style={styles.iconWrapper}
            >
              <Ionicons name="ios-chatboxes" size={30} color="black" />
              <Text>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconWrapper}
              disabled={this.state.phone === null ? true : false}
              onPress={() => Communications.phonecall(this.state.phone, true)}
            >
              <FontAwesome
                name="phone"
                size={30}
                color={this.state.phone === null ? "grey" : "black"}
              />
              <Text
                style={this.state.phone === null ? styles.grey : styles.black}
              >
                Contacter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SellerProfile")}
              style={styles.iconWrapper}
            >
              <Ionicons name="ios-person" size={30} color="black" />
              <Text>Profil vendeur</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }
  }
}

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // paddingHorizontal: 16,
    // paddingBottom: 50,
    marginTop: 0
  },
  contentWrapper: {
    paddingHorizontal: 16
  },
  productPic: {
    // width: "100%",
    height: 425,
    resizeMode: "cover"
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 8
  },
  p: {
    fontSize: 16
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
    height: 56
  },
  iconWrapper: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  grey: {
    color: "grey"
  },
  black: {
    color: "black"
  }
});
