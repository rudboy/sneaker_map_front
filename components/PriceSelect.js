import React from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

class PriceSelect extends React.Component {
  state = {
    values: [0, 5000]
  };

  multiSliderValuesChange = values => {
    this.setState({
      values
    }),
      this.props.price(this.state.values);
  };

  render() {
    return (
      <View
        style={{
          color: "white",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: "white"
          }}
        >
          {this.props.pricevalue[0]} € - {this.props.pricevalue[1]} €
        </Text>
        <MultiSlider
          //enabledOne={false}
          values={[this.state.values[0], this.state.values[1]]}
          trackStyle={{
            height: 5,
            backgroundColor: "white"
          }}
          containerStyle={{
            height: 50
          }}
          touchDimensions={{
            height: 50,
            width: 50,
            borderRadius: 20,
            slipDisplacement: 40
          }}
          sliderLength={250}
          onValuesChange={this.multiSliderValuesChange}
          min={0}
          max={5000}
          step={100}
        />
      </View>
    );
  }
}

export default PriceSelect;
