//import liraries
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    StatusBar,
    Platform,
    TouchableOpacity
} from "react-native";
import { Container, Header, Right, Left, Icon, Body, Button, Footer } from "native-base";
import MapView from "react-native-maps";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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

class AddLocation extends React.Component {
    static navigationOptions = {
        headerTitle: <LogoTitle />
    };
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            latitude: -8.240570,
            longitude: 115.025235,
            email: '',
            id_user: '',

        };
    }
    onRegionChange(region, latitude, longitude) {
        this.setState({
            mapRegion: region,
            // If there are no new values set the current ones
            latitude: latitude || this.state.latitude,
            longitude: longitude || this.state.longitude
        });
        console.log('ini region', region);
        console.log("ini latitude", latitude);
        console.log("ini longitude", longitude);
    }
    goBack(){
        this.props.navigation.state.params.returnData( this.state.latitude, this.state.longitude);
        this.props.navigation.goBack();
    }
    Back = (email, id_user, latitude, longitude) => {
        this.props.navigation.navigate("Kos", {
            email: email,
            id_user: id_user,
            latitude: latitude,
            longitude: longitude,
        });
    };
    componentDidMount() {
        this.setState({
            email: this.props.navigation.state.params.email,
            id_user: this.props.navigation.state.params.id_user,
        });
    }
    render() {
        return <View style={styles.container}>
            <Header style={{ backgroundColor: "white", alignItems: "center" }}>
              <View>
                <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.Back.bind(this, this.state.email, this.state.id_user, this.state.latitude, this.state.longitude)}>
                  <Text
                      style={styles.TextClass}>
                      Daftarkan Kos
                    </Text>
                </TouchableOpacity>
              </View>
            </Header>

            <MapView style={{ flex: 1, width: window.width }} initialRegion={{ latitude: -8.572564, longitude: 115.219995, latitudeDelta: 1, longitudeDelta: 1 }} onRegionChange={regions => {
                this.setState({ mapRegion: regions });
              }} onPress={e => {
                const region = { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, latitudeDelta: 0.00922 * 1.5, longitudeDelta: 0.00421 * 1.5 };
                this.onRegionChange(region, region.latitude, region.longitude);
              }}>
              <MapView.Marker coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }} title="Lokasi" description="Hello" />
            </MapView>
          </View>;
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        height: "100%",
        width: window.width
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    TouchableOpacityStyle: {
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#2196F3",
        marginBottom: 20,
        height: 40,
        width: "100%",
        borderRadius: 7
    },
});

//make this component available to the app
export default AddLocation;
