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
    this.state = {
      attachments: [],
      videoId:null,
      isLoading: true
    }                                          
  }

  getData() {
    const {params} = this.props.navigation.state;
    return fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id&order=date&maxResults=50')
    .then((response) => response.json())
    .then((responseJson) => {                
      console.log("response+++++++" + responseJson.items[0].id.videoId)
        this.setState({
          videoId: responseJson.items[0].id.videoId,
            //attachments:responseJson.posts.attachments,                       
            isLoading: false
        });
    }).catch((error) => {
        console.error(error);
    });

} 

  componentDidMount() {
  
    NetInfo
    .isConnected
    .fetch()
    .then(isConnected => {
        if (isConnected) {                                                                          
            this.getData();

        } else {
            ToastAndroid.show('Oops no internet connection !', ToastAndroid.SHORT);
        }
    }); 
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
    console.log(this.state.items)
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'rgba(33,37,101,0.7)' }}>
        
        <TouchableOpacity style={{ position: 'absolute' }} activeOpacity={0.5} onPress={() => {
               NetInfo.isConnected.fetch().then(isConnected => { 
                if(isConnected)
                {                                             
                  navigate('LivePage',{videoId:this.state.videoId})
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
    backgroundColor: '#191565',
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
