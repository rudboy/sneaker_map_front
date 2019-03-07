import React from "react";
import {
  createBottomTabNavigator,
  // createDrawerNavigator,
} from "react-navigation";
import HomeScreen from "./HomeScreen";
// import SettingsScreen from "./SettingsScreen";
// import ChatScreen from "./ChatScreen";

import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
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
          // case "Settings":
          //   iconName = "ios-settings";

          //   break;
          // case "Chat":
          //   iconName = "ios-chatboxes";

          //   break;
          default:
            iconName = null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    },
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
    case "Settings":
      headerTitle = "Paramètres";
      break;
    default:
      headerTitle = routeName;
  }

  return {
    headerTitle,
    headerBackTitle,
    headerStyle: {
      backgroundColor: "#000",
    },
    headerTitleStyle: {
      fontSize: 30,
      fontWeight: "200",
    },
    headerTintColor: "#fff",
  };
};

export default TabNavigator;
