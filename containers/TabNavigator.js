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

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  Feather
} from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Vendre: NewProductScreen,
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
            return <Feather name="home" size={25} color={tintColor} />;
            break;

          case "Profile":
            return (
              <MaterialCommunityIcons
                name="account-outline"
                size={28}
                color={tintColor}
              />
            );
            break;

          case "Vendre":
            return (
              <MaterialCommunityIcons
                name="shoe-formal"
                size={30}
                color={tintColor}
              />
            );
            break;
          case "Messages":
            return <AntDesign name="message1" size={25} color={tintColor} />;

            break;

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
      // headerTitle = "Home";
      return {
        header: null
      };
      break;

    case "Profile":
      //headerTitle = "Profil";
      return {
        header: null
      };
      break;

    case "Vendre":
      headerTitle = "Mettre en Vente";
      // return {
      //   header: null
      //};
      break;

    case "Messages":
      headerTitle = "Messagerie";
      break;

    default:
      headerTitle = routeName;
  }

  return {
    headerTitle,
    headerBackTitle,
    headerStyle: {
      backgroundColor: "white"
    },
    headerTitleStyle: {
      fontSize: 28,
      fontWeight: "600",
      textAlign: "center",
      flexGrow: 1,
      alignSelf: "center"
    },
    headerTintColor: "grey"
  };
};

export default TabNavigator;
