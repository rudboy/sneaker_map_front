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
          {this.state.values[0]} € - {this.state.values[1]} €
        </Text>
        <MultiSlider
          values={[this.state.values[0], this.state.values[1]]}
          sliderLength={280}
          onValuesChange={this.multiSliderValuesChange}
          min={0}
          max={1000}
          step={1}
        />
      </View>
    );
  }
}

export default PriceSelect;
