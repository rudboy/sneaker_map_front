import React from "react";
import { StyleSheet, Image, View, Text, Dimensions } from "react-native";

class SneakerCard extends React.Component {
  renderImages(sneaker) {
    //console.log(sneaker);
    return (
      <>
        <View style={{ margin: 8 }}>
          <Image
            source={{ uri: sneaker.pictures[0] }}
            style={styles.pictures}
            imageStyle={{}}
          />

          <Text numberOfLines={1} style={styles.text}>
            {sneaker.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.price}>
              {sneaker.price}
              {" €"}
            </Text>
            <Text style={styles.price}>
              {"                   "}
              {sneaker.size}
            </Text>
          </View>
        </View>
      </>
    );
  }

  render() {
    const { sneaker } = this.props;
    return <View style={[styles.container]}>{this.renderImages(sneaker)}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: "white",
    margin: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },

  pictures: {
    height: 100,
    width: 140,
    resizeMode: "contain"
  },
  text: {
    width: 130,
    color: "black",
    fontWeight: "bold"
  },
  price: {
    color: "black"
  }
});

export default SneakerCard;
