import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Statusbar,
  FlatList
} from "react-native";
import { MapView, Location, Permissions } from "expo";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import SneakerCard from "../components/SneakerCard";

class ResultView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Voir La Liste" },
      { key: "second", title: "Voir sur la Carte" }
    ],
    groupName: "",
    numberMember: "",
    category: "",
    description: "",
    tab: [],
    result: ""
  };
  renderTabs = props => (
    <>
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "blue" }}
        style={{ backgroundColor: "#EA3554" }}
      />
    </>
  );

  _renderTabs = props => {
    return (
      <View>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => this.setState({ index: i })}
            >
              <Text style={styles.tabBarText}>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    const result = navigation.getParam("result");
    //console.log(result);
    this.setState({ result: result });
  };

  render() {
    // console.log(this.state.groupName)
    let FirstRoute = () => (
      <ScrollView style={[styles.scene, { backgroundColor: "white" }]}>
        <FlatList
          numColumns={2}
          data={this.state.result}
          keyExtractor={item => {
            return String(item._id);
          }}
          renderItem={obj => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Product", {
                    id: obj.item._id
                  });
                }}
              >
                <SneakerCard sneaker={obj.item} itemOfList={true} />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    );
    let SecondRoute = () => {
      return (
        <View style={styles.map}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.19,
              longitudeDelta: 0.14
            }}
          >
            {this.state.result.map((location, index) => {
              return (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: location.localisation[0],
                    longitude: location.localisation[1]
                  }}
                  title={location.title}
                  // description={location.city.name}
                />
              );
            })}
          </MapView>
        </View>
      );
    };

    return (
      <>
        {/* <View
          style={{
            paddingTop: Platform.OS === "ios" ? 40 : 0,
            backgroundColor: "white"
          }}
        >
          <Text jbkjk />
        </View> */}

        <TabView
          navigationState={this.state}
          renderTabBar={this.renderTabs}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  scene: {
    flex: 1
  },
  tabBarText: {
    fontSize: 20,
    color: "black"
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    borderBottomColor: "blue",
    borderBottomWidth: 2,

    backgroundColor: "#EA3554"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default ResultView;
