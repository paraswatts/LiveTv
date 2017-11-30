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
    FlatList
} from 'react-native';

import { createImageProgress } from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import Toast from 'react-native-simple-toast';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image'
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

export default class AlbumView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attachments: [],
            posts: [],
            isLoading: true,
            networkType:null
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerLeft: (
            <TouchableOpacity onPress={() => {
                console.log("key sa" + navigation.state.key)
                navigation.goBack()
            }}><Icon
                    name='navigate-before'
                    style={{
                        marginLeft: 10
                    }}
                    size={40}
                    color={'white'} /></TouchableOpacity>
        )
    });

    componentWillMount() {
        NetInfo.addEventListener('connectionChange',this._handleNetworkStateChange)        
        
        this.getData();
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange)
        
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _handleNetworkStateChange = (networkType) => {
        console.log("network type"+networkType.type);                               
        this.setState({networkType:networkType.type});
        if(networkType.type == 'none'){
          Toast.show('Oops no internet connection !', Toast.SHORT);                               
          console.log(networkType.type);
        }
        else{
          console.log("I am in else")
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }


    getData() {
        const { params } = this.props.navigation.state;
        return fetch('http://parmeshar.tv/api/core/get_category_posts/?category_id=' + params.id).then((response) => response.json()).then((responseJson) => {
            this.setState({
                posts: responseJson.posts,
                isLoading: false
            });
        }).catch((error) => {
        });
    }

    _keyExtractor = (itemData, index) => index;

    _renderItem = (itemData) => {                                               
        try {
            const { navigate } = this.props.navigation;
            var items = this.state.posts;
            var index = items.indexOf(itemData.item);
            return (                        
                <View style={{width: width * 0.445, backgroundColor: '#191565', height: 250, elevation:10,flexDirection: 'column', marginTop: 10, marginRight:5,marginLeft:10,marginBottom:10,borderRadius: 10 }}>
                    <TouchableOpacity 
                        onPress={() => {
                            if(this.state.networkType == 'none')
                            {
                                Toast.show('Oops no internet connection !', Toast.SHORT);                               
                            }
                            else{
                            navigate('GalleryView', { albumIndex: itemData.item.attachments,title:itemData.item.title })
                            }
                        }}                                          
                    >
                        <Image
                            source={{ uri: itemData.item.attachments[0].images.medium.url }} style={{ width: (width * 0.445), height: 170, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                        <Text style={{ margin: 10, fontSize: 15, color: '#fff', textAlign: 'center', fontWeight: 'bold', marginBottom: 30 }}>{itemData.item.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        catch (error) {
            Toast.show('error fetching data', Toast.LONG);
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation;
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
                        type='Wave' color='rgba(33,37,101,1)}' />
                </View>
            )
        } else {
            console.log("Page 1");
            return (
                <View style={styles.container}>
                    <FlatList
                        numColumns='2'
                        style={{ marginBottom: 10,marginTop:5 ,marginLeft: 5, marginRight: 5,}}
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
