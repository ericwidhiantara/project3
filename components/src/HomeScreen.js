//import libraries
import React, { Component } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Slider, 
  ActivityIndicator,
  StatusBar,
  Platform,
  Alert
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
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

// create a component
class LogoTitle extends React.Component {
  render() {
    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "#2196F3", justifyContent: "center", height: 60, width: "100%", marginTop: Platform.OS == "ios" ? 20 : 0 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#2196F3" translucent={true} networkActivityIndicatorVisible={true} />
        <Text style={{ color: "white", fontSize: 24 }}>Rumah Kos</Text>
      </View>;
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      kota: "",
      hargaMin: 100,
      hargaMaks: 100,
      type: "",
      data: [],
      ActivityIndicator_Loading: false
    };
  }
  getVal(val) {
    //console.warn(val);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(index, value) {
    this.setState({
      type: value
    });
  }
  cariKos = () => {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch(
        "https://nukeninkonoha.000webhostapp.com/uas/cariKos.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            kota: this.state.kota,
            hargaMin: this.state.hargaMin,
            hargaMaks: this.state.hargaMaks,
            type: this.state.type
          })
        }
      )
        .then(response => response.json())
        .then(responseJsonFromServer => {
          this.setState({
            data: responseJsonFromServer,
            ActivityIndicator_Loading: false
          });
          if (responseJsonFromServer === null) {
            Alert.alert("Gagal!","Data tidak ditemukan!");
            console.log(responseJsonFromServer);
          } else {
            console.log("Data didapat", responseJsonFromServer);
            this.props.navigation.navigate("List",{
              kota : this.state.kota,
              hargaMin: this.state.hargaMin,
              hargaMaks: this.state.hargaMaks,
              type: this.state.type,
            });
          }
        })
        .catch(error => {
          console.error(error);

          this.setState({ ActivityIndicator_Loading: false });
        });
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.BoxClass}>
          <Text style={{ fontSize: 20 }}>Pencarian</Text>
          <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Masukkan nama kota"
            underlineColorAndroid="transparent"
            onChangeText={TextInputText =>
              this.setState({ kota: TextInputText })
            }
            ref={input => {
              this.kota = input;
            }}
          />
          <Text style={{ fontSize: 20 }}>Kisaran harga</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Text style={styles.HargaClass}>
              Rp. {this.state.hargaMin}.000/bulan
            </Text>
            <Text
              style={{
                textAlign: "center",
                alignItems: "center",
                padding: 10,
                height: 40,
                marginBottom: 10
              }}
            >
              -
            </Text>
            <Text style={styles.HargaClass}>
              Rp. {this.state.hargaMaks}.000/bulan
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Slider
              style={{ width: 100 }}
              step={1}
              minimumValue={100}
              maximumValue={999}
              value={this.state.hargaMin}
              onValueChange={val => this.setState({ hargaMin: val })}
              onSlidingComplete={val => this.getVal(val)}
            />
            <Text>{this.state.hargaMin}</Text>
            <Slider
              style={{ width: 100 }}
              step={1}
              minimumValue={100}
              maximumValue={999}
              value={this.state.hargaMaks}
              onValueChange={val2 => this.setState({ hargaMaks: val2 })}
              onSlidingComplete={val2 => this.getVal(val2)}
            />
            <Text>{this.state.hargaMaks}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>Tipe</Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <RadioGroup
              style={{ flexDirection: "row" }}
              onSelect={(index, value) => this.onSelect(index, value)}
            >
              <RadioButton value={"putri"}>
                <Text>Putri</Text>
              </RadioButton>
              <RadioButton value={"campuran"}>
                <Text>Campuran</Text>
              </RadioButton>
            </RadioGroup>
            <Text>{this.state.text}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.cariKos.bind(
            this, this.state.kota,
            this.state.hargaMin,
            this.state.hargaMaks,
            this.state.type,
          )}>
              {this.state.ActivityIndicator_Loading ? <ActivityIndicator color="#fff" size="large" style={styles.ActivityIndicatorStyle} /> : <Text
                style={styles.TextClass}
              >
                Cari Kos
              </Text>}
            </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0
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
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
    height: 40,
    marginBottom: 10,
    width: "45%"
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
  BoxClass: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    height: 40,
    borderRadius: 7,
    marginBottom: 10,
    width: "95%"
  }
});

//make this component available to the app
export default HomeScreen;
