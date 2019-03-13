import React from "react";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

class Name extends React.Component {
  deleteFn = async (id, index) => {
    await axios.post(
      "https://sneaker-map-api.herokuapp.com/delete_product?id=" + id
    );

    let newTab = [...this.props.product];
    newTab.splice(index, 1);
    this.props.deleteProduct(newTab);
  };

  Alert = (id, index) => {
    Alert.alert(
      undefined,
      "Êtes vous sûr de vouloir supprimer ce produit ?",
      // "My Alert Msg",
      [
        // {
        //   text: "Ask me later",
        //   onPress: () => console.log("Ask me later pressed"),
        // },
        {
          text: "Annuler",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => this.deleteFn(id, index),
        },
      ],
      { cancelable: false }
    );
  };

  deleteCross = (id, index) => {
    if (this.props.deleteCross) {
      return (
        <TouchableOpacity onPress={() => this.Alert(id, index)}>
          <Ionicons
            style={styles.deleteCross}
            name="ios-close-circle-outline"
            size={32}
            color="#000"
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  handleFavorite = async (id, index) => {
    // Modifier tableau de favoris de l'utilisateur:
    // appeler la route update user
    await axios.post(
      "https://sneaker-map-api.herokuapp.com/update_user_info",
      {
        //body
        favory: id,
      },
      {
        headers: {
          authorization: "Bearer " + this.props.profile.token,
        },
      }
    );

    let newTab = [...this.props.favorite];
    newTab.splice(index, 1);
    this.props.deleteFavorite(newTab);
  };

  deleteFav = (id, index) => {
    if (this.props.deleteFavorite) {
      return (
        <TouchableOpacity onPress={() => this.handleFavorite(id, index)}>
          <Ionicons
            style={styles.deleteFavorite}
            name="ios-close-circle-outline"
            size={32}
            color="#000"
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  // deleteCross = (id, index) => {
  //   if (this.props.deleteCross) {
  //     return (
  //       <TouchableOpacity onPress={() => this.deleteFn(id, index)}>
  //         <Ionicons
  //           style={styles.deleteCross}
  //           name="ios-close-circle-outline"
  //           size={32}
  //           color="#000"
  //         />
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  render() {
    // const { deleteCross } = this.props;
    return (
      <>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            marginVertical: 30,
          }}
        >
          <FlatList
            data={this.props.product}
            horizontal
            keyExtractor={item => String(item._id)}
            renderItem={({ item, index }) => (
              <View key={item} style={styles.containerProduct}>
                {this.deleteCross(item._id, index)}

                <TouchableOpacity>
                  <View>
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={{ uri: item.pictures[0] }}
                    />
                    <Text numberOfLines={1} style={styles.title}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{item.size}</Text>
                      <Text>{item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>

        <ScrollView
          horizontal={true}
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            marginVertical: 30,
          }}
        >
          <FlatList
            data={this.props.favorite}
            horizontal
            keyExtractor={item => String(item._id)}
            renderItem={({ item, index }) => (
              <View key={item} style={styles.containerProduct}>
                {this.deleteFav(item._id, index)}

                <TouchableOpacity>
                  <View>
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={{ uri: item.pictures[0] }}
                    />
                    <Text numberOfLines={1} style={styles.title}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{item.size}</Text>
                      <Text>{item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  containerProduct: {
    paddingRight: 15,
  },
  title: {
    width: 150,
  },
});

export default Name;
