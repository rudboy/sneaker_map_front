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
          marginTop: 25
        }}
      >
        <Text
          style={{
            color: "white",
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
            borderBottomColor: "white",
            borderBottomWidth: 2,
            width: 100,
            color: "white",
            fontSize: 20
          }}
          onChangeText={price => {
            this.props.get_price(price);
          }}
          value={this.props.price}
        />
      </View>
    );
  }
}

export default inputPrice;
