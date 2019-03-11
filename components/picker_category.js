import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

class NewProduct extends React.Component {
  state = {
    category: "",
    tabcategory: []
  };

  render() {
    return (
      <View
        style={{
          width: 300
        }}
      >
        <RNPickerSelect
          placeholder={{
            label:
              this.props.tabcategory.length === 0
                ? ""
                : "Select une Catégory...",
            value: null,
            color: "#9EA0A4"
          }}
          items={this.props.tabcategory}
          onValueChange={value => {
            this.setState(
              {
                category: value
              },
              () => {
                this.props.Get_Model(this.state.category);
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
          value={this.state.category}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="white" />;
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
    borderWidth: 1,
    marginBottom: 20,

    borderColor: "gray",
    borderRadius: 4,
    color: "white",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 8,
    color: "white",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default NewProduct;
