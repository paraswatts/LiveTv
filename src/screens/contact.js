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
  Linking,
  ScrollView
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
    headerLeft: (<TouchableOpacity onPress={() => navigation.navigate('LoginPage', { index: 1 })}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton = () => {
    const { navigate } = this.props.navigation;
    navigate('LoginPage', { index: 1 })
    return true;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{ backgroundColor: 'rgba(33,37,101,0.7)', height: height }}>
        <View
          style={{
            borderRadius: 10,
            margin: 10,
            height: height - 100,
            backgroundColor: 'rgba(33,37,101,1)',
            width: width - 20,
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
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
              console.log("Clicked On number");
              Linking.canOpenURL("tel:+91175-2306224").then(supported => {
                if (supported) {
                  Linking.openURL("tel:+91175-2306224");
                } else {
                  console.log('Don\'t know how to open URI: ' + this.props.url);
                }
              });
            }}>
              <Text style={styles.text}>0175-2306224</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              console.log("Clicked On number");
              Linking.canOpenURL("tel:+919464392361").then(supported => {
                if (supported) {
                  Linking.openURL("tel:+919464392361");
                } else {
                  console.log('Don\'t know how to open URI: ' + this.props.url);
                }
              });
            }}>
              <Text style={styles.text}>94643-92361</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              console.log("Clicked On number");
              Linking.canOpenURL("tel:+919316202346").then(supported => {
                if (supported) {
                  Linking.openURL("tel:+919316202346");
                } else {
                  console.log('Don\'t know how to open URI: ' + this.props.url);
                }
              });
            }}>
              <Text style={styles.text}>93162-02346</Text>
            </TouchableOpacity>
          </View>

        </View>
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
    marginRight: 15,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 15,
    color: "#fff"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
