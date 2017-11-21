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
import { TabNavigator } from 'react-navigation';

import YoutubePlaylist from './youtubePlaylist';
import VideoList from './videoList';
var { height, width } = Dimensions.get('window');


const VideoHome = TabNavigator({
                                            
    VideoList: {
        screen: VideoList,
        navigationOptions: () => ({
          title: 'All Videos',
          headerStyle: { backgroundColor: '#191565' },
          headerTintColor: '#FFF',
      })
    },    
    YoutubePlaylist: {
      screen: YoutubePlaylist,
      navigationOptions: () => ({
        title: 'Youtube Playlists',
        headerStyle: { backgroundColor: '#191565' },
        headerTintColor: '#FFF',
    })
  }                                                                             

   
  }, 
  {
    tabBarPosition: 'top',
    animationEnabled: true,  
    backBehavior:'none',               
    tabBarOptions: {      
      pressOpacity:0.5,
      upperCaseLabel: false,                                                              
      activeBackgroundColor:'#ffffff',
        activeTintColor: '#ffffff',
        inactiveTintColor: '#c8cace',
        showIcon: false,
        scrollEnabled:true,
        indicatorStyle: {                                 
          borderBottomColor: '#191565',
          borderBottomWidth: 4,
        },
        pressColor:'rgba(33,37,101,0.7)',                       
        labelStyle:{                                       
          fontSize: 15,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style:{
          backgroundColor: 'rgba(33,37,101,0.7)',
        },
        tabStyle: {
          width:width/2,  
        }
    },
  });

  export default VideoHome;
  