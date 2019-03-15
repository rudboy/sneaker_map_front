import React from "react";
import { Text, AsyncStorage, YellowBox } from "react-native";
import SocketIOClient from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";

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
    sellerId: ""
  };

  componentDidMount = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    // console.log("userInfo ", userInfo);
    const { navigation } = this.props;

    this.setState({
      userName: userInfo.account.username,
      userId: userInfo._id,
      sellerId: navigation.getParam("sellerId")
    });

    this.socket.emit("create", {
      // room: this.state.sellerId.toString() + this.state.userId.toString()
      room: "5c8774bbfb32a9001750f55b5c8634347b02550017d9edd9"
    });
  };

  handleSend = async (messages = []) => {
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    //console.log("ici ", this.state.messages[0].text);
    this.socket.emit("message", {
      // room: this.state.sellerId.toString() + this.state.userId.toString(),
      room: "5c8774bbfb32a9001750f55b5c8634347b02550017d9edd9",
      message: messages[0]
    });
    // this._storeMessages(messages);
  };

  onReceiveMessage = messages => {
    console.log("messages ", messages.message);

    this._storeMessages(messages.message);
  };

  render() {
    console.log(typeof this.state.sellerId);
    const user = {
      _id: this.state.userId,
      name: this.state.userName
    };
    // console.log("this.state.messages ", this.state.messages);
    // console.log("this.state.sellerId ", this.state.sellerId);
    return (
      <>
        <Text>Chat</Text>
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

export default Chat;
