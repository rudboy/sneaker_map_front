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
  FlatList,
  Animated,
  ActivityIndicator
} from "react-native";
import { MapView, Location, Permissions } from "expo";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import SneakerCard from "../components/SneakerCard";

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

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
    result: "",
    isLoading: true,
    region: {}
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

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const result = navigation.getParam("result");
    this.setState({
      result: result,
      isLoading: false,
      region: {
        latitude: result[0].localisation[0],
        longitude: result[0].localisation[1],
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
      }
    });

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.result.length) {
        index = this.state.result.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { localisation } = this.state.result[index];
          this.map.animateToRegion(
            {
              latitude: localisation[0],
              longitude: localisation[1],
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return <ActivityIndicator />;
    } else {
      const interpolations = this.state.result.map((location, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          (index + 1) * CARD_WIDTH
        ];
        const scale = this.animation.interpolate({
          inputRange,
          outputRange: [1, 2.5, 1],
          extrapolate: "clamp"
        });
        const opacity = this.animation.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp"
        });
        return { scale, opacity };
      });

      // console.log(this.state.groupName)
      let FirstRoute = () => (
        <ScrollView style={[styles.scene, { backgroundColor: "white" }]}>
          <FlatList
            // key={}
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
              ref={map => (this.map = map)}
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta
              }}
            >
              {this.state.result.map((location, index) => {
                // console.log("location ", location);
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale
                    }
                  ]
                };
                const opacityStyle = {
                  opacity: interpolations[index].opacity
                };
                return (
                  <MapView.Marker
                    key={index}
                    coordinate={{
                      latitude: location.localisation[0],
                      longitude: location.localisation[1]
                    }}
                    title={location.title}
                    // description={location.city.name}
                  >
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                      <Animated.View style={[styles.ring, scaleStyle]} />
                      <View style={styles.marker} />
                    </Animated.View>
                  </MapView.Marker>
                );
              })}
            </MapView>
            <Animated.ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.animation
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}
            >
              {this.state.result.map((location, index) => (
                <TouchableOpacity
                  style={styles.card}
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate("Product", {
                      id: location._id
                    });
                  }}
                >
                  <Image
                    source={{ uri: location.pictures[0] }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {location.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {location.price} €
                      </Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>
                        {location.size}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </Animated.ScrollView>
          </View>
        );
      };

      return (
        <>
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
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  tabBarText: {
    fontSize: 20,
    color: "white"
  },

  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});

export default ResultView;
