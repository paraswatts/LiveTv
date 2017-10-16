import React, { Component } from 'react';
import { Platform,
   StatusBar,
    StyleSheet,
     Text,
      View,
       Image,
        Dimensions,
         TouchableOpacity,
          Alert,
           BackHandler,
           ScrollView
           } from 'react-native';
var { height, width } = Dimensions.get('window');
import SplashScreen from 'react-native-smart-splash-screen'
import Orientation from 'react-native-orientation-locker';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
  'u'
});

export default class Login extends Component {

  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.fade,
      duration: 2000,
      delay: 500,
    })
    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
     Orientation.lockToPortrait(); //this will lock the view to Portrait

  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Yes',
        onPress: () => BackHandler.exitApp()
      },], {
        cancelable: false
      }
    )
    return true;
  }


  render() {
    const { navigate } = this.props.navigation;

    return (



      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/-1mLJIRlQi1A/Wd73x4-WrcI/AAAAAAAAAJQ/l8r2sj9JsnQpUdqGfb7OjqqWx8DFMkE7wCK8BGAs/s512/Background.jpg' }}
        style={{
          alignItems: "center",
          justifyContent: 'center',
          resizeMode: "stretch",
          height: height,
          width: width,
        }} >
        <StatusBar
          backgroundColor="#4e0870"
          barStyle="light-content"
        />
        <View style={styles.outerView}>

          <Image style={{ height: 125, width: 125 }} source={require('../images/guru_logo.png')} />
          <View style={{
            alignItems: 'center',
            marginTop: 30,
            flexDirection: 'row'
          }}>
            <View style={styles.column}>
              <TouchableOpacity activeOpacity={.5} onPress={() => {
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                navigate("LiveTV")
              }
              }
              >
                <Image
                  source={require('../images/live.png')}
                  style={{
                    resizeMode: "stretch",
                    height: 75,
                    width: 75
                  }} />
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 20,
                  color: "#FFF"
                }}>Live Tv</Text>

            </View>
            <View
              style={styles.column}
              style={{ marginLeft: 100 }}>
              <TouchableOpacity activeOpacity={.5} onPress={() => {
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                navigate("VideoPage")
              }}>

                <Image
                  source={require('../images/youtube.png')}
                  style={{
                    marginTop: 10,
                    resizeMode: "stretch",

                    height: 75,
                    width: 75
                  }} />
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: "#FFF",

                }}>Video</Text>
            </View>
          </View>
          <View
            style={{

              flexDirection: 'row',
              marginTop: 20
            }}>
            <View style={styles.column}>
              <TouchableOpacity activeOpacity={.5} onPress={() => {
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                navigate("FacebookPage")
              }}>
                <Image
                  source={require('../images/facebook-logo.png')}
                  style={{
                    resizeMode: "stretch",
                    height: 75,
                    width: 75
                  }} /></TouchableOpacity>

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 20,
                  color: "#FFF"
                }}>Facebook</Text>

            </View>
            <View style={styles.column} style={{ marginLeft: 100 }}>

              <TouchableOpacity activeOpacity={.5} onPress={() => {
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                navigate("AudioPage")
              }}>
                <Image
                  source={require('../images/icon.png')}
                  style={{
                    resizeMode: "stretch",

                    height: 75,
                    width: 75
                  }} /></TouchableOpacity>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  color: "#FFF",
                  textAlign: 'center'
                }}>Audio</Text>
            </View>


          </View>

          <TouchableOpacity activeOpacity={.5} onPress={() => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
            navigate("ContactPage")
          }}>
            <Image
              source={require('../images/contact.png')}
              style={{


                marginTop: 20,
                resizeMode: "stretch",
                height: 75,
                width: 75
              }} /></TouchableOpacity>
          <Text style={{
            fontSize: 20,
            marginTop: 10,
            color: "#FFF"
          }}>Contact Us</Text>

        </View>

      </Image>


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
    justifyContent: 'center',
    marginTop: -25,
    height: height - 75,
    width: width - 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
