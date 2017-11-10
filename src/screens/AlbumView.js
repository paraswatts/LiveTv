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
    WebView,
    NetInfo,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    Image,
    ActivityIndicator,
    ToastAndroid,
    FlatList
} from 'react-native';


import { createImageProgress } from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';


import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image'
import PinchZoomView from 'react-native-pinch-zoom-view';

const Image1 = createImageProgress(FastImage);

import {
    CustomTabs,
    ANIMATIONS_SLIDE,
    ANIMATIONS_FADE
} from 'react-native-custom-tabs';
var { height, width } = Dimensions.get('window');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
    'u'
});
var Spinner = require('react-native-spinkit');

function wp(percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = width;
const itemWidth = slideWidth + itemHorizontalMargin * 2;




export default class AlbumView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attachments: [],
            posts: [],
            isLoading: true
        }                                               
    }                               
    static navigationOptions = ({ navigation }) => ({ 
        title: `${navigation.state.params.title}`,                            
        headerLeft: (
            <TouchableOpacity onPress={() => {
                console.log("key sa"+navigation.state.key)                   
            navigation.goBack()}}><Icon
                name='navigate-before'
                style={{
                    marginLeft: 10
                }}
                size={40}
                color={'white'} /></TouchableOpacity>
        )
    });                                                 
    componentDidMount() {
        console.log(this.props.navigation.state.params.title)
        if (Platform.OS == "android") {
           //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }

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
    handleBackButton = () => {
      
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation
        
        navigate('Gallery');
        return true;
    }
    getData() {

        const { params } = this.props.navigation.state;

        return fetch('http://parmeshar.tv/api/core/get_category_posts/?category_id=' + params.id).then((response) => response.json()).then((responseJson) => {
            console.log("response+++++++" + responseJson.posts)
            this.setState({
                posts: responseJson.posts,
                //attachments:responseJson.posts.attachments,                       
                isLoading: false
            });
        }).catch((error) => {

            console.error(error);
        });

    }

    _keyExtractor = (itemData, index) => index;


    _renderItem = (itemData) => {
        const { navigate } = this.props.navigation;
        var items = this.state.posts;
        var index = items.indexOf(itemData.item);
        return (
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 10, borderRadius: 10 }}>
                <TouchableOpacity style={{ width: (width * 46.5) / 100, backgroundColor: '#191565', borderRadius: 10, height: 250 }}
                    onPress={() => {
                //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                navigate('GalleryView', { albumIndex: itemData.item.attachments})
                    }}
                >                                       
                    <Image                                              
                        source={{ uri: itemData.item.attachments[0].images.medium.url }} style={{ width: (width * 46.5) / 100, height: 170, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                    <Text style={{ margin: 10, fontSize: 15, color: '#fff', textAlign: 'center', fontWeight: 'bold', marginBottom: 30 }}>{itemData.item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
                                           

    render() {
        console.log(this.props.navigation.state.key);
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
        console.log("Page 1")   
        if (this.state.isLoading) {

                return (
                    <View
                        style={{
                            backgroundColor: 'rgba(33,37,101,0.7)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}>
                        <Spinner
                            size={80} type='Wave' color='rgba(33,37,101,1)}' />
                    </View>
                )
            } else {
            console.log("Page 1");
                return (
                    <View style={styles.container}>
                        <FlatList
                            numColumns='2'
                            style={{ marginBottom: 10, marginLeft: 10 }}
                            showsVerticalScrollIndicator={false}
                            data={this.state.posts}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor} />
                    </View>
                );
            }
       
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
