import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,NetInfo,
  Alert,TouchableOpacity,
  BackHandler,WebView        
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
var Spinner = require('react-native-spinkit');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
export default class AudioWeb extends Component{
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            isLoading: false,
            title: null,
            networkType:null
            
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('LoginPage', { index: 1 })}><Icon
                name='navigate-before'
                style={{
                    marginLeft: 10
                }}
                size={40}
                color={'white'} /></TouchableOpacity>
        )
    });

    componentWillMount() {
        Orientation.lockToPortrait(); //this will lock the view to Portrait
        NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange)        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange)
        
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _handleNetworkStateChange = (networkType) => {
        console.log("network type"+networkType.type);                               
        this.setState({networkType:networkType.type});
        if(networkType.type == 'none'){
          Toast.show('Oops no internet connection !', Toast.SHORT);                               
          console.log(networkType.type);
        }
        else{
          console.log("I am in else")
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleBackButton = () => {
        const { navigate } = this.props.navigation;
        navigate('LoginPage', { index: 1 })
        return true;
    }

    renderLoadingView() {
        return (
            <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: 'rgba(33,37,101,0.7)',
                    }}>
                    <Spinner
                        type='Wave' color='rgba(33,37,101,1)}' />
                </View>
        );
    }
    render() {
        return (
            <WebView
        source={{uri:'https://soundcloud.com/parmeshardwar/'}}
        startInLoadingState={true}
        renderLoading={this.renderLoadingView}
      />
        );
      }
    } 
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
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
      