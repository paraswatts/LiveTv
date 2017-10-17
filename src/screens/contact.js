/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Linking
} from 'react-native';
var { height, width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class Contact extends Component {
  static navigationOptions = ({ navigation }) => ({

    headerLeft: (<TouchableOpacity onPress={() => navigation.navigate('LoginPage')}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });


  componentDidMount() {

    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton = () => {
    const { navigate } = this.props.navigation;

    navigate('LoginPage')
    return true;
  }
  componentWillMount() {
    const { navigate } = this.props.navigation;

    this.image = (

      <View
        style={{                               
          height: height,
          backgroundColor:'rgba(33,37,101,1)',
          width: width,
          alignItems: "center"
        }}>

        <Text style={styles.welcome}>DONATE:</Text>
        <Text style={styles.text}>Acc Name: Parmeshar Dwar Charitable Trust</Text>
        <Text style={styles.text}>Bank Name: HDFC Bank Ltd.</Text>
        <Text style={styles.text}>Ac No:15831450000120</Text>
        <Text style={styles.text}>IFSC:HDFC0001583</Text>
        <Text style={styles.text}>Swift Code:HDFCINBBXXX</Text>
        <Text style={styles.text}>Bank Adress:SCO 43-44, DLF Coloney,Sirhind Road,Patiala (INDIA)</Text>
        <Text style={styles.text}>Contact: 98726-00107, 98727-17019</Text>
        <Text style={styles.welcome}>RECEIVE UPDATES ON WHATSAPP :</Text>
        <TouchableOpacity onPress={() => {
                var email = "whatsapp://app/9369000003";                                              
                console.log(email);                                   
                Linking.canOpenURL("whatsapp://send?phone=+919369000003").then(supported => {
                  if (supported) {                                                                      
                    Linking.openURL("whatsapp://send?phone=+919369000003");                               
                  } else {                                                                 
                    console.log('Don\'t know how to open URI: ' + this.props.url);
                    
                  }
                });
              }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../images/whatsapp.png')} />
          <Text style={styles.text}>93690-00003</Text>
        </View>
        </TouchableOpacity>
        <View style={{ height: 2, backgroundColor: '#000', margin: 10 }} />
        <View style={{ flexDirection: 'row' }}>

          <Image style={{ width: 32, height: 32, marginLeft: 10 }} source={require('../images/phone-call.png')} />
          <Text style={styles.text}>EMM PEE CASSETTES</Text>
        </View>
        <Text style={styles.text}>0175-2306224, 94643-92361, 93162-02346</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {
            console.log("Clicked On Whatsapp");

            Linking.canOpenURL('fb://page/318363321543421').then(supported => {
              if (supported) {
                Linking.openURL('fb://page/318363321543421');               w
              } else {
                Linking.openURL('https://www.facebook.com/n/?parmeshardwar');
                console.log('Don\'t know how to open URI: ' + this.props.url);
              }
            });
          }
          }>
            <Image style={{ width: 48, height: 48 }} source={require('../images/fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log("Clicked On Whatsapp");
            Linking.canOpenURL('http://instagram.com/_u/dhadrian.wale/').then(supported => {
              if (supported) {
                Linking.openURL('http://instagram.com/_u/dhadrian.wale/');
              } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
              }
            });
          }}>
            <Image style={{ width: 48, height: 48, marginLeft: 30 }} source={require('../images/insta.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log("Clicked On Whatsapp");
            Linking.canOpenURL('http://twitter.com/parmeshar_tv/').then(supported => {
              if (supported) {
                Linking.openURL('http://twitter.com/parmeshar_tv/');
              } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
              }
            });
          }}>
            <Image style={{ width: 48, height: 48, marginLeft: 30 }} source={require('../images/tweet.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log("Clicked On Whatsapp");
            Linking.canOpenURL("mailto:?to=emm.pee.ldh@gmail.com").then(supported => {
              if (supported) {
                Linking.openURL("mailto:?to=emm.pee.ldh@gmail.com");
              } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
              }
            });
          }}>
            <Image style={{ width: 48, height: 48, marginLeft: 30 }} source={require('../images/email.png')} />
          </TouchableOpacity>

        </View>


      </View>



    );
  }

  render() {
    return (
      <View>
        {this.image}
      </View>
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
    fontWeight: 'bold',
    margin: 10,
    color: '#fff'

  },
  text: {
    marginRight: 5,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    color: "#fff"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
