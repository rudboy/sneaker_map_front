import React from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

class PriceSelect extends React.Component {
  state = {
    values: [0, 5000]
  };

  multiSliderValuesChange = values => {
    this.props.price(values);
  };

  render() {
    return (
      <View
        style={{
          color: "grey",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: "grey",
            fontSize: 20
          }}
        >
          {this.props.pricevalue[0]} € - {this.props.pricevalue[1]} €
        </Text>
        <MultiSlider
          //enabledOne={false}
          values={[this.props.pricevalue[0], this.props.pricevalue[1]]}
          trackStyle={{
            height: 5,
            backgroundColor: "white"
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
