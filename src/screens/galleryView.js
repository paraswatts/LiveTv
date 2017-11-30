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
    Image,
    WebView,
    NetInfo,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    ActivityIndicator,
    FlatList
} from 'react-native';
var Spinner = require('react-native-spinkit');
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';

var { height, width } = Dimensions.get('window');
import ProgressPie from 'react-native-progress/Pie';
import { createImageProgress } from 'react-native-image-progress';
const Image1 = createImageProgress(FastImage);
import FastImage from 'react-native-fast-image'
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
            isLoading: true,
            networkType:null
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()}><Icon
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
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange',this._handleNetworkStateChange)
        
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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

    componentDidMount() {
        const { params } = this.props.navigation.state;
        console.log(this.props.navigation.state.params.title)
        this.setState({ data: params.albumIndex })
    }

    _keyExtractor = (itemData, index) => index;

    _renderItem = (itemData) => {
        try {
            const { navigate } = this.props.navigation;
            if (itemData.item.url) {
                return (
                    <View style={{ flex: 1, flexDirection: 'column', marginTop: 10 ,borderRadius:5}}>                       
                        <TouchableOpacity
                            style={{borderRadius:5}}
                            onPress={() => {
                                if(this.state.networkType)
                                {
                                    Toast.show('Oops no internet connection !', Toast.SHORT);                               
                                    
                                }
                                else
                                {
                                navigate('ImageView', { image: itemData.item.url, pageNo: 'three', width: itemData.item.images.medium_large.width, height: itemData.item.images.medium_large.height })
                                }
                            }}
                        >                                                   
                            <Image 
                                onLoadEnd={()=>{
                                       this.setState({isLoading:false},()=>{
                                       });  
                                }}
                                source={{ uri: itemData.item.images.square.url }}
                                style={{ width: (width * 46.5) / 100, height: (width * 45) / 100, borderRadius:5,alignItems:'center',justifyContent:'center'}} >
                                <ActivityIndicator 
                                        style={{alignSelf:'center'}}
                                        animating={this.state.isLoading}
                                        color='#191565'
                                        size='large' />
                                    
                                </Image>                                                         
                        </TouchableOpacity>
                    </View>
                );
            }
        }
        catch (error) {
            Toast.show('error fetching data', Toast.LONG);
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <FlatList
                    numColumns='2'
                    style={{ marginBottom: 10, marginLeft: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={params.albumIndex}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
