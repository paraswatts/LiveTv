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
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { YouTube, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Toast from 'react-native-simple-toast';
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
      videoId: null,
      isLoading: true,
      networkType:null
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
                                              
  getData() {
    const { params } = this.props.navigation.state;
    return fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id&order=date&maxResults=20&eventType=live&type=video')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response+++++++ Video Id" + responseJson.items[0].id.videoId)
        if(responseJson.items[0].id)                                                                  
        { 
        this.setState({
          videoId: responseJson.items[0].id.videoId,
          isLoading: false
        });                       
      }
      else{

        Toast.show(' Stream Not Available', Toast.SHORT);
        
      }
      }).catch((error) => {
        console.error(error);
      });
  }                       

  componentWillMount() {
    this.getData();      
    
    NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange)
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange)
    
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentDidMount() {
    
    Orientation.lockToPortrait(); 
    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton = () => {
    const { navigate } = this.props.navigation;
    navigate('LoginPage')
    return true;
  }
  _handleNetworkStateChange = (networkType) => {
    
    console.log(networkType);
    this.setState({networkType:networkType.type});
    if(networkType.type == 'none'){
      Toast.show('Oops no internet connection !', Toast.SHORT);                               
      console.log(networkType.type);
    }
    else{
      console.log("getting data");                            
    }
  }

  render() {
    try {
      const { navigate } = this.props.navigation;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(33,37,101,0.7)' }}>
          <TouchableOpacity style={{ position: 'absolute' }} activeOpacity={0.5} onPress={() => {
            
              if (this.state.networkType == 'none') {
                                                
                Toast.show('Oops no internet connection !', Toast.SHORT);
              }
              else {
                if(this.state.videoId == null)
                {
                  Toast.show('Currently no live stream is available', Toast.SHORT);

                }
                else
                {
                                  navigate('LivePage', { videoId: this.state.videoId })
                }
                
               
              }
          }} >
            <View style={styles.container}>
              <Image style={{ width: width - 250, height: width - 250 }} 
              source={{uri:'https://lh3.googleusercontent.com/-NLBgjt7_TVE/WgvsyXhB7jI/AAAAAAAAAPk/ZYtlMXKcEOARTlDexaISsGNMbm3oUMRLwCK8BGAs/s256/2017-11-14.png'}} />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    catch (error) {
      Toast.show('error fetching data', Toast.LONG);
    }
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
