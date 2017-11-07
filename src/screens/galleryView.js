/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    NetInfo,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    CustomTabs,
    ANIMATIONS_SLIDE,
    ANIMATIONS_FADE
  } from 'react-native-custom-tabs';
var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
            'u'
});

export default class GalleryView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true
        }
    }
    static navigationOptions = ({navigation}) => ({headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}><Icon
                name='navigate-before'
                style={{
                marginLeft: 10
            }}
                size={40}
                color={'white'}/></TouchableOpacity>
        )});
    componentDidMount()
    {

        if (Platform.OS == "android") {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
    }
    handleBackButton = () => {
        const {navigate} = this.props.navigation;

        this
            .props
            .navigation
            .goBack();
        return true;
    }
    getData() {

        return fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fparmeshar.tv%2Fmedia-r' +
                'ss%2F').then((response) => response.json()).then((responseJson) => {
            //console.log("response+++++++" + responseJson.items[7].description )
            this.setState({
                data: responseJson.items,
                isLoading: false
            }, () => {
                console.log(this.state.data[7].description)
            });
        }).catch((error) => {

            console.error(error);
        });

    }

    render() {
        const {params} = this.props.navigation.state;

        return (
            <View style={styles.container}>
                <WebView
                    scalesPageToFit={true}
                    bounces={true}
                    startInLoadingState={true}
                    style={{                                        
                    flex: 1,
                    height:height,
                    width: width - 10
                }}
                    automaticallyAdjustContentInsets={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{
                    html: params.images
                }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
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
