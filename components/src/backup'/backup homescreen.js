//import libraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Slider, ActivityIndicator } from "react-native";
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
  Button,
  Input, 
  Radio,
  ListItem
} from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

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
          marginTop: 1,
          paddingTop: 13
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>Rumah Kos</Text>
      </View>
    );
  }
}

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      kota: "",
      hargaMin: 100,
      hargaMaks: 100,
      ActivityIndicator_Loading: false
    };
  }
  getVal(val) {
    //console.warn(val);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(index, value) {
    this.setState({
      text: `Anda memilih ${value}`
    });
  }
  
  cariKost() {
     this.props.navigation.navigate("List");
  }
  render() {
    return <Container style={styles.container}>
        <View style={styles.BoxClass}>
          <Text style={{ fontSize: 20 }}>Pencarian</Text>
          <TextInput style={styles.TextInputStyleClass} placeholder="Masukkan nama kota" underlineColorAndroid="transparent" onChangeText={TextInputText => this.setState(
                { kota: TextInputText }
              )} ref={input => {
              this.kota = input;
            }} />
          <Text style={{ fontSize: 20 }}>Kisaran harga</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Input style={styles.HargaClass} placeholder="0-500" keyboardType="numeric" underlineColorAndroid="transparent" onChangeText={TextInputText => this.setState(
                  { hargaMin: TextInputText }
                )} ref={input => {
                this.hargaMin = input;
              }} />
            <Input style={styles.HargaClass} placeholder="0-500" keyboardType="numeric" underlineColorAndroid="transparent" onChangeText={TextInputText => this.setState(
                  { hargaMaks: TextInputText }
                )} ref={input => {
                this.hargaMaks = input;
              }} />
              
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.HargaClass}>
              Rp. {this.state.hargaMin}.000/bulan
            </Text>
            <Text style={styles.HargaClass}>
             Rp. {this.state.hargaMaks}.000/bulan
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Slider style={{ width: 100 }} step={1} minimumValue={100} maximumValue={500} value={this.state.hargaMin} onValueChange={val => this.setState(
                  { hargaMin: val }
                )} onSlidingComplete={val => this.getVal(val)} />
            <Text>{this.state.hargaMin}</Text>
            <Slider style={{ width: 100 }} step={1} minimumValue={100} maximumValue={500} value={this.state.hargaMaks} onValueChange={val2 => this.setState(
                  { hargaMaks: val2 }
                )} onSlidingComplete={val2 => this.getVal(val2)} />
            <Text>{this.state.hargaMaks}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>Tipe</Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <RadioGroup style={{ flexDirection: "row" }} onSelect={(index, value) => this.onSelect(index, value)}>
              <RadioButton value={"Cewek"}>
                <Text>Cewek</Text>
              </RadioButton>
              <RadioButton value={"Campuran"}>
                <Text>Campuran</Text>
              </RadioButton>
            </RadioGroup>
            <Text>{this.state.text}</Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={() => this.cariKost()}>
              <Text style={styles.TextClass}>Cari</Text>
            </Button>
            {this.state.ActivityIndicator_Loading ? <ActivityIndicator color="#2196F3" size="large" style={styles.ActivityIndicatorStyle} /> : null}
          </View>
        </View>
      </Container>;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center"
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
    justifyContent: "center",
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
