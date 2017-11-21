import React, { Component } from 'react';
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
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
var Spinner = require('react-native-spinkit');
import Toast from 'react-native-simple-toast';
import { YouTube, YouTubeStandaloneAndroid } from 'react-native-youtube';
import Icon from 'react-native-vector-icons/MaterialIcons';
var { height, width } = Dimensions.get('window');

export default class YoutubePlaylist extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}><Icon
        name='navigate-before'
        style={{
          marginLeft: 10
        }}
        size={40}
        color={'white'} /></TouchableOpacity>
    )
  });

  constructor(props) {
    super(props)
    this.state = {
      attachments: [],
      items: [],
      isLoading: false,
      pageToken: null,
      page: 'one',
      refreshing: false
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
    Orientation.lockToPortrait(); 
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
  }

  getData() {
    this.setState({ isLoading: true });
    const { params } = this.props.navigation.state;
    return fetch('https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id,contentDetails&maxResults=20')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response+++++++" + responseJson.items)
        this.setState({
          items: responseJson.items,
          isLoading: false,
          refreshing: false
        }, () => {
        });
      }).catch((error) => {
      });
  }

  _renderItem = (itemData) => {
    const { navigate } = this.props.navigation;
    try {

      return (
        <View style={{ height: 120, width: width - 20, marginTop: 10, flexDirection: 'column', borderRadius: 5 }}>
          <TouchableOpacity
            style={{
              margin: 5,
              height: 110,
              elevation: 10,
              backgroundColor: '#191565',
              flexDirection: "row",
              width: width - 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5
            }}
            activeOpacity={.5}
            onPress={() => {
              NetInfo
                .isConnected
                .fetch()
                .then(isConnected => {
                  if (isConnected) {
                    if (itemData.item.contentDetails.itemCount > 0) {
                      navigate("PlaylistVideo", {
                        playlistId: itemData.item.id,
                        title: itemData.item.snippet.title,
                        itemCount: itemData.item.contentDetails.itemCount,
                      })
                    } else {
                      Toast.show('Playlist is empty', Toast.SHORT);
                    }

                  } else {
                    Toast.show('Oops no internet connection !', Toast.SHORT);
                  }
                });                                 
            }}>
            <Image
              style={{
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 10,
                height: 90,
                width: 140
              }}
              source={{
                uri: itemData.item.snippet.thumbnails.default.url
              }}></Image>
            <Text
              style={{
                color: '#FFF',
                flex: 1,
                flexWrap: 'wrap',
                marginRight: 30,
                marginLeft: 10,
                fontSize: 18
              }}>{itemData.item.snippet.title}</Text>
          </TouchableOpacity>
          <View style={{ backgroundColor: 'rgba(33,37,101,0.1)', width: width, height: 10 }} />
        </View>
      )
    
  
  }
  catch(error) {
    Toast.show('error fetching data', Toast.LONG);
  }

}

renderFooter = () => {
  return this.state.isLoading ?
    <View style={{ alignItems: 'center', marginTop: 10 }}><Spinner
      size={this.state.size} type='Wave' color='rgba(33,37,101,1)}' />
    </View> : null
};

_keyExtractor = (itemData, index) => index;

handleLoadMore = () => {
  this.setState({ page: 'two' })
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
        style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
        refreshControl={
          <RefreshControl
            colors={["red", "green", "blue"]}     
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />} style={{ flex: 1 }}
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
