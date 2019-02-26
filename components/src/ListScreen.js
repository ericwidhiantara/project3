//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
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
  CardItem,
  Button
} from "native-base";

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
        <Text style={{ color: "white", fontSize: 24 }}>List</Text>
      </View>
    );
  }
}

class ListScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      kota: "",
      hargaMin: "",
      hargaMaks: "",
      type: "",
      data: [],
      error: null
    };
  }
  componentDidMount() {
    this.setState(
      {
        ActivityIndicator_Loading: true,
        kota: this.props.navigation.state.params.kota,
        hargaMin: this.props.navigation.state.params.hargaMin,
        hargaMaks: this.props.navigation.state.params.hargaMaks,
        type: this.props.navigation.state.params.type
      },
      () => {
        fetch("https://nukeninkonoha.000webhostapp.com/uas/cariKos.php", {
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
        })
          .then(response => response.json())
          .then(responseJson => {
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
  DetailKos = (kota, id_user, id_kos) => {
    this.props.navigation.navigate("Detail", {
      kota: kota,
      id_user: id_user,
      id_kos: id_kos,
    });
  };

  render() {
    return <Container>
        <Content>
          <List dataArray={this.state.data} renderRow={item => <ListItem onPress={this.DetailKos.bind(this, item.kota, item.id_user, item.id_kos)}>
                <Thumbnail square size={80} source={{ uri: item.image }} />
                <Body>
                  <Text>{item.nama_kos}</Text>
                  <Text note>{item.alamat}</Text>
                  <Text note>Rp. {item.harga}.000/bulan</Text>
                  <Text note>Kost {item.type}</Text>
                </Body>
              </ListItem>} />
              
        </Content>
      </Container>;
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default ListScreen;
