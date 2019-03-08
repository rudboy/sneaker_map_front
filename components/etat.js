import React from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const marque = require("../assets/json/marque.json");
const placeholder = {
  label: "Selectionner une Taille...",
  value: null,
  color: "#9EA0A4"
};

class Etat extends React.Component {
  state = {
    etat: ""
  };

  render() {
    {
    }
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            marginRight: 10,
            marginBottom: 10
          }}
        >
          Condition
        </Text>
        <View
          style={{
            width: 250,
            flexDirection: "row"
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
            Neuf
          </Text>
          <Switch
            style={{
              marginRight: 40
            }}
            onValueChange={() => {
              this.props.toggleSwitch(!this.props.switchValue);
            }}
            value={this.props.switchValue}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              marginRight: 10
            }}
          >
            Usagé
          </Text>
          <Switch
            onValueChange={() => {
              this.props.toggleSwitch(!this.props.switchValue);
            }}
            value={this.props.switchValue2}
          />
        </View>
      </View>
    );
  }
}

export default Etat;
