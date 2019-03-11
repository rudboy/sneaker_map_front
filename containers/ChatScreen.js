import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const user = {
  _id: String(Math.random()), // récupérer l'id via async storage
  name: "Farid Safi" // idem nom
};

class Chat extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.ws = new WebSocket("ws://lereacteur-ws-server.herokuapp.com/");
    this.ws.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      this.setState({
        messages: [message, ...this.state.messages]
      });
    });
  }

  componentWillUnmount() {
    this.ws.close();
  }

  handleSend = (messages = []) => {
    const message = messages[0];
    this.ws.send(JSON.stringify(message));
    this.setState({
      messages: [message, ...this.state.messages]
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
