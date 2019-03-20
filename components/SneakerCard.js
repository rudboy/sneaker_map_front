import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Dimensions
} from "react-native";

class SneakerCard extends React.Component {
  renderImages(sneaker) {
    //console.log(sneaker);
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground
            source={{ uri: sneaker.pictures[0] }}
            style={styles.pictures}
            imageStyle={{ borderRadius: 8 }}
          >
            <View
              style={{
                backgroundColor: "rgba(135, 135, 135, 0.8)",
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: 6
                //borderRadius: 8
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {sneaker.title}{" "}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.price}>
                  {sneaker.price}
                  {" €"}
                </Text>
                <Text style={styles.price}>
                  {"                       "}
                  {sneaker.size}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }

  render() {
    const { sneaker } = this.props;
    return <View style={[styles.container]}>{this.renderImages(sneaker)}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    padding: 2
  },
  pictures: {
    width: Dimensions.get("window").width / 2 - 10,
    height: 120,
    width: 170,
    resizeMode: "contain",
    marginRight: 6,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  text: {
    width: 150,
    color: "white",
    fontWeight: "bold"
  },
  price: {
    color: "white"
  }
});

export default SneakerCard;
