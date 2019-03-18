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
    //recupere le username de l'asynstorage
    let user = await AsyncStorage.getItem("userInfo");
    user = JSON.parse(user);
    //recupere la liste des rooms du le user id est inclus ds le nom de la room
    const response = await axios.get(
      "https://sneaker-map-api.herokuapp.com/get_messages?id=" + user._id
    );
    this.setState({
      tabMessage: response.data,
      currentuser: user.account.poster_profile[0],
      currentusername: user.username
    });
  };

  //affiche chaque conversation ds une listeView
  // displayFlatlist = () => {
  //   return (

  //   );
  // };
  render() {
    //console.log(this.getPhoto(item.sellerId, item.userId));

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
                borderBottomColor: "grey",
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
                    {item.username === this.state.currentusername
                      ? item.username
                      : item.message[0].user.name}
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
