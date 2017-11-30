import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  BackHandler,
  View,
  Image,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  NetInfo,
  RefreshControl           
} from 'react-native';
import Toast from 'react-native-simple-toast';

import Icon from 'react-native-vector-icons/MaterialIcons';
const STICKY_HEADER_HEIGHT = 50;
import Orientation from 'react-native-orientation-locker';
var Spinner = require('react-native-spinkit');


var Spinner = require('react-native-spinkit');


export default class AudioList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],                                                          
      isLoading: true,
      title: null,
      refreshing: false,
      networkType:null,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });                             

  componentWillMount() {
    this.getData(); 
    
    console.log("I am in audio list")
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange)
}


  _handleNetworkStateChange = (networkType) => {
    console.log("network type"+networkType.type);                               
    this.setState({networkType:networkType.type});
    if(networkType.type == 'none'){
      Toast.show('Oops no internet connection !', Toast.SHORT);                               
      console.log(networkType.type);
    }
    else{
      console.log("I am in else")
    }
  }
  getData() {
    return fetch('http://parmeshar.tv/api/get_post/?id=1085&order_by=post_date')
        .then((response) => response.json()).then((responseJson) => {
            console.log("response audio" + responseJson.post.attachments)
            this.setState({
              posts: responseJson.post.attachments,                                                                                  
              isLoading: false,
              refreshing:false
            });
        }).catch((error) => {
            console.error(error);
        });
}


  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange)
    
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  
  _keyExtractor = (itemData, index) => index;
  
  _renderItem = (itemData) => {                       
       
      const { params } = this.props.navigation.state;
      
      var items = this.state.posts;
      var index = items.indexOf(itemData.item);

      const { navigate } = this.props.navigation;
      var url = 'https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg';
      
      return(                                                                     
           <View style={{ elevation: 10, flex: 8, backgroundColor: "#191565",marginTop:5,marginLeft:5,marginRight:5,marginBottom:5 ,borderRadius:5}}>
     
          <TouchableHighlight onPress={() => {
            console.log('index of song',index)
            if(this.state.networkType == 'none')
            {
              Toast.show('Oops no internet connection !', Toast.SHORT);                                             
            }
            else
            {
            navigate('AudioPlay',{ songIndex: index, item: this.state.posts, songs: itemData.item, image: url, artist: itemData.item })            
            }
          }}>
            <View style={styles.song}>
              <Text style={styles.songTitle}>
                {itemData.item.title}                
              </Text>
              {/* <Text style={styles.albumTitle}>
                {itemData.item.album}
              </Text>                                                */}
            </View>
          </TouchableHighlight>
       
    </View>
        )
   
  }

  renderFooter = () => {
    return this.state.isLoading ?
      <View style={{ alignItems: 'center', marginTop: 10 }}><Spinner
        size={this.state.size} type='Wave' color='rgba(33,37,101,1)}' />
      </View> : null
  };                

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getData();
  }
  
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    var url = 'https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg';
    if (this.state.isLoading) {
      return (
          <View
              style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: 'rgba(33,37,101,0.7)',
              }}>
              <Spinner
                  type='Wave' color='rgba(33,37,101,1)}' />
          </View>
      )                             
  } else {
    return (                  
      <View style={styles.container}>
        <View style={{ flex:0.5, backgroundColor: "rgba(33,37,101,0.5)", justifyContent: "center", alignItems: "center" }}>
          <Image circle
            style={{ height: 100, width: 100 }}
            source={{ uri: 'https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg' }}></Image>
          <TouchableHighlight style={styles.playButton} onPress={() => {
            
            navigate('AudioPlay', { songIndex: 0, item: this.state.posts, songs: this.state.posts, image: url, artist: this.state.posts })
          }}>
            <Text         
              style={styles.playButtonText}>
              PLAY                                            
          </Text>
          </TouchableHighlight>
        </View>
        {/* <View style={{ flex: 6.5, backgroundColor: "#FFF" }}>
          <ListView
            dataSource={songsDataSource}
            style={styles.songsList}
            renderRow={(song, sectionId, rowId) => (
              <TouchableHighlight onPress={() => {
                //navigate('AudioPlay', { songIndex: parseInt(rowId), item: params.item, songs: params.item.songs, image: params.item.background, artist: params.item })
                navigate('AudioPlay', { songIndex: parseInt(rowId), item: params.item, songs: params.item.songs, image: params.item.background, artist: params.item })
              }}>
                <View key={song} style={styles.song}>
                  <Text style={styles.songTitle}>
                    {song.title}              
                  </Text>
                  <Text style={styles.albumTitle}>
                    {song.album}
                  </Text>
                </View>
              </TouchableHighlight>
            )} />
        </View> */}

        <FlatList
          refreshControl={                                                            
            <RefreshControl
              colors={["red", "green", "blue"]}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}
          style={{ marginLeft: 5, marginRight: 5,marginTop:5,marginBottom:5 }}
          showsVerticalScrollIndicator={false}
          data={this.state.posts  }
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
         
        />
      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(33,37,101,0.7)'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  playButton: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: "#191565",
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "#191565",
    paddingTop: 5,
    height: window.height - STICKY_HEADER_HEIGHT,
  },
  song: {
    padding: 10,
    

  },
  songTitle: {
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 5,
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 12
  },

});