//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Platform
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Polyline from "@mapbox/polyline";
// create a component
class LogoTitle extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#2196F3",
          justifyContent: "center",
          height: 60,
          width: "100%",
          marginTop: Platform.OS == "ios" ? 20 : 0
        }}
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#2196F3"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <Text style={{ color: "white", fontSize: 24 }}>Map</Text>
      </View>
    );
  }
}

class MapScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      lat: "",
      long: "",
      longitude: null,
      error: null,
      concat: null,
      coords: [],
      x: "false",
      cordLatitude: '',
      cordLongitude: ''
    };

    this.mergeLot = this.mergeLot.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          cordLatitude: this.props.navigation.state.params.lat,
          cordLongitude: this.props.navigation.state.params.long,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
        this.mergeLot();
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
  }

  mergeLot() {
    if (this.state.latitude != null && this.state.longitude != null) {
      let concatLot = this.state.latitude + "," + this.state.longitude;
      this.setState(
        {
          concat: concatLot,
        },
        () => {
            this.getDirections(concatLot, '(this.state.cordLatitude,this.state.cordLongitude)');
        }
      );
    }
  }

  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      console.log(respJson);
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords });
      this.setState({ x: "true" });
      return coords;
    } catch (error) {
      console.log("masuk fungsi");
      this.setState({ x: "error" });
      return error;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -8.242042,
            longitude: 115.023602,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
          mapType="standard"
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsIndoors={true}
        >
          {!!this.state.latitude &&
            !!this.state.longitude && (
              <MapView.Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
                title={"Your Location"}
              />
            )}

          {!!this.state.cordLatitude &&
            !!this.state.cordLongitude && (
              <MapView.Marker
                coordinate={{
                  latitude: this.state.cordLatitude,
                  longitude: this.state.cordLongitude
                }}
                title={"Your Destination"}
              />
            )}

          {!!this.state.latitude &&
            !!this.state.longitude &&
            this.state.x == "true" && (
              <MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={3}
                strokeColor="blue"
              />
            )}

          {!!this.state.latitude &&
            !!this.state.longitude &&
            this.state.x == "error" && (
              <MapView.Polyline
                coordinates={[
                  {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  },
                  {
                    latitude: this.state.cordLatitude,
                    longitude: this.state.cordLongitude
                  }
                ]}
                strokeWidth={3}
                strokeColor="blue"
              />
            )}
        </MapView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

//make this component available to the app
export default MapScreen;
