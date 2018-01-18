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
    RefreshControl,
    FlatList
} from 'react-native';
var Spinner = require('react-native-spinkit');
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import ImageZoom from 'react-native-image-pan-zoom';

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
            networkType:null,
            image:null
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
        const { params } = this.props.navigation.state;
        console.log("param index"+params.albumIndex[0].images.full.url)                    
                this.setState({image:params.albumIndex[0].images.full.url})
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
                                    this.setState({image:itemData.item.images.full.url});
                                }
                            }}
                        >                                                   
                            <Image1 
                                indicator={ProgressPie}
                                indicatorProps={{
                                    color: 'rgba(33,37,101,1)}'
            
                                }} 
                                source={{ uri: itemData.item.images.square.url }}
                                style={{width: width * 0.22, height: width * 0.22,alignItems:'center',justifyContent:'center'}} >     
                                </Image1>                                                         
                        </TouchableOpacity>
                    </View>
                );
            }
        
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={{flex:1,height:height,flexDirection:'column',backgroundColor:'rgba(33,37,101,0.5)'}}>                                                                              
                <View style={{flex:0.835,alignItems:'center',justifyContent:'center'}}>                              
                <ImageZoom                                              
                cropWidth={width}                                                                                    
                cropHeight={height}         
                imageWidth={width}
                imageHeight={width*0.80}>                                                    
                <Image1                                                         
                    indicator={ProgressPie}
                    indicatorProps={{
                        color: 'rgba(33,37,101,1)}'

                    }}                                                                                   
                    style={{                                    
                        alignSelf:'center',                     
                        
                        height: width*0.80, width: width }}                                                                               
                    source={{ uri: this.state.image }} />
            </ImageZoom>
            </View>
                        <View style={{flex:0.165}}>
                <FlatList                           
                    horizontal                                                                                                                                          
                                                                                        
                    style={{                        
                    
                    }}                                                      
                    showsHorizontalScrollIndicator={false}
                    data={params.albumIndex}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor} />
                    </View>
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
