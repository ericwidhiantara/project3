//import liraries
import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Platform, FlatList, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Button,
  Footer
} from "native-base";

// create a component
class LogoTitle extends React.Component {
  render() {
    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "#2196F3", justifyContent: "center", height: 60, width: "100%", marginTop: Platform.OS == "ios" ? 20 : 0 }}>
      <StatusBar barStyle="light-content" hidden={false} backgroundColor="#2196F3" translucent={true} networkActivityIndicatorVisible={true} />
      <Text style={{ color: "white", fontSize: 24 }}>My Account</Text>
    </View>;
  }
}

class DetailAccount extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      data: [],
      error: null
    };
  }
  componentDidMount() {
    this.setState(
      {
        ActivityIndicator_Loading: true,
        email: this.props.navigation.state.params.email
      },
      () => {
        fetch("https://nukeninkonoha.000webhostapp.com/uas/getData.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.email
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
  MyKost = (email, id_user) => {
    this.props.navigation.navigate("AddLoc", {
      email: email,
      id_user: id_user
    });
  };
  MyAccount = (email, nama, password, nohp, image, id_user) => {
    this.props.navigation.navigate("MyAccount", {
      email: email,
      id_user: id_user,
      nama: nama,
      password: password,
      nohp: nohp,
      image: image
    });
  };
  render() {
    return <Container>
        <Content>
        <List dataArray={this.state.data} renderRow={item => <ListItem onPress={this.MyAccount.bind(this, item.email, item.nama, item.password, item.nohp, item.image, item.image)}>
                <Thumbnail square size={80} source={{ uri: item.image }} />
                <Body>
                  <Text>{item.nama}</Text>
                  <Text note>{item.email}</Text>
                </Body>
              </ListItem>} />
          <List dataArray={this.state.data} renderRow={item => <ListItem onPress={this.MyKost.bind(this, item.email, item.id_user)}>
                <Body>
                  <Text>My Kos</Text>
                </Body>
              </ListItem>} />
        </Content>
        <List>
          <ListItem onPress={() => Alert.alert(
                "Keluar",
                "Yakin Ingin Keluar ?",
                [
                  {
                    text: "Batal",
                    onPress: () => console.log("Cancel ditekan"),
                    style: "cancel"
                  },
                  {
                    text: "OK",
                    onPress: () =>
                      this.props.navigation.navigate('Account')
                  }
                ],
                { cancelable: true }
              )}>
            <Body>
              <Text>Keluar</Text>
            </Body>
          </ListItem>
        </List>
      </Container>;
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
    fontSize: 20
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
export default DetailAccount;
