import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons, Entypo } from "@expo/vector-icons";

class PickerSIze extends React.Component {
  render() {
    {
    }
    return (
      <View
        style={{
          width: 150
        }}
      >
        <RNPickerSelect
          placeholder={{
            label: this.props.tab_size.length <= 0 ? "" : "Taille",
            value: this.props.tab_size.length <= 0 ? null : null,
            color: "#9EA0A4"
          }}
          items={this.props.tab_size}
          onValueChange={value => {
            this.props.get_size_db(value);
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12
            }
          }}
          value={this.props.size}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
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
    //borderWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 15,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    //borderWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default PickerSIze;
