import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import NewProductScreen from "./New_Product";
const Home = createStackNavigator({
  Annonces: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
      //   headerStyle: {
      //     backgroundColor: "#F5F5F5"
      //   },
      //   title: "Annonces",
      //   headerTitleStyle: {
      //     color: "#041A39",
      //     fontSize: 22,
      //     fontWeight: "bold"
      //   }
    }
  }
});
Home.navigationOptions = {
  tabBarLabel: "Accueil",
  tabBarOptions: {
    activeTintColor: "#B2025A",
    inactiveTintColor: "#ACB9CC"
  },
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-home" size={25} color="gray" />
  )
};

const Profile = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  }
});

Profile.navigationOptions = {
  tabBarLabel: "Mon Profil",
  tabBarOptions: {
    activeTintColor: "#B2025A",
    inactiveTintColor: "#ACB9CC"
  },
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-home" size={25} color="gray" />
  )
};
const NewProduct = createStackNavigator({
  NewProduct: {
    screen: NewProductScreen,
    navigationOptions: {
      header: null
    }
  }
});

NewProduct.navigationOptions = {
  tabBarLabel: "Vendre",
  tabBarOptions: {
    activeTintColor: "#B2025A",
    inactiveTintColor: "#ACB9CC"
  },
  tabBarIcon: ({ focused }) => {
    return <Ionicons name="ios-home" size={25} color="gray" />;
  }
};
export default createBottomTabNavigator({
  Home,
  Profile,
  NewProduct
});
