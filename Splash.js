import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';



class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            Actions.Route()
        }, 4000);
    }
    render() {
        return <View style={styles.container}>
            <Image style={{ width: 250, height: 250 }} source={require("./components/src/img/logo.png")} />
          </View>;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
export default Splash;