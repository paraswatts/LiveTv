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
  ToastAndroid,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
var Spinner = require('react-native-spinkit');

import { YouTube, YouTubeStandaloneAndroid } from 'react-native-youtube';

import Icon from 'react-native-vector-icons/MaterialIcons';
var { height, width } = Dimensions.get('window');

export default class VideoClass extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerLeft: (

      <TouchableOpacity onPress={() => navigation.goBack()}><Icon
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
      refreshing: false,
      itemCount: null,

    }
  }

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait

   

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
    var url;
    if (this.state.page == 'one') {
      const { params } = this.props.navigation.state;

      var url = 'https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id&maxResults=20&playlistId=' + params.playlistId
      console.log(url)
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Videos in Playlist" + responseJson.items)
          if (responseJson.nextPageToken) {
            console.log("if 11");

            this.setState({
              pageToken: responseJson.nextPageToken,
              items: responseJson.items,
              //attachments:responseJson.posts.attachments,                       
              isLoading: false,
              refreshing: false
            }, () => {
              console.log("Page Token", this.state.pageToken);
            });
          }
          else {
            console.log("else 11");

            this.setState({
              pageToken: null,
              items: responseJson.items,
              //attachments:responseJson.posts.attachments,                       
              isLoading: false,
              refreshing: false
            }, () => {
              console.log("Only one page");
            });
          }
        }).catch((error) => {
          console.error(error);
        });
    }
    else {
      const { params } = this.props.navigation.state;

      return fetch('https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id&maxResults=20&playlistId=' + params.playlistId + '&pageToken=' + this.state.pageToken)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Handle Load More")

          console.log("response+++++++" + responseJson.items)
          if (responseJson.nextPageToken) {
            console.log("if 22");

            this.setState({
              pageToken: responseJson.nextPageToken,
              items: [...this.state.items, ...responseJson.items],

              //attachments:responseJson.posts.attachments,                       
              isLoading: false,
              refreshing: false
            }, () => {
              console.log("Page Token", this.state.pageToken);
            });
          }
          else {
            console.log("else 22");

            this.setState({
              pageToken: null,
              items: [...this.state.items, ...responseJson.items],
              //attachments:responseJson.posts.attachments,                       
              isLoading: false,
              refreshing: false
            }, () => {
              console.log("Only one page");
            });
          }
        }).catch((error) => {
          console.error(error);
        });
    }
  }


 
  _renderItem = (itemData) => {
    console.log("VideoId==============" + itemData.item.snippet)
    const { navigate } = this.props.navigation;

    if (itemData.item.snippet.thumbnails) {
      return (
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#191565',
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
                    navigate("VideoPlay", { videoid: itemData.item.snippet.resourceId.videoId })
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

  }

  renderFooter = () => {

    return this.state.isLoading ?
      <View style={{ alignItems: 'center' }}><Spinner

        size={this.state.size} type='Wave' color='rgba(33,37,101,1)}' />
      </View> : null

  };


  _keyExtractor = (itemData, index) => index;

  _onRefresh() {
    this.setState({ page: 'one' })

    this.setState({ refreshing: true });
    this.getData();
  }

  render() {
    const { params } = this.props.navigation.state;


    return (
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />}
          style={{ margin: 10 }}
          showsVerticalScrollIndicator={false}
          data={this.state.items}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          onEndReached={() => {
            const { params } = this.props.navigation.state;
            console.log("Handle Load More Item " + params.itemCount)
            if (this.state.pageToken != null)
            {
              this.setState({ page: 'two' })
              this.getData();
            }
          }}
          onEndReachedThreshold={0.5}
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
