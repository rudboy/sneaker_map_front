import React from "react";
import { Text, AsyncStorage, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";

class MessageScreen extends React.Component {
  state = {
    tabMessage: {}
  };
  componentDidMount = async () => {
    let user = await AsyncStorage.getItem("userInfo");
    user = JSON.parse(user);

    // console.log(user._id);

    const response = await axios.get(
      //   "https://sneaker-map-api.herokuapp.com/get_messages?id=" + user._id
      "http://localhost:5000/get_messages?id=" + user._id
    );
    console.log("response :", response.data);

    this.setState({ tabMessage: response.data });
  };
  displayFlatlist = () => {
    return (
      <FlatList
        data={Object.keys(this.state.tabMessage)}
        keyExtractor={item => {
          return String(item._id);
        }}
        renderItem={obj => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ChatRoom", {
                  conversation: obj.item
                });
              }}
            >
              <Text>Text</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  render() {
    console.log("this.state.tabMessage ", this.state.tabMessage);

    return (
      <>
        <Text>Messages</Text>
        {this.displayFlatlist()}
      </>
    );
  }
}

export default MessageScreen;
