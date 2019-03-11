import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  AppRegistry,
  AsyncStorage,
  FlatList
} from "react-native";
import { MapView } from "expo";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Communications from "react-native-communications";
import Swiper from "react-native-swiper";

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
    phone: null,
    picture: [],
    styleId: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        height: 30
      }
    };
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const itemId = navigation.getParam("id");
    //console.log(itemId);
    const response = await axios.get(
      "https://sneaker-map-api.herokuapp.com/get_product_info?id=" + itemId // remplacer l'id par la props reçue de la page précédente
    );
    //console.log("response.data ", response.data);
    const title = response.data.title;
    const description = response.data.description;
    const price = response.data.price;
    const etat = response.data.etat;
    const size = response.data.size;
    const productId = response.data._id;
    const localisation = response.data.localisation;
    const picture = response.data.pictures;
    const styleId = response.data.id_style;

    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    // console.log("userInfo ", userInfo.token);

    const userResponse = await axios.get(
      "https://sneaker-map-api.herokuapp.com/get_my_user_info?token=" +
        userInfo.token
    );

    // console.log(userResponse.data);

    this.setState(
      {
        isLoading: false,
        productId: productId,
        title: title,
        description: description,
        price: price,
        etat: etat,
        size: size,
        picture: picture,
        favory: userResponse.data.favory,
        userToken: userResponse.data.token,
        phone: userResponse.data.phone,
        localisation: localisation,
        styleId: styleId
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
          <Text style={styles.p}>
            {this.state.description + " StyleId : " + this.state.styleId}
          </Text>
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
      "https://sneaker-map-api.herokuapp.com/update_user_info",
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
            <Swiper
              style={{ height: 350 }}
              activeDotColor={"black"}
              showsButtons={true}
              showsPagination={true}
            >
              {this.state.picture.map((photo, i) => {
                return (
                  <View style={{ position: "relative" }} key={i}>
                    <Image
                      resizeMode="contain"
                      style={styles.productPic}
                      source={{
                        uri: photo
                      }}
                    />
                    {this.renderFavorite()}
                  </View>
                );
              })}
            </Swiper>
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
                latitude: this.state.localisation[0],
                longitude: this.state.localisation[1],
                latitudeDelta: 0.025,
                longitudeDelta: 0.0029
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.localisation[0],
                  longitude: this.state.localisation[1]
                }}
                title={"La sneaker dont tu rêves"}
                description={"Elle est là, elle t'attend !"}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "white"
                  }}
                >
                  <Image
                    source={{
                      uri: this.state.picture[0]
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
    marginTop: 35,
    height: 280,
    resizeMode: "contain"
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
    marginBottom: 20,
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
