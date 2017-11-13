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
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    static navigationOptions = ({ navigation }) => ({
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({ data: params.albumIndex })
    }

    _keyExtractor = (itemData, index) => index;

    _renderItem = (itemData) => {
        try {
            const { navigate } = this.props.navigation;
            if (itemData.item.url) {
                return (
                    <View style={{ flex: 1, flexDirection: 'column', marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ImageView', { image: itemData.item.images.medium_large.url, pageNo: 'three', width: itemData.item.images.medium_large.width, height: itemData.item.images.medium_large.height })
                            }}
                        >
                            <Image1 indicator={ProgressPie}
                                indicatorProps={{
                                    color: 'rgba(33,37,101,1)}'
                                }}
                                source={{ uri: itemData.item.images.square.url }} style={{ width: (width * 46.5) / 100, height: (width * 45) / 100, }} />
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
