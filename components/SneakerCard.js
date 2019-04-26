import React from "react";
import { StyleSheet, Image, View, Text, Dimensions } from "react-native";

class SneakerCard extends React.Component {
  renderImages(sneaker) {
    // console.log(sneaker);
    return (
      <>
        <View style={{ height: 220 }}>
          <View style={{ flex: 2, padding: 10 }}>
            <Image
              source={{ uri: sneaker.pictures[0] }}
              style={styles.pictures}
              imageStyle={{}}
            />
          </View>
          <View style={{ padding: 10, flex: 1, backgroundColor: "#F6F6F6" }}>
            <Text numberOfLines={2} style={styles.text}>
              {sneaker.title.toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "space-between"
              }}
            >
              <Text style={styles.price}>
                {sneaker.price}
                {" €"}
              </Text>
              <Text style={styles.price}>{sneaker.size}</Text>
            </View>
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
    marginTop: 6,
    marginBottom: 6
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 4
  },

  pictures: {
    height: 100,
    width: 150,
    resizeMode: "contain"
  },
  text: {
    width: 130,
    color: "black",
    fontWeight: "bold"
  },
  price: {
    color: "#AFAFB0",
    fontWeight: "bold"
  }
});

export default SneakerCard;
