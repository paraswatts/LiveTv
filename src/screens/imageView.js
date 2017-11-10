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
    ToastAndroid,
    FlatList
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    CustomTabs,
    ANIMATIONS_SLIDE,
    ANIMATIONS_FADE
  } from 'react-native-custom-tabs';
var {height, width} = Dimensions.get('window');
import ProgressPie from 'react-native-progress/Pie';

import { createImageProgress } from 'react-native-image-progress';
const Image1 = createImageProgress(FastImage);
import FastImage from 'react-native-fast-image'
import PinchZoomView from 'react-native-pinch-zoom-view';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
            'u'
});

export default class ImageView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
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
        // const {params} = this.props.navigation.state;
        
        // this.setState({data:params.albumIndex},()=>{
        //         console.log("Gallery"+this.state.data)                                          
        // })
        if (Platform.OS == "android") {
            //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
    }
    handleBackButton = () => {
        const {navigate} = this.props.navigation;
        const { goBack } = this.props.navigation
        
        goBack();
        return true;
    }
    

    _keyExtractor = (itemData, index) => index;                                                           

    
    
    render() {
        console.log("Page 3")
        const { params } = this.props.navigation.state;        
        var widthFb = params.width
        var heightFb = params.height
        var difference = heightFb / widthFb
        return (
            <View style={styles.container} >
                <PinchZoomView>
                    <Image1
                        indicator={ProgressPie}
                        indicatorProps={{
                            color: 'rgba(33,37,101,1)}'

                        }}
                        style={{ height: (width - 10) * difference, width: width }}
                        source={{ uri: params.image }} />
                </PinchZoomView>
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
