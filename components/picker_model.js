import React from "react";
import { View, StyleSheet, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

class NewProduct extends React.Component {
  state = {
    model: "",
    index: this.props.childindex
  };

  getImg = () => {
    if (this.props.tab_model.length > 0) {
      try {
        console.log();
        if (this.state.index === "") {
          return "https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png";
        } else if (this.state.index === 0 && this.props.tab_model.length > 0) {
          return this.props.tab_model[0].photo;
        } else if (
          this.state.index === 0 &&
          this.props.tab_model.length === 0
        ) {
          return "https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png";
        }
        if (this.props.tab_model.length > 0 && this.state.index > 0) {
          return this.props.tab_model[Number(this.state.index) - 1].photo;
        } else {
          return "https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    {
    }

    return (
      <>
        <View
          style={{
            width: 300,
            flexDirection: "row"
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

                  this.props.tab_model.length > 0 && Number(index) === 0
                    ? this.props.getURL(this.props.tab_model[index].photo)
                    : this.props.tab_model.length > 0 && Number(index) > 0
                    ? this.props.getURL(this.props.tab_model[index - 1].photo)
                    : this.props.getURL("");

                  this.props.tab_model.length > 0 && Number(index) === 0
                    ? this.props.get_title(
                        this.state.model,
                        this.props.tab_model[index].styleId
                      )
                    : this.props.tab_model.length > 0 && Number(index) > 0
                    ? this.props.get_title(
                        this.state.model,
                        this.props.tab_model[index - 1].styleId
                      )
                    : this.props.get_title("");
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
          <Image
            style={{
              height: 40,
              width: 50
            }}
            resizeMode="contain"
            source={{
              uri: this.getImg()
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
    width: 230,
    borderColor: "gray",
    borderRadius: 4,
    color: "white",
    marginRight: 10,
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: 230,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 8,
    color: "white",
    marginRight: 10,
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default NewProduct;
