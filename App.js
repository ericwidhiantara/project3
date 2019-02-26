import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { Actions,Router,Stack,Scene } from 'react-native-router-flux';
import Route from './components/Route';
import Splash from './Splash';
 
 
class App extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar>
                
                <Scene key="Splash" component={Splash} hideNavBar titleStyle={styles.title} navigationBarStyle={styles.navBar} />
                  <Scene key="Route" component={Route} hideNavBar titleStyle={styles.title} navigationBarStyle={styles.navBar} />
 
                </Stack>
 
               
             </Router>   
        );
    }
}
 
   
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
   
    navBar: {
      backgroundColor: 'rgb(75,102,234)',
      justifyContent: 'center',
      flexDirection: 'row',
       
    },
    title: {
      color: 'white',
      fontWeight: '300',
      justifyContent: 'center',
      alignItems: 'center',
    }
   
  });
 
 
export default App;