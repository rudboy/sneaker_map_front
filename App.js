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

const AppStack = createStackNavigator({
  Tab: TabNavigator,
  Home: HomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  PasswordReset: PasswordResetScreen,
  Product: ProductScreen
});
const AuthStack = createStackNavigator({ Product: ProductScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
