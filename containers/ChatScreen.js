import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import SocketIOClient from "socket.io-client";
import axios from "axios";

const user = {
  _id: String(Math.random()), // récupérer l'id via async storage
  name: "Farid Safi" // idem nom
};

class Chat extends React.Component {
  constructor(props) {
    super(props);

    // Creating the socket-client instance will automatically connect to the server.
    this.socket = SocketIOClient("http://localhost:8080");

    this.socket.emit("channel1", "Hi server"); // emits 'hi server' to your server

    // Listens to channel2 and display the data recieved
    this.socket.on("channel2", data => {
      console.log("Data recieved from server", data); //this will console 'channel 2'
    });
  }

  clicked = () => {
    const dataObj = {
      action: "click"
    };

    this.socket.emit("channel2", dataObj);
  };

  render() {
    return (
      <View>
        <Text> Socket.io with react native </Text>
        <TouchableOpacity onPress={() => this.clicked}>
          {" "}
          Click{" "}
        </TouchableOpacity>
      </View>
    );
  }
}

//   state = {
//     messages: [],
//     id: null
//   };

//   // componentDidMount = async () => {
//   //   const response = await axios.get("http://localhost:3000/get_messages");
//   //   console.log(response.data);
//   // };

//   handleSend = (messages = []) => {
//     this.socket.on("message", message => {
//       const oldMessages = this.state.messages;
//       // React will automatically rerender the component when a new message is added.
//       this.setState({ messages: oldMessages.concat(message) });
//     });
//   };

//   render() {
//     return (
//       <>
//         <GiftedChat
//           messages={this.state.messages}
//           onSend={this.handleSend}
//           user={user}
//         />
//         <KeyboardAvoidingView
//           behavior="padding"
//           enabled={Platform.OS === "android"}
//         />
//       </>
//     );
//   }
// }

export default Chat;
