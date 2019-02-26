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
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";

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
        <Text style={{ color: "white", fontSize: 24 }}>Tambah Kost</Text>
      </View>
    );
  }
}
class DaftarKos extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor() {
    super();
    this.state = {
      email: "",
      nama_kos: "",
      alamat: "",
      harga: "",
      type: "",
      luas_kamar: "",
      fasilitas: "",
      lat: '',
      lng: '',
      kota: '',
      id_user: '',
      jml_kamar: '',
      image: '',
      srcImg: '',
      uri: '',
      fileName: '',
      
      ActivityIndicator_Loading: false
    };
  } 
  submitData = () => {
    this.uploadPicture();
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch("https://nukeninkonoha.000webhostapp.com/uas/tambahkos.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_user: this.state.id_user,
          email: this.state.email,
          nama_kos: this.state.nama_kos,
          alamat: this.state.alamat,
          harga: this.state.harga,
          type: this.state.type,
          lat: this.state.lat,
          lng: this.state.lng,
          luas_kamar: this.state.luas_kamar,
          fasilitas: this.state.fasilitas,
          image: "https://nukeninkonoha.000webhostapp.com/uas/imgKost/" +this.state.image,
          kota: this.state.kota,
          jml_kamar: this.state.jml_kamar
        })
      })
        .then(response => response.json())
        .then(responseJsonFromServer => {
          console.log("Data didapat", responseJsonFromServer);
          Alert.alert("SUCESS", responseJsonFromServer);
          this.setState({
            id_user: "",
            email: "",
            nama_kos: "",
            alamat: "",
            harga: "",
            type: "",
            lat: '',
            lng: '',
            luas_kamar: "",
            fasilitas: "",
            image: "",
            kota: "",
            jml_kamar: "",
            ActivityIndicator_Loading: false
          });
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
    const url = "https://nukeninkonoha.000webhostapp.com/uas/uploadGambarKost.php";
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
  
  componentDidMount() {
    this.setState({
      email: this.props.navigation.state.params.email,
      id_user: this.props.navigation.state.params.id_user,
      lat: this.props.navigation.state.params.latitude,
      lng: this.props.navigation.state.params.longitude
    });
  }

  onSelect(index, value) {
    this.setState({
      type: value
    });
  }

  render() {
    return <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{ flex: 1, paddingBottom: 20, flexDirection: "row", justifyContent: "space-around" }}>
          
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

          <TextInput placeholder="Nama Kost" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize="words" onSubmitEditing={() => this.alamatInput.focus()} onChangeText={TextInputText => this.setState(
                { nama_kos: TextInputText }
              )} />
          <TextInput placeholder="Alamat" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize="words" ref={input => (this.alamatInput = input)} onSubmitEditing={() => this.kotaInput.focus()} onChangeText={TextInputText => this.setState(
                { alamat: TextInputText }
              )} />
        <TextInput placeholder="Kota" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize="words" ref={input => (this.kotaInput = input)} onSubmitEditing={() => this.hargaInput.focus()} onChangeText={TextInputText => this.setState(
          { kota: TextInputText }
        )} />
          <TextInput placeholder="Harga" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize="words" ref={input => (this.hargaInput = input)} onSubmitEditing={() => this.luas_kamarInput.focus()} onChangeText={TextInputText => this.setState(
                { harga: TextInputText }
              )} />

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <RadioGroup style={{ flexDirection: "row" }} onSelect={(index, value) => this.onSelect(index, value)}>
              <RadioButton value={"Putri"}>
                <Text>Putri</Text>
              </RadioButton>
              <RadioButton value={"Campuran"}>
                <Text>Campuran</Text>
              </RadioButton>
            </RadioGroup>
            <Text>{this.state.text}</Text>
          </View>
          <TextInput placeholder="Luas Kamar" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize="words" ref={input => (this.luas_kamarInput = input)} onSubmitEditing={() => this.fasilitasInput.focus()} onChangeText={TextInputText => this.setState(
                { luas_kamar: TextInputText }
              )} />
        <TextInput placeholder="Fasilitas" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" returnKeyType="go" autoCapitalize="words" ref={input => (this.fasilitasInput = input)} onSubmitEditing={() => this.jml_kamarInput.focus()} onChangeText={TextInputText => this.setState(
                { fasilitas: TextInputText }
              )} />
        <TextInput placeholder="Jumlah Kamar" style={styles.TextInputStyleClass} underlineColorAndroid="transparent" keyboardType="numeric" returnKeyType="next" autoCapitalize="words" ref={input => (this.jml_kamarInput = input)}  onChangeText={TextInputText => this.setState(
          { jml_kamar: TextInputText }
        )} />
        <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.submitAllData}>
            {this.state.ActivityIndicator_Loading ? <ActivityIndicator color="#fff" size="large" style={styles.ActivityIndicatorStyle} /> : <Text
                style={styles.TextClass}
              >
                Tambah Kos
              </Text>}
          </TouchableOpacity>
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
    width: 120,
    height: 120,
    borderColor: "#2196F3",
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default DaftarKos;
