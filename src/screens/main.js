/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Animated,Easing} from 'react-native';
import Login from './login';
import Splash from './splash';
import LiveClass from './live';
import LiveTV from './liveTV';
import Contact from './contact';
import FacebookPage from './facebook';
import VideoClass from './video';
import VideoPlay from './videoplay';
import AudioPlay from './audioplay';
import AudioList from './AudioList';
import {StackNavigator} from 'react-navigation';
import AudioClass from './audio';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
            'u'
});

const AppNavigator = StackNavigator({
    // Splash: {
    //     screen: Splash,
    //     navigationOptions: () => ({header: null})
    // },
    LoginPage: {
        screen: Login,
        navigationOptions: () => ({header: null})
    },
    LivePage: {                            
        screen: LiveClass,
        navigationOptions:()=>({
            title:'Live TV',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }),
        
    },
    ContactPage: {
        screen: Contact,
        navigationOptions:()=>({
            title:'Contact Us',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
    },
    FacebookPage: {
        screen: FacebookPage,
        navigationOptions:()=>({
            title:'Facebook',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
    },
    VideoPage: {
        screen: VideoClass,
        navigationOptions:()=>({
            title:'Video',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
    },
    AudioPage: {
        screen: AudioClass,
        navigationOptions:()=>({
            title:'Shabad',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
        
    },
    VideoPlay: {
        screen: VideoPlay,
        navigationOptions:()=>({
            title:'Video',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
        
    },
    AudioPlay: {
        screen: AudioPlay,
        navigationOptions:()=>({
            title:'Shabad Player',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
        
    },
    AudioList: {
        screen: AudioList,
        navigationOptions:()=>({
            title:'Shabad List',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
        
    },
    LiveTV: {
        screen: LiveTV,
        navigationOptions:()=>({
            title:'Live TV',
            headerStyle:{backgroundColor:'#191565'},
            headerTintColor: '#FFF',
            }
        )
        
        
    }
},
{
    headerMode:'float',
    // transitionConfig: () => ({
    //     transitionSpec: {
    //       duration: 400,
    //       easing: Easing.in(Easing.poly(4)),                                                                                                                              
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