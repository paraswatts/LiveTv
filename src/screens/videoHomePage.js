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


const VideoHome = TabNavigator({
    VideoList: {
        screen: VideoList,
        navigationOptions: () => ({
          title: 'Videos',
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
    },                                                                              

   
  }, {
    tabBarPosition: 'top',
    animationEnabled: true,                 
    tabBarOptions: {
        activeTintColor: '#ffffff',
        inactiveTintColor: '#ffffff',
        
        showIcon: false,
        scrollEnabled:true,
        indicatorStyle: {
          borderBottomColor: '#191565',
          borderBottomWidth: 4,
        },
        pressColor:'rgba(33,37,101,0.7)',                       
        labelStyle:{                                       
          fontSize: 12,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style:{
          backgroundColor: 'rgba(33,37,101,0.7)',
        },
        tabStyle: {
          width:200,
          
        }
    },
  });

  export default VideoHome;
  