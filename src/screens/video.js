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
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
          Toast.show('Oops no internet connection !', Toast.SHORT);
        }
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

  getData() {
    this.setState({ isLoading: true });
    var url;
    if (this.state.page == 'one') {
      const { params } = this.props.navigation.state;
      var url = 'https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id&maxResults=20&playlistId=' + params.playlistId
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.nextPageToken) {
            this.setState({
              pageToken: responseJson.nextPageToken,
              items: responseJson.items,
              //attachments:responseJson.posts.attachments,                       
              isLoading: false,
              refreshing: false
            }, () => {
            });
          }
          else {
            this.setState({
              pageToken: null,
              items: responseJson.items,
              //attachments:responseJson.posts.attachments,                       
              isLoading: false,
              refreshing: false
            }, () => {
            });
          }
        }).catch((error) => {
        });
    }
    else {
      const { params } = this.props.navigation.state;
      return fetch('https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E&channelId=UCswIOlMY2_DT05glwBsxZyg&part=snippet,id&maxResults=20&playlistId=' + params.playlistId + '&pageToken=' + this.state.pageToken)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.nextPageToken) {
            this.setState({
              pageToken: responseJson.nextPageToken,
              items: [...this.state.items, ...responseJson.items],
              isLoading: false,
              refreshing: false
            }, () => {
            });
          }
          else {
            this.setState({
              pageToken: null,
              items: [...this.state.items, ...responseJson.items],
              //attachments:responseJson.posts.attachments,                       
              isLoading: false,
              refreshing: false
            }, () => {
            });
          }
        }).catch((error) => {
        });
    }
  }

  _renderItem = (itemData) => {
    try {
      const { navigate } = this.props.navigation;
      if (itemData.item.snippet.thumbnails) {
        return (
          <View style={{ marginTop: 10, width: width - 20, flexDirection: 'column', borderRadius: 5, height: 120 }}>
            <TouchableOpacity
              style={{
                width: width - 30,
                borderRadius: 5,
                margin: 5,
                height: 110,
                elevation: 10,
                backgroundColor: '#191565',
                flexDirection: "row",
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
                  fontSize: 15
                }}>{itemData.item.snippet.title}</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: 'rgba(33,37,101,0.1)', width: width, height: 10 }} />
          </View>
        )
      }
    }
    catch (error) {
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
          style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
          data={this.state.items}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this.renderFooter}
          onEndReached={() => {
            const { params } = this.props.navigation.state;
            console.log("Handle Load More Item " + params.itemCount)
            if (this.state.pageToken != null) {
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
