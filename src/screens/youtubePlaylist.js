import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  NetInfo,
  ToastAndroid,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
var Spinner = require('react-native-spinkit');

import {YouTube, YouTubeStandaloneAndroid} from 'react-native-youtube';

import Icon from 'react-native-vector-icons/MaterialIcons';
var {height, width} = Dimensions.get('window');

export default class YoutubePlaylist extends Component {

  static navigationOptions = ({navigation}) => ({headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('LoginPage',{index:1})}><Icon
        name='navigate-before'
        style={{
        marginLeft: 10
      }}
        size={40}
        color={'white'}/></TouchableOpacity>
    )});

    constructor(props) {
      super(props)
      this.state = {
          attachments: [],
          items: [],
          isLoading: false,
          pageToken:null,
          page:'one',
          refreshing: false
          
      }
  }                       

  componentDidMount() {
    console.log("Youtube playlist did mount")
    Orientation.lockToPortrait(); //this will lock the view to Portrait

    if (Platform.OS == "android") {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);                     
    }

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
  }             

  getData() {
    this.setState({ isLoading: true });
    
            const {params} = this.props.navigation.state;
            return fetch('https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id,contentDetails&maxResults=20')
            .then((response) => response.json())
            .then((responseJson) => {                
              console.log("response+++++++" + responseJson.items)
                this.setState({
                    items: responseJson.items,
                    //attachments:responseJson.posts.attachments,                       
                    isLoading: false,
                    refreshing: false
                },()=>{
                });
            }).catch((error) => {
                console.error(error);
            });
          }
       
          

      
  handleBackButton = () => {


    const {navigate} = this.props.navigation;                 

    navigate('LoginPage',{index:1})                                           
    return true;
  }
  _renderItem = (itemData) => {
    const {navigate} = this.props.navigation;
    console.log("Item Count"+itemData.item.contentDetails.itemCount)              

    return (
      <View style={{flexDirection:'column'}}>
      <TouchableOpacity
        style={{
          backgroundColor:'#191565',
        flexDirection: "row",
        width: width,
        alignItems: 'center',
        justifyContent: 'center'
      }}
        activeOpacity={.5}
        onPress={() => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        NetInfo
          .isConnected
          .fetch()
          .then(isConnected => {
            if (isConnected) {
              navigate("VideoPage", {playlistId: itemData.item.id,
                title:itemData.item.snippet.title,
                itemCount:itemData.item.contentDetails.itemCount})
            } else {
              ToastAndroid.show('Oops no internet connection !', ToastAndroid.SHORT);
            }
          });
      }}>
        <Image
          style={{
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 10,
          height: 100,
          width: 150                                
        }}
          source={{
          uri: itemData.item.snippet.thumbnails.default.url                  
        }}></Image>
        <Text
          style={{
            color:'#FFF',                     
          flex: 1,
          flexWrap: 'wrap',
          marginRight: 30,
          marginLeft: 10,                                                                           
          fontSize: 18
        }}>{itemData.item.snippet.title}</Text>
      </TouchableOpacity>
              <View style={{backgroundColor:'rgba(33,37,101,0.1)',width:width,height:10}}/>
              </View>                               
    )  
                                                                                 
  }                         

  renderFooter = () => {

    return this.state.isLoading ?           
    <View style={{alignItems:'center'}}><Spinner 
                                                     
    size={this.state.size} type='Wave' color='rgba(33,37,101,1)}'/>
    </View> : null
    
  };


  _keyExtractor = (itemData, index) => index;                                                           


  handleLoadMore = () => {
        console.log("Handle Load More")
    this.setState({page:'two'})
    //    this.makeRemoteRequest();
    this.getData();
    
  };

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getData();
  }

  render() {
      return (
          <View style={styles.container}>
          <FlatList
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />} style={{ flex: 1 }}
          style={{margin:10}}
          showsVerticalScrollIndicator={false}
          data={this.state.items}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
                  
          ListFooterComponent={this.renderFooter}
          />
          </View>
      );                                          

  }
}                                   
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(33,37,101,0.7)',              
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
