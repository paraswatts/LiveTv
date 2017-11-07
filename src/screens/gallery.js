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
    Dimensions,
    NetInfo,
    TouchableOpacity,
    BackHandler,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
            'u'
});

var title;

export default class Gallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            title: null
        }
    }
    static navigationOptions = ({navigation}) => ({headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}><Icon
                name='navigate-before'
                style={{
                marginLeft: 10
            }}
                size={40}
                color={'white'}/></TouchableOpacity>
        )});
    componentDidMount()
    {

        Orientation.lockToPortrait(); //this will lock the view to Portrait
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

        if (Platform.OS == "android") {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
    }
    handleBackButton = () => {
        const {navigate} = this.props.navigation;

        navigate('LoginPage')
        return true;
    }
    getData() {

        return fetch('https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fparmeshar.tv%2Fmedia-rss%2F&api_key=2bfpdgwwxhiufi1jpx7xq71hvqjvcsl2aoqgz1tq&count=30').then((response) => response.json()).then((responseJson) => {
            //console.log("response+++++++" + responseJson.items[7].description )
            this.setState({
                data: responseJson.items,
                isLoading: false
            }, () => {
                console.log(this.state.data[4].title)
                title = this.state.data[4].title
                console.log(title)

            });
        }).catch((error) => {

            console.error(error);
        });

    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <ActivityIndicator color={'#191565'} animating={true} size={'large'}/>
                </View>
            )
        } else {
            console.log()
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <View
                            style={styles.row}>                                                                                                                                                                                       
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[4].description})
                                }}>
                                    <Image style={styles.image} source={require('../images/pic.png')}/>
                                </TouchableOpacity>
                                <Text style={styles.welcome}>{this.state.data[4].title}</Text>
                            </View>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[7].description})
                                }}>
                                    <Image style={styles.imageRight} source={require('../images/pic.png')}/>
                                </TouchableOpacity>
                                <Text style={styles.rightText}>{this.state.data[7].title}</Text>
                            </View>
                        </View>
                        <View
                            style={styles.row}>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[17].description})
                                }}>

                                    <Image style={styles.image} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/Febuary-2016-Deewan-bhawanigarh-8-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.welcome}>{this.state.data[17].title}</Text>
                            </View>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[18].description})
                                }}>
                                    <Image style={styles.imageRight} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/june-diwan-raunke-kalanbadni-kalanmoga-13-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.rightText}>{this.state.data[18].title}</Text>
                            </View>
                        </View>
                        <View
                            style={styles.row}>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[19].description})
                                }}>
                                    <Image style={styles.image} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/april-ahmedgarh-mandiludhiana-diwan-1-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.welcome}>{this.state.data[19].title}</Text>
                            </View>
                            <View                                                                       
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[20].description})
                                }}>                                                                                   
                                    <Image style={styles.imageRight} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/10-10-2016-panjgrai-kotakpura-6-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.rightText}>{this.state.data[20].title}</Text>
                            </View>
                        </View>                             
                        <View
                            style={styles.row}>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[21].description})
                                }}>
                                    <Image style={styles.image} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/10-7-2016-g-sant-sagarnew-york-7-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.welcome}>{this.state.data[21].title}</Text>
                            </View>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[22].description})
                                }}>                                                                                   
                                    <Image style={styles.imageRight} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/02-01-2016-saturday-diwan-1-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.rightText}>{this.state.data[22].title}</Text>
                            </View>
                        </View>  
                        <View
                            style={styles.row}>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[24].description})
                                }}>
                                    <Image style={styles.image} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/1-10-2016-Saturday-Samagam-Diwan-8-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.welcome}>{this.state.data[24].title}</Text>
                            </View>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[23].description})
                                }}>                                                                                   
                                    <Image style={styles.imageRight} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/1-1-2015-lakhnaur-sahib-bhai-gurbaksh-singh-khalsa-3-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.rightText}>{this.state.data[23].title}</Text>
                            </View>
                        </View> 
                        <View 
                            style={styles.row}>
                            <View style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[16].description})
                                }}>
                                    <Image style={styles.image} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/Deewan-April-2015-11-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text style={styles.welcome}>{this.state.data[16].title}</Text>
                            </View>
                            <View
                                style={styles.column}>
                                <TouchableOpacity
                                    onPress={() => {
                                    navigate('GalleryView', {images: this.state.data[15].description})
                                }}>                                                                                   
                                    <Image style={styles.imageRight} source={{uri:'http://parmeshar.tv/wp-content/uploads/2017/01/14-1-2015-sangrand-samagam-18-180x180.jpg'}}/>
                                </TouchableOpacity>
                                <Text
                                    style={styles.rightText}>{this.state.data[15].title}</Text>
                            </View>
                        </View>                            
                    </View>
                </ScrollView>
            );                                          
        }
    }
}                                                                                       

const styles = StyleSheet.create({                                                  
    container: {
        flex: 1,                                                                                                                                                        
        backgroundColor: 'rgba(33,37,101,0.7)',
        alignItems: 'center'
    },
    rightText:{
        width: (width / 2) - 70,
        textAlign: 'center',
        marginTop: 10,                                                             
        color: '#FFF',                                                                  
    },
    row:{                                           
        marginLeft:20,                          
        marginRight:20,
        marginTop:20,
        flexDirection: 'row' 
    },
    column:{
        alignItems:'center',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    welcome: {
        width: (width / 2) - 70,        
        textAlign: 'center',
        marginTop: 10,
        color: '#FFF'
    },
    image: {
        resizeMode: 'stretch',
        width: (width / 2) - 70,
        height: (width / 2) - 70
    },
    imageRight: {
        resizeMode: 'stretch',
        width: (width / 2) - 70,
        height: (width / 2) - 70,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
