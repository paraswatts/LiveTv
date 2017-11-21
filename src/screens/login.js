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
  ScrollView,
  AppState,
  NetInfo
} from 'react-native';
import Share, { ShareSheet, Button } from 'react-native-share';

import Toast from 'react-native-simple-toast';
var { height, width } = Dimensions.get('window');
import SplashScreen from 'react-native-smart-splash-screen'
import Orientation from 'react-native-orientation-locker';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
    'u'
});
import Swiper from 'react-native-swiper';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    console.log("height" + height + "width" + width)

    NetInfo
      .isConnected
      .fetch()
      .then(isConnected => {
        if (isConnected) {
          SplashScreen.close({ animationType: SplashScreen.animationType.fade, duration: 2000, delay: 500 })
        } else {
          Toast.show('Oops no internet connection !', Toast.SHORT);
        }
      });
    AppState.addEventListener('change', this._handleAppStateChange);
    Orientation.lockToPortrait();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
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
    )
    return true
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    this.setState({ appState: nextAppState }, () => {
      console.log("App State" + this.state.appState);
    });
  }


  render() {
    let shareOptions = {
      title: "",
      message: "",
      url: 'https://play.google.com/store/apps/details?id=com.gurbanitv&hl=en',
      subject: "Share App" //  for email
    };
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
              source={{uri:'https://lh3.googleusercontent.com/--6IIAncUh9A/Wgvqqa7PrsI/AAAAAAAAAOs/scV-b4P_WVQxyF2f4prlHHxeGLS1qod5ACK8BGAs/s298/2017-11-14.png'}} />
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
                    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    navigate("LiveTV")
                  }}>
                  <Image
                    source={{uri:'data:image/png;base64,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'}}
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
            

            <View style={{ marginTop:35,flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={styles.column}
              >
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    Linking.canOpenURL('https://play.google.com/store/apps/details?id=com.gurbanitv&hl=en').then(supported => {
                      if (supported) {
                        Linking.openURL('https://play.google.com/store/apps/details?id=com.gurbanitv&hl=en');
                      } else {
                        console.log('Don\'t know how to open URI: ' + this.props.url);
                      }
                    });
                  }}>                     
                  <Image
                    source={{uri:'data:image/png;base64,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'}}
                    style={{
                      resizeMode: "stretch",
                      height: 45,
                      width: 45
                    }} /></TouchableOpacity>
                <Text
                  style={{
                    color: "#FFF",
                    textAlign: 'center'
                  }}>Rate Us</Text>
                
              </View>
              <View
                style={{alignItems: 'center',
                flexDirection: 'column',marginLeft:(width/2)+50}}
              >
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    Share.open(shareOptions)
                  }}>                     
                  <Image
                    source={{uri:'data:image/png;base64,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'}}
                    style={{
                      resizeMode: "stretch",
                      height: 45,
                      width: 45
                    }} /></TouchableOpacity>
                <Text
                  style={{
                    color: "#FFF",
                    textAlign: 'center'
                  }}>Share App</Text>
             
              </View>
            </View>

          </View>
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
          <StatusBar backgroundColor="rgba(32,36,100,1)" barStyle="light-content" />
          <View style={styles.outerView}>
            <Image
              style={{
                height: 125,
                width: 125
              }}
              source={{uri:'https://lh3.googleusercontent.com/--6IIAncUh9A/Wgvqqa7PrsI/AAAAAAAAAOs/scV-b4P_WVQxyF2f4prlHHxeGLS1qod5ACK8BGAs/s298/2017-11-14.png'}} />
            <View
              style={{                    
                justifyContent: 'center',
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
                    navigate("AudioList")
                  }}>
                  <Image
                    source={{uri:'data:image/png;base64,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'}}
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
                    source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAQAAAD2e2DtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCgkJGCCQ0LayAAAHY0lEQVR42u3dTWgUdxzG8ec3DRShSAtpwWgPIRhp1CpIpDlIe1BIQ9QcipIeerWtFDy06iHQi4W+HHppwVvBHopgNYkvsZhDWygpSkAFQ43EhdbdgI20TSn2Jcm/hxjztrPZzc7sb5Pn+XhJNtnZ3zjf7Ex2ZzeGooQmtKIedViPOqxDTXHXkgqbwChyyCKHDC7bUDFXscJfDhFa0IH92Oi9blKyO+hBNwZsqtA3FQggGA7iBBq810PKMoIunLYQ9+XYAMJufIgd3tNLIgZx3PrzfylvAKEWp/Cq99SSqD68YWOLL84TQGjCBdR7zyuJy6B98YFhtPCC0IYBbf5VqR4DoW3hhQsCCIfQi7Xek0pK1qI3HJp/0bxdQGhDL57wnlJSNYl9dmn20zkBhCYM6KefwDhaZo8FHgcQanFV+34SGeyc+Y1g9hjglDY/jXqcmvnw0T1A2I0r3lNJRe2ZfmjIACAYrulRPzKDaLYwsws4qM1PZwcOAoABIcKwnvIhNIJGm4oAtGjzU2pAy/QuoMN7EnHSMb0LGNbpHqTuWKOFJtzynkPcbI7Q6j2DOGqN9PgftfoIdd4ziKO6COu9ZxBH63UPwK3Own96mUfFjCGLLEYxUdZSmrArsYkmarT5UzWK87iNLLLIImf/JLHI8GaCAdRo86flLs7iHAbiX5JRHRRA8m7iHM7aTe8xiqMAkhRwGu/bsPcYpVAAyfke79o17yFKFZW/CAHwE/bbyytv8yuAJNzHW9hqvd5jLI92AeU6iaP2p/cQy6cAyjGBd+yk9xDlUQDL9wCv2bfeQ5RLASzXEPbaXe8hyqeDwOW5iJdWw+ZXAMvzCfat5AO/ubQLKN1ndtR7hOToHqBUV3DEe4QkKYDSDOOATXoPkSQFUIrfsNd+9x4iWQqgeBM4sLKe6SuGAijekbg3W1zJFECxvrDPvUdIgwIozjiOeY+QDgVQnI/sV+8R0qEAinEPn3qPkBYFUIwue+g9QloUwNJu4EvvEdKjAJb2XuG/ubGyKYClfGOr+h0UFcBSPvYeIF0KoLAH+M57hHQpgMLOr67n/hZTAIWd9R4gbQqgkL9W/1toK4BC+uxv7xHSpgAKOec9QPoUQLx/cdF7hPQpgHg/2B/eI6RPAcTLeA9QCQogXs57gErQC0PipRZAWIPt2PLo33O+K6kA4qUSQFiDt3EMz3qv3AwFEC+FAMIL6Kmuv86gY4B4iQcQXsGP1bX5AQtV/kaGbqbwpJX3lq4LhAZcwzPeq7WQ7gHi3E9480f4uvo2vwKIl/Rp4AewzXuV8lEAcZI+D/C49wrlpwAqIjyFF71nyE8BVMaWmT/TXW0UQGVU6c+/AqiUrd4DxFEAlaEAyD3tPUAcBUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5lvcI+gD3SrzGWKK3fwK1iS1rF15PbjCWAM7Ydc+btzPJLSsgyQC0CyCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoAcy5tEbQqlXuOh3U7u5sMmrElsYRuSmwuwUPL/DIkbtj25hYXr2Oa9QvlpF0BOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUALkaTKDGe4iqtCGcTHJp3qsTY8LCz3jeewpx80uEnPcM4igXIes9gzjK6h6AWy5CxnsGcZSx0IRb3lOIm80GhGFs9J5DXNyxxghAj/cc4qRn+pHAbu85xEk3YECIMIwG71mk4kbQaFMRYFPo8p5FHHTZFGAAEAzXsMN7HqmoQTRbePRsoAUc955HKuy4BeDx08HWjz7viaSC+qx/+gObuSTU4irqveeSishgp41Nf/j4hBAbQzvGvSeTChhH+8zmn3dGkA2hE5Pe00nKJtFpQ7OfzjslzC7hsBJY1SZx2C7NvcAWfkdow1dY6z2npGIcnfM3f54AgNCECzocXIUyaJ975z8tz1nBNoSd+qVw1enDzsWbP+a0cBuzNuzBoPfMkpBB7LG22SP/uWJfF2D9aEYnRrxnlzKNoBPNMw/7LGaFrx0itKAD+3XKyAp0Bz3oxoBNFfomK25ZoQmtqEcd1qMO6/RSkio1gVHkkEUOGVzOt8df7H9AYiGGR/+DsAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMC0wOVQwOToyNDozMiswMjowMMK3mQUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTAtMDlUMDk6MjQ6MzIrMDI6MDCz6iG5AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=='}}
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
                style={styles.column1}
              >
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => {
                    navigate("VideoHome")
                  }}>
                  <Image
                    source={{uri:'data:image/png;base64,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'}}
                    style={{
                      resizeMode: "stretch",
                      height: 55,
                      width: 55
                    }} />
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: 10,
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
                    source={{uri:'data:image/png;base64,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'}}
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
                    source={{uri:'data:image/png;base64,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'}}
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
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-around', marginTop: 40 }}>
              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL('http://instagram.com/_u/dhadrian.wale/').then(supported => {
                  if (supported) {
                    Linking.openURL('http://instagram.com/_u/dhadrian.wale/');
                  } else {
                    Toast.show('No app installed to open this link', Toast.LONG);
                  }
                });
              }}>
                <Image style={{ width: 40, height: 40 }} 
                source={{uri:'data:image/png;base64,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'}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL('http://twitter.com/parmeshar_tv/').then(supported => {
                  if (supported) {
                    Linking.openURL('http://twitter.com/parmeshar_tv/');
                  } else {
                    Toast.show('No app installed to open this link', Toast.LONG);
                  }
                });
              }}>
                <Image style={{ width: 40, height: 40, marginLeft: 30, marginRight: 30 }} 
                source={{uri:'data:image/png;base64,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'}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                console.log("Clicked On Whatsapp");
                Linking.canOpenURL("mailto:?to=emm.pee.ldh@gmail.com").then(supported => {
                  if (supported) {
                    Linking.openURL("mailto:?to=emm.pee.ldh@gmail.com");
                  } else {
                    Toast.show('No app installed to open this link', Toast.LONG);
                  }
                });
              }}>                                 
                <Image style={{ width: 40, height: 40 }} 
                source={{uri:'data:image/png;base64,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'}} />
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
  column1: {
    marginLeft: 100,
    marginRight: 5,
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
