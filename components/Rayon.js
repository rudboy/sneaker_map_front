import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

class RayonSelect extends React.Component {
  state = {
    sliderOneChanging: false,
    sliderOneValue: this.props.rayon
  };

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true
    });
  };

  sliderOneValuesChange = values => {
    this.props.Get_rayon(values);
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false
    });
  };

  render() {
    return (
      <View>
        <View style={styles.sliderOne}>
          <Text style={styles.text}>
            Zone autour de la Localisation en KM :
          </Text>
          <Text
            style={[
              styles.text,
              this.state.sliderOneChanging && { color: "blue" }
            ]}
          >
            {this.props.rayon}
          </Text>
        </View>
        <MultiSlider
          values={this.props.rayon}
          trackStyle={{
            height: 5
            //backgroundColor: "#0377c4"
          }}
          containerStyle={{
            height: 50
          }}
          touchDimensions={{
            height: 100,
            width: 100,
            borderRadius: 20,
            slipDisplacement: 40
          }}
          max={1000}
          step={10}
          sliderLength={280}
          onValuesChangeStart={this.sliderOneValuesChangeStart}
          onValuesChange={this.sliderOneValuesChange}
          onValuesChangeFinish={this.sliderOneValuesChangeFinish}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    color: "grey",
    fontSize: 17
  },

  sliderOne: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default RayonSelect;
