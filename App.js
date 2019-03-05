import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";

import AuthLoadingScreen from "./containers/AuthLoadingScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import HomeScreen from "./containers/HomeScreen";

// import TabNavigator from "./src/containers/TabNavigator";

const AppStack = createStackNavigator({
  // Tab: TabNavigator,
  Home: HomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
