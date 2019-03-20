import React from "react";
import {
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import axios from "axios";

class MessageScreen extends React.Component {
  state = {
    tabMessage: [],
    profilPicture: "",
    currentuser: "",
    currentusername: ""
  };
  componentDidMount = async () => {
    try {
      this._navListener = this.props.navigation.addListener(
        "didFocus",
        async () => {
          //recupere le username de l'asynstorage
          let user = await AsyncStorage.getItem("userInfo");
          user = JSON.parse(user);
          //recupere la liste des rooms du le user id est inclus ds le nom de la room
          const response = await axios.get(
            "https://sneaker-map-api.herokuapp.com/get_messages?id=" + user._id
          );
          // console.log("user ", user.account.username);
          this.setState({
            tabMessage: response.data,
            currentuser: user.account.poster_profile[0],
            currentusername: user.account.username
          });
        }
      );
    } catch (error) {}
  };

  update = async () => {
    //recupere le username de l'asynstorage
    let user = await AsyncStorage.getItem("userInfo");
    user = JSON.parse(user);
    //recupere la liste des rooms du le user id est inclus ds le nom de la room
    const response = await axios.get(
      "https://sneaker-map-api.herokuapp.com/get_messages?id=" + user._id
    );
    if (response.data.length > this.state.tabMessage) {
      this.setState({
        tabMessage: response.data
      });
    }
    for (let i = 0; i < response.data.length; i++) {
      if (
        response.data[i].message.length >
        this.state.tabMessage[i].message.length
      ) {
        this.setState({
          tabMessage: response.data
        });
      }
    }
  };

  getName = (userName, message) => {
    if (userName === this.state.currentusername) {
      for (let i = 0; i < message.length; i++) {
        if (message[i].user.name !== this.state.currentusername) {
          return message[i].user.name;
        }
      }
    } else {
      return userName;
    }
  };

  render() {
    //this.update();
    return (
      <>
        <FlatList
          data={this.state.tabMessage}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 60,
                marginTop: 10,
                borderBottomColor: "#d5d9e0",
                borderBottomWidth: 0.5
              }}
              onPress={() => {
                this.props.navigation.navigate("Chat", {
                  conversation: item
                });
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 55,
                    height: 55,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 10
                  }}
                  source={{
                    uri:
                      this.state.currentuser === item.userId
                        ? item.sellerId
                        : item.userId
                  }}
                />
                <View>
                  <Text style={{ fontWeight: "700" }}>
                    {this.getName(item.username, item.message)}
                  </Text>
                  <Text style={{ color: "grey", marginTop: 10 }}>
                    {item.message.length > 30
                      ? item.message[item.message.length - 1].text.substring(
                          0,
                          30
                        ) + "..."
                      : item.message[item.message.length - 1].text}
                  </Text>
                </View>
                <Text style={{ marginLeft: 150 }}>
                  {item.message[item.message.length - 1].createdAt.substring(
                    0,
                    10
                  )}
                </Text>
                <View />
              </View>
            </TouchableOpacity>
          )}
        />
      </>
    );
  }
}

export default MessageScreen;
