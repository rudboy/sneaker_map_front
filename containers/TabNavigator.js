import React from "react";
import {
  createBottomTabNavigator
  // createDrawerNavigator,
} from "react-navigation";
import { TouchableOpacity, Alert, AsyncStorage } from "react-native";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import NewProductScreen from "./New_Product";
import MessageScreen from "./MessageScreen";
import SellerProfileScreen from "./SellerProfileScreen";
import ChatScreen from "./ChatScreen";
// import SettingsScreen from "./SettingsScreen";
// import ChatScreen from "./ChatScreen";

import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    NewProduct: NewProductScreen,
    Messages: MessageScreen
    // Chat: ChatScreen,
    // Settings: SettingsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "Home":
            iconName = "ios-home";
            break;

          case "Profile":
            iconName = "ios-person";
            break;

          case "NewProduct":
            iconName = "ios-add";
            break;
          case "Messages":
            iconName = "ios-chatbubbles";
            break;
          // case "Settings":
          //   iconName = "ios-settings";

          case "NewProduct":
            iconName = "ios-settings";
            break;

          default:
            iconName = null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      labelStyle: {
        marginVertical: -10
      },
      activeTintColor: "black",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;
  let headerBackTitle;

  switch (routeName) {
    case "Home":
      headerTitle = "Home";
      break;

    case "Profile":
      headerTitle = "Profil";
      break;

    case "NewProduct":
      headerTitle = "Ajouter Produit";
      break;

    case "Messages":
      headerTitle = "Messages";
      break;

    default:
      headerTitle = routeName;
  }

  return {
    headerTitle,
    headerBackTitle,
    headerStyle: {
      backgroundColor: "#111"
    },
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: "200"
    },
    headerTintColor: "#fff"
  };
};

export default TabNavigator;
