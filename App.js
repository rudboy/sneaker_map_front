import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import AuthLoadingScreen from "./containers/AuthLoadingScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import HomeScreen from "./containers/HomeScreen";
import TabNavigator from "./containers/TabNavigator";
import ProductScreen from "./containers/ProductScreen";
import PasswordResetScreen from "./containers/PasswordResetScreen";
import NewProduct from "./containers/New_Product";
import FilterScreen from "./containers/FilterScreen";

const AppStack = createStackNavigator({
  Tab: TabNavigator,
  Filter: FilterScreen,
  Home: HomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  PasswordReset: PasswordResetScreen
});
const AuthStack = createStackNavigator({ Home: HomeScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: HomeScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
