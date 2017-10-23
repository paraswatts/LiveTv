import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Animated,
  Easing
} from 'react-native';
import YouTube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';

import PropTypes from 'prop-types';
export default class LiveClass extends Component {

  static navigationOptions = ({ navigation }) => ({

    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

 
  
  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    
                                                                                                                            
  }


  render() {


    
    return (
      <View style={styles.container}>


        <YouTube

          controls={1}
          apiKey='AIzaSyCCHuayCrwwcRAUZ__zTYyOP-ax5FD4R9E'
          videoId={'wqecJ0EJuHY'} // The YouTube video ID
          play={false} // control playback of video with true/false                           
          fullscreen={true} // control whether the video should play in fullscreen or inline
          loop={true} // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch' ,height:250,left:0,top:0,bottom:0,right:1}}                                                
          modestbranding={true}
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

	containerAndroidFix: {
		marginBottom: 0.1
	}
});
