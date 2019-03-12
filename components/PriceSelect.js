import React from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

class PriceSelect extends React.Component {
  state = {
    values: [0, 1000]
  };

  multiSliderValuesChange = values => {
    this.setState({
      values
    });
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
          {this.state.values[0]} € - {this.props.price[1]} €
        </Text>
        <MultiSlider
          enabledOne={false}
          values={[this.state.values[0], this.props.price[1]]}
          sliderLength={280}
          onValuesChange={price => {
            this.props.priceMax(price);
          }}
          min={0}
          max={1000}
          step={1}
        />
      </View>
    );
  }
}

export default PriceSelect;
