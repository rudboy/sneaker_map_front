import React from "react";
import {
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  StyleSheet
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
          //console.log("user ", response.data);
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
    let { width } = Dimensions.get("window");

    return (
      <>
        <FlatList
          data={this.state.tabMessage}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 65,
                marginTop: 10,
                borderBottomColor: "grey",
                borderBottomWidth: StyleSheet.hairlineWidth
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
                    borderRadius: 10,
                    marginBottom: 90
                  }}
                  source={{
                    uri:
                      this.state.currentuser === item.userPhoto
                        ? item.sellerPhoto
                        : item.userPhoto
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: width - 85
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ fontWeight: "700", width: width / 3.5 }}
                    >
                      {this.getName(item.username, item.message)}
                    </Text>
                    <Text>
                      {item.message[
                        item.message.length - 1
                      ].createdAt.substring(0, 10)}
                    </Text>
                  </View>
                  <Text style={{ color: "grey", marginTop: 10 }}>
                    {item.message.length > 30
                      ? item.message[item.message.length - 1].text.substring(
                          0,
                          30
                        ) + "..."
                      : item.message[item.message.length - 1].text}
                  </Text>
                </View>
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
