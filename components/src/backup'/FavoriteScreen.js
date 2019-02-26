//import liraries
import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Button
} from "native-base";

// create a component
class LogoTitle extends React.Component {
  render() {
    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "#2196F3", justifyContent: "center", height: 60, width: "100%", marginTop: Platform.OS == "ios" ? 20 : 0 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#2196F3" translucent={true} networkActivityIndicatorVisible={true} />
        <Text style={{ color: "white", fontSize: 24 }}>Favorite</Text>
      </View>;
  }
}

class FavoriteScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  render() {
    return <Container>
        <Content>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate("Save")}>
              <Thumbnail square size={80} source={require("./img/user.png")} />
              <Body>
                <Text>Tes1</Text>
                <Text note>Alamat</Text>
                <Text note>No HP</Text>
                <Text note>Fasilitas</Text>
              </Body>
            </ListItem>
            
          <ListItem onPress={() => this.props.navigation.navigate("Save2")}>
              <Thumbnail square size={80} source={require("./img/user.png")} />
              <Body>
                <Text>Tes2</Text>
                <Text note>Alamat</Text>
                <Text note>No HP</Text>
                <Text note>Fasilitas</Text>
              </Body>
            </ListItem>
          <ListItem onPress={() => this.props.navigation.navigate("Save")}>
            <Thumbnail square size={80} source={require("./img/user.png")} />
            <Body>
              <Text>Tes1</Text>
              <Text note>Alamat</Text>
              <Text note>No HP</Text>
              <Text note>Fasilitas</Text>
            </Body>
          </ListItem>
          </List>
        </Content>
        
      </Container>;
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
export default FavoriteScreen;
