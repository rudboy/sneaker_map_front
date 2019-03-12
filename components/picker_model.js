import React from "react";
import { View, StyleSheet, Image, AsyncStorage } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

class NewProduct extends React.Component {
  state = {
    model: "",
    tab_model: [],
    index: "",
    styleID: ""
  };

  saveimg = async () => {
    if (this.props.tab_model.length > 0) {
      await AsyncStorage.setItem("imageForMarker", "url");
    }
  };

  render() {
    {
      this.state.index !== "" ? this.saveimg() : "";
    }

    return (
      <>
        <View
          style={{
            width: 250
          }}
        >
          <RNPickerSelect
            placeholder={{
              label:
                this.props.tab_model.length <= 0
                  ? ""
                  : this.props.tab_model[this.props.index].value,
              value:
                this.props.tab_model.length <= 0
                  ? null
                  : this.props.tab_model[this.props.index].value,
              color: "#9EA0A4"
            }}
            items={this.props.tab_model}
            onValueChange={(value, index) => {
              this.setState(
                {
                  model: value,
                  index: index
                },
                () => {
                  this.props.Get_Size();

                  this.props.get_title(
                    this.state.model,
                    this.props.tab_model[index].styleId
                  );
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
            value={this.state.model}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: "yellow" }}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="white" />;
            }}
          />
        </View>
        <View>
          <Image
            style={{ height: 40, width: 50, marginBottom: 10 }}
            resizeMode="contain"
            source={{
              uri:
                this.state.index === ""
                  ? ""
                  : this.props.tab_model[this.state.index].photo
            }}
          />
        </View>
      </>
    );
  }

  componentDidMount = async () => {
    try {
      // On charge les données ici
    } catch (error) {
      console.log(error);
    }
  };
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 10,

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
