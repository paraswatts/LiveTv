import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  Platform,
  NetInfo,
  ToastAndroid
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

import { YouTube,YouTubeStandaloneAndroid } from 'react-native-youtube';

var { height, width } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class LiveTV extends Component {
  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    
    headerLeft: (<TouchableOpacity onPress={() => {

      navigation.navigate('LoginPage')
    }}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  constructor(props) {
    super(props);                                           
  }

  componentDidMount() {
  
     Orientation.lockToPortrait(); //this will lock the view to Portrait
   
    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton = () => {
    const { navigate } = this.props.navigation;

    navigate('LoginPage')
    return true;
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/-1mLJIRlQi1A/Wd73x4-WrcI/AAAAAAAAAJQ/l8r2sj9JsnQpUdqGfb7OjqqWx8DFMkE7wCK8BGAs/s512/Background.jpg' }}
          style={{
            resizeMode: "stretch",
            height: height,
            width: width,
          }}>
        </Image>
        <TouchableOpacity style={{ position: 'absolute' }} activeOpacity={0.5} onPress={() => {
               NetInfo.isConnected.fetch().then(isConnected => { 
                if(isConnected)
                {
                  navigate('LivePage')
  //                 YouTubeStandaloneAndroid.playVideo({
  //                   apiKey: 'AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E',
  //                   videoId: 'CuQMhTTQnT0',
  //                   autoplay: true,
  //                   lightboxMode: true,                                  
                    
  //                 })
  //                   .then(() => console.log('Android Standalone Player Finished'))
  // .catch(errorMessage => this.setState({ error: errorMessage }))
                }
                else{
                  ToastAndroid.show('Oops no internet connection !', ToastAndroid.SHORT);      }
               }); 
                   
                 
        }} >
          <View style={styles.container}>
            <Image style={{ width: width - 250, height: width - 250 }} source={require('../images/play.png')} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: width - 150,
    width: width - 150,
    borderRadius: 20,
    alignItems: 'center'

  },
  artistName: {
    color: "#FFF",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "500",
    fontSize: 18,
    marginTop: 5
  },
  artistSongs: {


    color: "#CCC",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "300",
    fontSize: 14
  },
});
