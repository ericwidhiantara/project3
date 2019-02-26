//import liraries
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar, Platform } from "react-native";
import MapView from "react-native-maps";
import {
  Switch,
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Title,
  DeckSwiper,
  Card,
  CardItem
} from "native-base";

// create a component
class LogoTitle extends React.Component {
  render() {
    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "#2196F3", justifyContent: "center", height: 60, width: "100%", marginTop: Platform.OS == "ios" ? 20 : 0 }}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#2196F3" translucent={true} networkActivityIndicatorVisible={true} />
      <Text style={{ color: "white", fontSize: 24 }}>Detail</Text>
    </View>;
  }
}

class DetailScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      kota: "",
      id_kos: "",
      id_user: "",
      data: [],
      error: null
    };
  }
  componentDidMount() {
    this.setState(
      {
        ActivityIndicator_Loading: true,
        id_kos: this.props.navigation.state.params.id_kos,
        id_user: this.props.navigation.state.params.id_user
      },
      () => {
        fetch("https://nukeninkonoha.000webhostapp.com/uas/detailKos.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id_kos: this.state.id_kos,
            id_user: this.state.id_user
          })
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log("Data didapat", responseJson);
            this.setState({
              data: responseJson,
              error: responseJson.error || null,
              loading: false,
              refreshing: false,
              ActivityIndicator_Loading: false
            });
          })
          .catch(error => {
            console.error(error);
            this.setState({ ActivityIndicator_Loading: false });
          });
      }
    );
  }
  _keyExtractor = (item, index) => index;
  lokasi = (lat, long, nama_kos, alamat ) => {
    this.props.navigation.navigate("Map", {
      lat: lat,
      long: long,
      nama_kos: nama_kos,
      alamat: alamat
    });
  };
  render() {
    return (
      <Container>
        <Content padder>
          <List
            dataArray={this.state.data}
            renderRow={item => (
              <ListItem>
                <Card>
                  <CardItem header bordered>
                    <Text>Detail Kos</Text>
                  </CardItem>
                  <CardItem cardBody />
                  <CardItem>
                    <Body>
                      <Text>{item.nama_kos}</Text>
                      <Text>{item.alamat}</Text>
                    </Body>
                    <Right>
                      <Text>Rp. {item.harga}.000/bulan</Text>
                    </Right>
                  </CardItem>
                </Card>
              </ListItem>
            )}
          />
          <List
            dataArray={this.state.data}
            renderRow={item => (
              <ListItem>
                <Card>
                  <CardItem header bordered>
                    <Text>Informasi</Text>
                  </CardItem>
                  <CardItem header bordered>
                    <Body>
                      <Text>Pemilik</Text>
                    </Body>
                    <Right>
                      <Text>{item.nama}</Text>
                    </Right>
                  </CardItem>
                  <CardItem header bordered>
                    <Body>
                      <Text>Nomor Ponsel</Text>
                    </Body>
                    <Right>
                      <Text>{item.nohp}</Text>
                    </Right>
                  </CardItem>
                  <CardItem header bordered>
                    <Body>
                      <Text>Type</Text>
                    </Body>
                    <Right>
                      <Text>{item.type}</Text>
                    </Right>
                  </CardItem>
                  <CardItem header bordered>
                    <Body>
                      <Text>Ukuran Kamar</Text>
                    </Body>
                    <Right>
                      <Text>{item.luas_kamar}</Text>
                    </Right>
                  </CardItem>
                  <CardItem header bordered>
                    <Body>
                      <Text>Jumlah Kamar</Text>
                    </Body>
                    <Right>
                      <Text>{item.jml_kamar} kamar</Text>
                    </Right>
                  </CardItem>
                </Card>
              </ListItem>
            )}
          />
          <List
            dataArray={this.state.data}
            renderRow={item => (
              <ListItem>
                <Card>
                  <CardItem header bordered>
                    <Text>Fasilitas</Text>
                  </CardItem>
                  <CardItem header bordered>
                    <Body>
                      <Text>{item.fasilitas}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </ListItem>
            )}
          />
          <List
            dataArray={this.state.data}
            renderRow={item => (
              <ListItem>
                <Card>
                  <CardItem header bordered>
                    <Text>Lokasi</Text>
                  </CardItem>
                  <CardItem header bordered>
                    <Body>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.lokasi.bind(this, item.lat, item.lng, item.nama_kos, item.alamat )}
                      >
                        <Text>Lokasi</Text>
                      </TouchableOpacity>
                    </Body>
                  </CardItem>
                </Card>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default DetailScreen;
