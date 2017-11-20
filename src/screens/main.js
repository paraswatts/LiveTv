/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import Login from './login';
import LiveClass from './live';
import LiveTV from './liveTV';
import Contact from './contact';
import FacebookPage from './facebook';
import PlaylistVideo from './playlistVideo';
import VideoPlay from './videoplay';
import AudioPlay from './audioplay';
import AudioList from './AudioList';
import { StackNavigator } from 'react-navigation';
import AudioClass from './audio';
import GalleryView from './galleryView';
import AlbumView from './AlbumView';
import Gallery from './gallery';
import ImageView from './imageView';
import YoutubePlaylist from './youtubePlaylist';
import VudioList from './videoList';
import VideoHome from './videoHomePage';



import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

                                                        
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
    'u'
});

const AppNavigator = StackNavigator({
    LoginPage: {
        screen: Login,
        navigationOptions: () => ({ header: null })
    },
    LivePage: {
        screen: LiveClass,
        navigationOptions: () => ({
            title: 'Live TV',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }),

    },
    ContactPage: {
        screen: Contact,
        navigationOptions: () => ({
            title: 'Contact Us',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )

    },
    FacebookPage: {
        screen: FacebookPage,
        navigationOptions: () => ({
            title: 'Facebook',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )

    },
    PlaylistVideo: {                                                        
        screen: PlaylistVideo,
        navigationOptions: () => ({
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    AudioPage: {
        screen: AudioClass,
        navigationOptions: () => ({
            title: 'Shabad',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    VideoPlay: {
        screen: VideoPlay,
        navigationOptions: () => ({
            title: 'Video',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    AudioPlay: {
        screen: AudioPlay,
        navigationOptions: () => ({
            title: 'Shabad Player',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    AudioList: {
        screen: AudioList,
        navigationOptions: () => ({
            title: 'Shabad List',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    LiveTV: {
        screen: LiveTV,
        navigationOptions: () => ({
            title: 'Live TV',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    GalleryView: {
        screen: GalleryView,
        navigationOptions: () => ({
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    Gallery: {
        screen: Gallery,
        navigationOptions: () => ({
            title: 'Pictures',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    AlbumView: {
        screen: AlbumView,
        navigationOptions: () => ({

            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
    ImageView: {
        screen: ImageView,
        navigationOptions: () => ({
            title: 'Image',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },

    VideoHome: {
        screen: VideoHome,
        navigationOptions: () => ({
            title: 'Youtube Playlists',
            headerStyle: { backgroundColor: '#191565' },
            headerTintColor: '#FFF',
        }
        )
    },
},
    {
        headerMode: 'float',
        transitionConfig:getSlideFromRightTransition        
        // transitionConfig: () => ({
        //     transitionSpec: {
        //       duration: 500,                                                                           
        //       easing: Easing.inOut(Easing.poly(4)),                                                                                                                              
        //       timing: Animated.timing,
        //     },                                                       
        //     screenInterpolator: sceneProps => {
        //       const { layout, position, scene } = sceneProps;
        //       const { index } = scene;

        //       const height = layout.initHeight;
        //       const translateY = position.interpolate({
        //         inputRange: [index - 1, index, index + 1],
        //         outputRange: [height, 0, 0],
        //       });

        //       const opacity = position.interpolate({
        //         inputRange: [index - 1, index - 0.99, index],
        //         outputRange: [0, 1, 1],
        //       });

        //       return { opacity, transform: [{ translateY }] };
        //     },
        //   }),
    }

)

export default AppNavigator;