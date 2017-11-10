import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  BackHandler,
  ScrollView
} from 'react-native';
import AndroidBackButton from "react-native-android-back-button"

var { height, width } = Dimensions.get('window');
import SplashScreen from 'react-native-smart-splash-screen'
import Orientation from 'react-native-orientation-locker';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
  'u'
});



// screen related book keeping

import Swiper from 'react-native-swiper';

export default class Login extends Component {

  componentDidMount() {
    console.log(this.props.navigation.state.routeName);
    SplashScreen.close({ animationType: SplashScreen.animationType.fade, duration: 2000, delay: 500 })
    if (Platform.OS == "android") {
    
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    Orientation.lockToPortrait(); //this will lock the view to Portrait

  }

  componentWillUnmount() {
    //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}                                       

  handleBackButton = () => {
    var route = this.props.navigation.state.routeName;
    console.log("Current route"+route)              
    if (route == 'LoginPage') {
      Alert.alert(
        'Exit App',
        'Want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'ok', onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      // return true to stop bubbling
      return true
  }
}

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    var id;
    if (params) {
      id = params.index;
    }
    else
      id = 0
    return (
      <Swiper index={id} loop={false} showsButtons={false}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/-bHyvuO7S2D0/WeWEb_Q0_wI/AAAAAAAAAAc/KKprxCXMoAYJZTyfSlO2wl5hyEvvz7qdwCK8BGAs/s512/backroundapp.jpg'
          }}
          style={{
            alignItems: "center",
            justifyContent: 'center',
            resizeMode: "stretch",
            height: height - 20,
            width: width
          }}>
          <StatusBar backgroundColor="rgba(32,36,100,1)" barStyle="light-content" />
          <View style={styles.outerView}>
            <Image
              style={{
                height: 125,
                width: 125
              }}
              source={require('../images/logo.png')} />
            <View
              style={{
                alignItems: 'center',
                marginTop: 70,
                flexDirection: 'row'
              }}>
              <View style={styles.column}>
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    navigate("LiveTV")
                  }}>
                  <Image
                    source={require('../images/live.png')}
                    style={{
                      resizeMode: "stretch",
                      height: 250,
                      width: 250
                    }} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 20,
                    color: "#FFF"
                  }}>Live TV</Text>

              </View>
            </View>
          </View>
          {/* <AndroidBackButton
            onPress={this.handleBackButton}
          /> */}
        </Image>

        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/-bHyvuO7S2D0/WeWEb_Q0_wI/AAAAAAAAAAc/KKprxCXMoAYJZTyfSlO2wl5hyEvvz7qdwCK8BGAs/s512/backroundapp.jpg'
          }}
          style={{
            alignItems: "center",
            justifyContent: 'center',
            resizeMode: "stretch",
            height: height - 20,
            width: width
          }}>                                                                     
          {/* <AndroidBackButton
            onPress={this.handleBackButton}
          /> */}
          <StatusBar backgroundColor="rgba(32,36,100,1)" barStyle="light-content" />
          <View style={styles.outerView}>
            <Image
              style={{
                height: 125,
                width: 125
              }}
              source={require('../images/logo.png')} />
            <View
              style={{
                alignItems: 'center',
                marginTop: 30,
                flexDirection: 'row'
              }}>
              <View
                style={styles.column}
              >
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    navigate("AudioPage")
                  }}>
                  <Image
                    source={require('../images/icon.png')}
                    style={{
                      resizeMode: "stretch",
                      height: 55,
                      width: 55
                    }} /></TouchableOpacity>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 20,
                    color: "#FFF",
                    textAlign: 'center'
                  }}>Audio</Text>

                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    navigate("FacebookPage")
                  }}>
                  <Image
                    source={require('../images/facebook-logo.png')}
                    style={{
                      marginTop: 20,
                      resizeMode: "stretch",
                      height: 55,
                      width: 55
                    }} /></TouchableOpacity>

                <Text
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 20,
                    color: "#FFF"
                  }}>Facebook</Text>
              </View>
              <View
                style={styles.column}
                style={{
                  marginLeft: 100
                }}>
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    navigate("YoutubePlaylist")
                  }}>
                  <Image
                    source={require('../images/youtube.png')}
                    style={{
                      alignSelf: 'center',

                      marginTop: 10,
                      resizeMode: "stretch",
                      height: 55,
                      width: 55
                    }} />
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: "#FFF"
                  }}>Video</Text>
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    navigate("Gallery")
                  }}>
                  <Image
                    source={require('../images/gallery.png')}
                    style={{
                      alignSelf: 'center',
                      marginTop: 20,
                      resizeMode: "stretch",
                      height: 55,
                      width: 55
                    }} /></TouchableOpacity>
                <Text
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    fontSize: 20,
                    color: "#FFF"
                  }}>Pictures</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20
              }}>
              <View
                style={styles.column}
                style={{
                }}>
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    navigate("ContactPage")
                  }}>
                  <Image
                    source={require('../images/contact.png')}
                    style={{
                      resizeMode: "stretch",
                      height: 55,
                      alignSelf: 'center',
                      width: 55
                    }} /></TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    textAlign: 'center',
                    color: "#FFF"
                  }}>Contact</Text>
              </View>                                                               
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center',alignSelf:'center', justifyContent: 'space-around', marginTop: 40 }}>
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
                <Image style={{ width: 40, height: 40}} source={require('../images/insta.png')} />
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
                <Image style={{ width: 40, height: 40,marginLeft:30,marginRight:30 }} source={require('../images/tweet.png')} />
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
                <Image style={{ width: 40, height: 40 }} source={require('../images/email.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </Swiper>

    );
  }
}

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  outerView: {
    alignItems: "center",
    marginTop: -25,
    height: height - 75,
    width: width - 25,
    backgroundColor: 'rgba(32,36,100,0.5)',
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
