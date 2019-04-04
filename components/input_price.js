import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

class inputPrice extends React.Component {
  render() {
    {
    }
    return (
      <View
        style={{
          width: 250,
          flexDirection: "row",
          marginTop: 25,
          marginBottom: 25
        }}
      >
        <Text
          style={{
            color: "grey",
            fontSize: 20,
            fontWeight: "600",
            marginRight: 10
          }}
        >
          Prix :
        </Text>
        <TextInput
          keyboardType="numeric"
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            width: 100,
            color: "black",
            fontSize: 20
          }}
          onChangeText={price => {
            this.props.get_price(price);
          }}
          value={this.props.price}
        />
        <Text
          style={{
            color: "grey",
            fontSize: 20,
            fontWeight: "600",
            marginRight: 10
          }}
        >
          €
        </Text>
      </View>
    );
  }
}

export default inputPrice;
