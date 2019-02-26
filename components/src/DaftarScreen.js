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
  KeyboardAvoidingView,
  PixelRatio,
  ScrollView,
  Image,
  Alert,
  StatusBar,
  Platform
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
  ListItem
} from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";
import ImagePicker from "react-native-image-picker";
//import ValidationComponent from "react-native-form-validator";


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
        <Text style={{ color: "white", fontSize: 24 }}>Daftar</Text>
      </View>
    );
  }
}
class DaftarScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      nama: '',
      nohp: '',
      image: '',
      srcImg: '',
      uri: '',
      fileName: '',
      ActivityIndicator_Loading: false,

    }
  }
  
  submitData = () => {
    this.uploadPicture();
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch("https://nukeninkonoha.000webhostapp.com/uas/register.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          nama: this.state.nama,
          nohp: this.state.nohp,
          image: "https://nukeninkonoha.000webhostapp.com/uas/img/" + this.state.image
        })
      })
        .then(response => response.json())
        .then(responseJsonFromServer => {
          Alert.alert("SUCESS", responseJsonFromServer);
          this.setState({
            email: "",
            password: "",
            nama: "",
            nohp: "",
            image: "",
            ActivityIndicator_Loading: false
          });
          this.props.navigation.navigate("Account");
        })
        .catch(error => {
          console.error(error);

          this.setState({ ActivityIndicator_Loading: false });
        });
    });
  }
  submitAllData = () => {

    this.submitData();
  }

  choosePicture = () => {
    console.log("upload")
    var ImagePicker = require('react-native-image-picker');
    var options = {
      title: 'Pilih Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        console.log(source);
        console.log(response.fileName);
        this.setState({
          srcImg: source,
          uri: response.uri,
          fileName: response.fileName,
          image: response.fileName,
        });
      }
    });
  };

  uploadPicture = () => {
    console.log('mulai upload');
    this.setState({ loading: true })

    const data = new FormData();
    //data.append('name', 'Fotoku'); // you can append anyone.
    data.append('fileToUpload', {
      uri: this.state.uri,
      type: 'image/jpeg', // or photo.type
      name: this.state.fileName,
    });
    const url = "https://nukeninkonoha.000webhostapp.com/uas/uploadGambar.php";
    fetch(url, {
      method: 'post',
      body: data
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loading: false
        })
      });
  }
  render() {  
    return <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TextInput placeholder="Nama Lengkap" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize="words" onSubmitEditing={() => this.emailInput.focus()} onChangeText={TextInputText => this.setState(
                { nama: TextInputText }
              )} />
          <TextInput placeholder="E-mail" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize="words" ref={input => (this.emailInput = input)} onSubmitEditing={() => this.hpInput.focus()} onChangeText={TextInputText => this.setState(
                { email: TextInputText }
              )} />

          <TextInput placeholder="No HP" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" keyboardType="numeric" returnKeyType="next" autoCapitalize="words" ref={input => (this.hpInput = input)} onSubmitEditing={() => this.passInput.focus()} onChangeText={TextInputText => this.setState(
                { nohp: TextInputText }
              )} />

          <TextInput placeholder="Kata Sandi" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" secureTextEntry ref={input => (this.passInput = input)} onChangeText={TextInputText => this.setState(
                { password: TextInputText }
              )} />

          <View style={{ flex: 1, paddingBottom: 20 }}>
            <TouchableOpacity onPress={this.choosePicture.bind(this)}>
              <View style={styles.ImageContainer}>
                {this.state.srcImg === null ? (
                  <Text>Select a Photo</Text>
                ) : (
                  <Image
                    style={styles.ImageContainer}
                    source={this.state.srcImg}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.submitAllData}>
            {this.state.ActivityIndicator_Loading ? <ActivityIndicator color="#fff" size="large" style={styles.ActivityIndicatorStyle} /> : <Text
                style={styles.TextClass}
              >
                Daftar
              </Text>}
          </TouchableOpacity>

          <Text style={{ fontSize: 15 }}>
            Dengan mendaftar, anda menyetujui
          </Text>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={{ color: "blue", fontSize: 15 }}>
                Syarat dan Ketentuan
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 15 }}>dan</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={{ color: "blue", fontSize: 15 }}>
                Kebijakan Privasi
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>;
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
    fontSize: 20
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
  },
  ImageContainer: {
    borderRadius: 10,
    width: 150,
    height: 150,
    borderColor: "#2196F3",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center",
    
  }
});

//make this component available to the app
export default DaftarScreen;
