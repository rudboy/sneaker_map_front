import React from "react";
import {
  Text,
  AsyncStorage,
  YellowBox,
  View,
  TouchableOpacity
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import SocketIOClient from "socket.io-client";
import axios from "axios";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";
console.ignoredYellowBox = ["Remote debugger"];

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.onReceiveMessage = this.onReceiveMessage.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient("https://sneaker-map-api.herokuapp.com");
    // this.socket = SocketIOClient("http://localhost:8080");
    this.socket.on("message", this.onReceiveMessage);
  }

  state = {
    messages: [],
    userName: "",
    userId: "",
    sellerId: "",
    sellerUserName: "",
    sellerPhoto: "",
    userPhoto: "",
    roomName: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      // header: null

      title: "Message",
      headerStyle: {
        backgroundColor: "white"
      },
      headerTintColor: "grey",
      headerTitleStyle: {
        fontSize: 28,
        fontWeight: "600"
      }
    };
  };

  getRoomInfo = async (seller_id, user_id) => {
    const response = await axios.get(
      "https://sneaker-map-api.herokuapp.com/get_messenger?id=" +
        seller_id +
        user_id
    );
    if (response.data !== null) {
      let temp = [...this.state.messages];
      for (let i = response.data.message.length - 1; i >= 0; i--) {
        //this._storeMessages(response3.data.message[i]);
        temp.push(response.data.message[i]);
        this.setState({ messages: temp });
      }
      this.setState({ roomName: seller_id + user_id });
    } else if (response.data === null) {
      const response2 = await axios.get(
        "https://sneaker-map-api.herokuapp.com/get_messenger?id=" +
          user_id +
          seller_id
      );

      if (response2.data !== null) {
        let temp = [...this.state.messages];
        for (let i = response2.data.message.length - 1; i >= 0; i--) {
          //this._storeMessages(response3.data.message[i]);
          temp.push(response2.data.message[i]);
          this.setState({ messages: temp });
        }
        this.setState({ roomName: user_id + seller_id });
      }
    }
  };

  componentDidMount = async () => {
    //on recupere les infos de l'utlisateur via l'asyncstorage
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);

    // on recupere les infos user de la page productScreen
    const { navigation } = this.props;

    if (navigation.getParam("sellerId")) {
      const response = await axios.get(
        "https://sneaker-map-api.herokuapp.com/get_other_user_info?id=" +
          navigation.getParam("sellerId")
      );
      const response2 = await axios.get(
        "https://sneaker-map-api.herokuapp.com/get_other_user_info?id=" +
          userInfo._id
      );
      this.getRoomInfo(navigation.getParam("sellerId"), userInfo._id);

      this.setState({
        userName: userInfo.account.username,
        userId: userInfo._id,
        userPhoto: response2.data.poster_profile[0],
        sellerId: navigation.getParam("sellerId"),
        sellerUserName: response.data.username,
        sellerPhoto: response.data.poster_profile[0]
      });
    }

    // recupere l'historique de converssation
    if (navigation.getParam("conversation")) {
      //   console.log("toto");
      let temp2 = [...this.state.messages];
      let temp = navigation.getParam("conversation");
      for (let i = temp.message.length - 1; i >= 0; i--) {
        temp2.push(temp.message[i]);
        this.setState({ messages: temp2 });
      }
      let toto = temp.nom.replace(userInfo._id, "");
      this.setState({
        userId: userInfo._id,
        sellerId: toto,
        roomName: temp.nom
      });
    }

    if (this.state.roomName === "") {
      this.socket.emit("create", {
        room: navigation.getParam("sellerId") + userInfo._id
      });
      this.setState({
        roomName: navigation.getParam("sellerId") + userInfo._id
      });
    } else {
      this.socket.emit("create", {
        room: this.state.roomName
      });
    }
  };

  handleSend = async (messages = []) => {
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    //console.log("ici ", this.state.messages[0].text);
    // console.log("this.state.sellerUserName ", this.state.sellerUserName);
    // console.log("this.state.sellerPhoto ", this.state.sellerPhoto);
    // console.log("this.state.userId ", this.state.userId);
    this.socket.emit("message", {
      room: this.state.roomName,
      message: messages[0],
      username: this.state.sellerUserName.toString(),
      sellerPhoto: this.state.sellerPhoto.toString(),
      userPhoto: this.state.userPhoto.toString()
    });
    // const value = JSON.stringify(this.state.messages);
    // await AsyncStorage.setItem(this.state.roomName, value);
  };

  onReceiveMessage = async messages => {
    // console.log("messages ", messages.message);
    this._storeMessages(messages.message);

    // const value = JSON.stringify(messages);
    // await AsyncStorage.setItem(this.state.roomName, value);
  };
  gotTo = () => {
    this.props.navigation.navigate("Messages", {
      reload: "reload"
    });
  };

  render() {
    // console.log(typeof this.state.sellerId);
    const user = {
      _id: this.state.userId,
      name: this.state.userName
    };
    // console.log("this.state.messages ", this.state.messages);
    // console.log("this.state.sellerId ", this.state.sellerId);
    return (
      <>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.handleSend(messages)}
          user={user}
        />
      </>
    );
  }

  _storeMessages = messages => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  };
}

export default withNavigationFocus(Chat);
