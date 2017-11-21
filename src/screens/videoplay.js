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
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';

import YouTube from 'react-native-youtube'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class VideoPlay extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  constructor(props) {
    super(props)
    this.state = {
      videoId: null
    }
  }                 
  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <YouTube                                                                      
          controls={1}
          apiKey='AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E'
          videoId={params.videoid} // The YouTube video ID
          play={true} // control playback of video with true/false
          fullscreen={true} // control whether the video should play in fullscreen or inline
          loop={true} // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch', height: 250 }}
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
    backgroundColor: '#000',
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
});
