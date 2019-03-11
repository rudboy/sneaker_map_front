import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";

class PasswordReset extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      headerStyle: {
        backgroundColor: "#000"
      }
    };
  };

  state = {
    email: ""
  };

  onPress = async () => {
    try {
      // On charge les données ici
      const response = await axios.post(
        "https://sneaker-map-api.herokuapp.com/password_forgotten",
        {
          email: this.state.email
        }
      );
      console.log("response data ", response.data);
      if (response.data === "Message envoyé !") {
        alert("Un mail vous a été envoyé !");
        // redirige vers la page d'accueil :
        this.props.navigation.navigate("SignIn");
      } else {
        alert(response.data.message); // ici `response.data`renvoie le message `erreur dans l'adresse email`
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <>
        <View style={styles.container}>
          <Text style={{ color: "white", marginBottom: 25, fontSize: 18 }}>
            Demander un nouveau mot de passe
          </Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Votre email"
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TouchableOpacity onPress={this.onPress} style={styles.button}>
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("SignIn")}>
            <Text style={{ color: "white" }}>Retour page de connexion</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
    height: 50,
    borderRadius: 10,
    color: "white"
  },
  button: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600"
  }
});
