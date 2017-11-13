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
      isLoading: true
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
                          
  getData() {
    const { params } = this.props.navigation.state;
    return fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id&order=date&maxResults=20&eventType=live&type=video')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response+++++++" + responseJson.items[0].id.videoId)
        this.setState({
          videoId: responseJson.items[0].id.videoId,
          isLoading: false
        });
      }).catch((error) => {
        console.error(error);
      });
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

  componentDidMount() {
    NetInfo
      .isConnected
      .fetch()
      .then(isConnected => {
        if (isConnected) {
          this.getData();

        } else {
          Toast.show('Oops no internet connection !', Toast.SHORT);
        }
      });
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

  render() {
    try {
      const { navigate } = this.props.navigation;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(33,37,101,0.7)' }}>
          <TouchableOpacity style={{ position: 'absolute' }} activeOpacity={0.5} onPress={() => {
            NetInfo.isConnected.fetch().then(isConnected => {
              if (isConnected) {
                navigate('LivePage', { videoId: this.state.videoId })
              }
              else {
                Toast.show('Oops no internet connection !', Toast.SHORT);
              }
            });
          }} >
            <View style={styles.container}>
              <Image style={{ width: width - 250, height: width - 250 }} source={require('../images/play.png')} />
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
