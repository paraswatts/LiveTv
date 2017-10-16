import React, { Component } from 'react';
import {Platform,StatusBar,StyleSheet,Text,View,Dimensions,Image} from 'react-native';
var { height, width } = Dimensions.get('window');

export default class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loginState: null,
          timePassed:false,
        };
      }
    
      componentDidMount() {
        let that = this; 
        setTimeout(function(){that.setState({timePassed: true})}, 6000);
        setTimeout (() => {
            const { navigate } = this.props.navigation;
            navigate('LoginPage')                       
        }, 2000);
    }              
    render() {
        return (
            <View style={styles.container}>
            <StatusBar
backgroundColor="#000"
barStyle="light-content"
/>
            <Image source={require('../images/splash.jpg')} style={{marginBottom:100,marginTop:100,resizeMode:"center",height:height,width:width}}/>
            </View>
        );}            
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  