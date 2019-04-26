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

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  Feather
} from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profil: ProfileScreen,
    Vendre: NewProductScreen,
    Messages: MessageScreen
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

          case "Profil":
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
      headerTitle = "SneakersMap";
      // return {
      //   header: null
      // };
      break;

    case "Profil":
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
      fontSize: 24,
      fontWeight: "600",
      textAlign: "center",
      flexGrow: 1,
      alignSelf: "center"
      // fontFamily: "Chelsea Market"
    },
    headerTintColor: "grey"
  };
};

export default TabNavigator;
