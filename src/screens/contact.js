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
          <Text style={styles.text}>Acc No:15831450000120</Text>
          <Text style={styles.text}>IFSC:HDFC0001583</Text>
          <Text style={styles.text}>Swift Code:HDFCINBBXXX</Text>
          <Text style={styles.text}>Bank Adress:SCO 43-44, DLF Coloney, Sirhind Road, Patiala (INDIA)</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Contact: </Text>
       
            <TouchableOpacity onPress={() => {
              console.log("Clicked On number");
              Linking.canOpenURL("tel:+919872600107").then(supported => {
                if (supported) {
                  Linking.openURL("tel:+919872600107");
                } else {
                  console.log('Don\'t know how to open URI: ' + this.props.url);
                }
              });
            }}>
              <Text style={styles.text}>98727-17019</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              console.log("Clicked On number");
              Linking.canOpenURL("tel:+919872717019").then(supported => {
                if (supported) {
                  Linking.openURL("tel:+919872717019");
                } else {
                  console.log('Don\'t know how to open URI: ' + this.props.url);
                }
              });
            }}>
              <Text style={styles.text}>93162-02346</Text>
            </TouchableOpacity>
          </View>
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
              <Image style={{ width: 32, height: 32, marginLeft: 10 }} 
              source={{uri:'https://lh3.googleusercontent.com/-wD_lRb4895I/WgvtAUQwreI/AAAAAAAAAPo/KoqiE3oIEfcyP79ASOHjAvZNhsdkptobQCK8BGAs/s64/2017-11-14.png'}} />
              <Text style={styles.text}>93690-00003</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 2, backgroundColor: '#000', margin: 10 }} />
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ width: 32, height: 32, marginLeft: 10 }} 
            source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCgoMOjVOwXl8AAADWklEQVRo3sWYT0hUQRzHZ7fNBMMOkXQJxTQ7pdXFQ1IghVBkC/5BT56kSHCVwOsehPDsqcL1Ih70IAQGnkowhMVIPCQk4iFJIzJKW1HbPh16Oztvd9198+Ztb46//X3n853f/HmzI8R/bUQZMu8kSAUNXHCFB+h1hw3RzChxNjkCIOISD0k69IQltDPBd+xN04DEAxzS4lQWoJsNcjUtAzY8wC7VTmTNvOO49tgADzBPML+onJks0TJRwjRSySlDPMBAPlEtq7bkJfqp0il6QTwkqDtOdMe25NZod4MugAeYzC3q5bdM2aGPk0XCwx5luUafxn/golu4AzxAV6aoVin+K87k6DZIDU10csUDPLy0i8qVpfeMExldlhJmnK/W7xEP8PDDLptRRm/DE6SHTzZpxAM8bKmyZmXubcXnKitZ0ogHePiYlgXkqbdjX3q08StDts9G1vJJZbdq4OFNWtgtg322Dp/wRxEsM8SlvLMfJKZhYDglK5GfnDV139Om4BMMFji/9S3cTonaZUg59biqFP9t/pG7snDA6ZRkwgot2bpJL72nTsaubWEslR6Sx0+/0kmPMnotvEMLSVlTZQNWyQ5K5b5POC9+hoWpvAam06mjVui9Ig/LxEE3eCG4zFZeA9fSqXErFFXk41ZsWb/8jvBzavKmFQwr5Uud+a7u8QXxcEudqyMr2ChjNTLRxfw7wC+q6RUyXCljTVZkvyh4uKcKGmRYXjXptCIbRcGn178ICSG+iX/306PAgYyvWrEvunjxWpwvkLQtHurX1bvRw11/8c/9xa/Lz48v+CQ3/MTDiL/4FUr8xO9T7yc+yQM/8fDIX/ywOc0EHzPBtOa+jmjgZwm5x0eBWLYFDXw8xwuAFp5sCxr4Nc6Z4zMsaOC3HT3FOcArFjTwP7nuHd6yoDV6j/EAUxpz72Hx9Vvcq6Xnrs16sfHct5jpsWPWTM58Y3zS6ItnjN83+t4b41eMbjuG+CQjRnc9Q/y66UU7KFz8/5XthagPLJgZEELQS9LF2Lc8/I9HB4ea+GnOeoYXQgha2HUMX7Q9L3hmoZp5B/A55W3HcwtBBkjk2W7TysNa0UzUMcleFvyAMXePlYVbIIeJMnFfdImbIiF2xWexIObFYmCvWEP+C1xGjgU2l2EyAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEwLTEwVDEyOjU4OjUzKzAyOjAwsbP1cwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMC0xMFQxMjo1ODo1MyswMjowMMDuTc8AAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC'}} />
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
