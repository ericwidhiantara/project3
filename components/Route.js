import React, { Component } from 'react';
import { Alert, Button, Text, View, Image, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons'; 
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'; 

import HomeScreen from './src/HomeScreen'; 
//import FavoriteScreen from './src/FavoriteScreen';
import AccountScreen from './src/AccountScreen'; 
import DetailScreen from './src/DetailScreen';
import ListScreen from './src/ListScreen';
import DaftarScreen from './src/DaftarScreen';
import DetailAccount from './src/DetailAccount';
import MapScreen from './src/MapScreen'
import DaftarKos from './src/DaftarKos';
//import SaveScreen from './src/SaveScreen';
//import Save2 from "./src/Save2";
import MyAccountScreen from "./src/MyAccountScreen";
import AddLocation from './src/AddLocation';

export default class Route extends React.Component {
  render() {
    return (
      <MenuTab /> 
    );
  }
}
const DetailStack = StackNavigator({
  Detail: { screen: DetailScreen }
},
  {
    navigationOptions: {
      headerLeft: null
    }
  }
);
const HomeStack = StackNavigator(
  {
    Home: { screen: HomeScreen },
    List: { screen: ListScreen },
    Detail: { screen: DetailScreen },
    Map: { screen: MapScreen }
  },
  {
    navigationOptions: {
      headerLeft: null
    }
  }
);
/*const FavoriteStack = StackNavigator(
  {
    Favorite: { screen: FavoriteScreen },
    Save: { screen: SaveScreen },
    Save2: { screen: Save2 },
    AddLoc: { screen: AddLocation }
  },
  {
    navigationOptions: {
      headerLeft: null
    }
  }
);
*/
const AccountStack = StackNavigator(
  {
    Account: { screen: AccountScreen },
    Daftar: { screen: DaftarScreen },
    DetailAccount: { screen: DetailAccount },
    Kos: { screen: DaftarKos },
    MyAccount: { screen: MyAccountScreen },
    AddLoc: { screen: AddLocation }
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null
    }
  }
);


const MenuTab =  TabNavigator(
  {
    Home: { screen: HomeStack }, 
    Account: { screen: AccountStack }, 
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Account') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#2196F3',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

