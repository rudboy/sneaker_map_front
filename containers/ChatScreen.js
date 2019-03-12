import React from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import SocketIOClient from "socket.io-client";
// import { AsyncStorage } from "react-native";
import axios from "axios";

const user = {
  _id: String(Math.random()), // récupérer l'id via async storage
  name: "Farid Safi" // idem nom
};

class Chat extends React.Component {
  constructor(props) {
    super(props);

    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient("http://localhost:3000");
  }
  state = {
    messages: [],
    id: null
  };

  componentDidMount = async () => {
    const response = await axios.get("http://localhost:3000/get_messages");
    console.log(response.data);
  };

  componentWillUnmount() {}

  handleSend = (messages = []) => {
    this.socket.on("message", message => {
      const oldMessages = this.state.messages;
      // React will automatically rerender the component when a new message is added.
      this.setState({ messages: oldMessages.concat(message) });
    });
  };

  render() {
    return (
      <>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.handleSend}
          user={user}
        />
        <KeyboardAvoidingView
          behavior="padding"
          enabled={Platform.OS === "android"}
        />
      </>
    );
  }
}

export default Chat;
