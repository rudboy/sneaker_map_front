import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { MapView } from "expo";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";

class ProductScreen extends React.Component {
  state = {
    isLoading: true,
    productId: "",
    title: "",
    description: "",
    price: "",
    size: "",
    isFavorite: false,
    isOpen: false,
    favory: [],
    userToken: null
  };

  componentDidMount = async () => {
    const response = await axios.get(
      "http://localhost:5500/get_product_info?id=5c80f22710b1f405ffdfd7b5" // remplacer l'id par la props reçue de la page précédente
    );
    // console.log("response.data ", response.data);
    const title = response.data.title;
    const description = response.data.description;
    const price = response.data.price;
    const size = response.data.size;
    const productId = response.data._id;

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
        size: size,
        favory: userResponse.data.favory,
        userToken: userResponse.data.token
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
        style={{ position: "absolute", right: 8, top: 5 }}
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
      "http://localhost:5500/update_user_info",
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
    // this.setState({
    //   isFavorite: this.state.isFavorite === true ? false : true
    // });
  };

  render() {
    if (this.state.isLoading === true) {
      return <ActivityIndicator />;
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
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.title}>Description</Text>
            <TouchableOpacity onPress={this.handlePress}>
              {this.renderDesc()}
            </TouchableOpacity>
            <Text style={styles.title}>Pointure</Text>
            <Text style={styles.p}>{this.state.size}</Text>
            <Text style={styles.title}>Prix</Text>
            <Text style={styles.p}>{this.state.price} €</Text>
            <Text style={styles.title}>Localisation</Text>
            <MapView
              style={{ height: 180 }}
              initialRegion={{
                latitude: 48.856614,
                longitude: 2.3522219,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
              }}
            />
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
              <Ionicons name="ios-chatboxes" size={50} color="black" />
              <Text>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
              <FontAwesome name="phone" size={50} color="black" />
              <Text>Contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SellerProfile")}
              style={styles.iconWrapper}
            >
              <Ionicons name="ios-person" size={50} color="black" />
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
    padding: 16
  },
  productPic: {
    width: "100%",
    height: 180
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
    marginVertical: 16,
    height: 80
  },
  iconWrapper: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
