//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Slider,
  ActivityIndicator,
  Button,
  Alert,
  StatusBar,
  Platform,
  AsyncStorage
} from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Input,
  Radio,
  ListItem,
} from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";
//import Expo from "expo";

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
        <Text style={{ color: "white", fontSize: 24 }}>Masuk</Text>
      </View>
    );
  }
}
class AccountScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      photoUrl: "",
      email: "",
      password: '',
      nama: '',
      id_user: '',
      ActivityIndicator_Loading: false, 
      data: []
    };
  }
  
  Login = () => {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch("https://nukeninkonoha.000webhostapp.com/uas/login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);

          this.setState({
            ActivityIndicator_Loading: false,
            data: responseJson
          });
          // If server response message same as Data Matched
          if (responseJson === "Login berhasil!") {
            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate("DetailAccount", {
              email: this.state.email
            });
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ ActivityIndicator_Loading: false });
        });

    });
  }

  render() {
    return <View style={styles.container}>
        <View style={styles.BoxClass}>
          <TextInput placeholder="Email" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" autoCapitalize="none" returnKeyType="next" onSubmitEditing={() => this.passInput.focus()} onChangeText={TextInputText => this.setState(
                { email: TextInputText }
              )} />
          <TextInput placeholder="Kata Sandi" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="go" autoCapitalize="none" secureTextEntry ref={input => (this.passInput = input)} onChangeText={TextInputText => this.setState(
                { password: TextInputText }
              )} />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }} />
          
        <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.Login.bind(
          this, this.state.email,
        )}>
            {this.state.ActivityIndicator_Loading ? <ActivityIndicator color="#fff" size="large" style={styles.ActivityIndicatorStyle} /> : <Text
                style={styles.TextClass}
              >
                Masuk
              </Text>}
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 15 }}>Belum punya akun?</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate("Daftar")}>
              <Text style={{ color: "blue", fontSize: 15 }}>Daftar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  BoxClass: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    height: 40,
    borderRadius: 7,
    marginBottom: 10,
    width: "95%"
  },

  TextInputStyleClass: {
    textAlign: "center",
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 7,
    marginBottom: 10,
    width: "100%"
  },
  TextClass: {
    textAlign: "center",
    height: 40,
    width: "100%",
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 15
  },
  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    marginBottom: 20,
    height: 40,
    width: "70%",
    borderRadius: 7
  },
  GoogleLogin: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
    height: 40,
    width: "90%",
    borderRadius: 7
  },
  GoogleText: {
    textAlign: "center",
    height: 40,
    width: "100%",
    marginTop: 10,
    color: "black",
    fontSize: 15
  },
  HargaClass: {
    textAlign: "center",
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 7,
    marginBottom: 10,
    width: "50%"
  },
  ActivityIndicatorStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

//make this component available to the app
export default AccountScreen;
