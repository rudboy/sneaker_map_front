import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons, Entypo } from "@expo/vector-icons";

const marque = require("../assets/json/marque.json");
const placeholder = {
  label: "Marque...",
  value: null,
  color: "#9EA0A4"
};

class NewProduct extends React.Component {
  state = {
    mark: ""
  };

  render() {
    {
    }
    return (
      <View
        style={{
          width: 300
        }}
      >
        <RNPickerSelect
          placeholder={placeholder}
          items={marque}
          onValueChange={value => {
            this.setState(
              {
                mark: value
              },
              () => {
                this.props.Get_Category(this.state.mark);
              }
            );
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12
            }
          }}
          value={this.state.mark}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "red" }}
          Icon={() => {
            return <Entypo name="chevron-small-down" size={24} color="grey" />;
          }}
        />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 15,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    //borderWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default NewProduct;
