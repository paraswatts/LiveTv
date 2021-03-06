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
    Dimensions,
    NetInfo,
    TouchableOpacity,
    BackHandler,
    ActivityIndicator,
    FlatList
} from 'react-native';
import Toast from 'react-native-simple-toast';

import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
var { height, width } = Dimensions.get('window');
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
    'u'
});
var Spinner = require('react-native-spinkit');
var title;
export default class Gallery extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('LoginPage', { index: 1 })}><Icon
                name='navigate-before'
                style={{
                    marginLeft: 10
                }}
                size={40}
                color={'white'} /></TouchableOpacity>
        )
    });

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            isLoading: true,
            title: null,
            networkType:null
            
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        Orientation.lockToPortrait(); //this will lock the view to Portrait
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

    handleBackButton = () => {
        const { navigate } = this.props.navigation;
        navigate('LoginPage', { index: 1 })
        return true;
    }

    getData() {
        return fetch('http://parmeshar.tv/api/get_category_index/?parent=18')
            .then((response) => response.json()).then((responseJson) => {
                console.log("response+++++++" + responseJson.categories)
                this.setState({
                    categories: responseJson.categories,
                    isLoading: false
                });
            }).catch((error) => {
                console.error(error);
            });
    }

    _keyExtractor = (itemData, index) => index;

    _renderItem = (itemData) => {
        try {
            const { navigate } = this.props.navigation;
            return (
                <View style={{ width:width*0.90,elevation: 10, flex: 8, backgroundColor: "#191565",marginTop:10,marginLeft:10,marginRight:10,marginBottom:10 ,borderRadius:5}}>
                    <TouchableOpacity 
                        onPress={() => {
                            if(this.state.networkType == 'none')
                            {
                                Toast.show('Oops no internet connection !', Toast.SHORT);                                                               
                            }
                            else{
                            navigate('AlbumView', { id: itemData.item.id, title: itemData.item.title })
                            }
                        }}
                    >
                        <Text style={{ padding: 10, fontSize: 20, color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>{itemData.item.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        catch (error) {
            Toast.show('error fetching data', Toast.LONG);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: 'rgba(33,37,101,0.7)',
                    }}>
                    <Spinner
                        type='Wave' color='rgba(33,37,101,1)}' />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        style={{ marginLeft: 5, marginRight: 5,marginTop:10,marginBottom:5 }}
                        showsVerticalScrollIndicator={false}
                        data={this.state.categories}
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
        backgroundColor: 'rgba(33,37,101,0.7)',
        alignItems: 'center'
    },
    rightText: {
        width: (width / 2) - 70,
        textAlign: 'center',
        marginTop: 10,
        color: '#FFF',
    },
    row: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    column: {
        alignItems: 'center',
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
