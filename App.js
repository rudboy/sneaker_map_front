import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";

import AuthLoadingScreen from "./src/containers/AuthLoadingScreen";
import SignInScreen from "./src/containers/SignInScreen";
import HomeScreen from "./src/containers/HomeScreen";

// import TabNavigator from "./src/containers/TabNavigator";

const AppStack = createStackNavigator({
  // Tab: TabNavigator,
  Home: HomeScreen,
  Other: OtherScreen,
  Room: RoomScreen,
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
