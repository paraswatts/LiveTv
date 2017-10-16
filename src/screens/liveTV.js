import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  Platform,
  NetInfo,
  ToastAndroid
} from 'react-native';

var { height, width } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class LiveTV extends Component {
  static navigationOptions = ({ navigation }) => ({
    gesturesEnabled: true,
    
    headerLeft: (<TouchableOpacity onPress={() => {

      navigation.navigate('LoginPage')
    }}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton = () => {
    const { navigate } = this.props.navigation;

    navigate('LoginPage')
    return true;
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/-1mLJIRlQi1A/Wd73x4-WrcI/AAAAAAAAAJQ/l8r2sj9JsnQpUdqGfb7OjqqWx8DFMkE7wCK8BGAs/s512/Background.jpg' }}
          style={{
            resizeMode: "stretch",
            height: height,
            width: width,
          }}>
        </Image>
        <TouchableOpacity style={{ position: 'absolute' }} activeOpacity={0.5} onPress={() => {
               NetInfo.isConnected.fetch().then(isConnected => { 
                if(isConnected)
                {
                  navigate('LivePage')
                }
                else{
                  ToastAndroid.show('Oops no internet connection !', ToastAndroid.SHORT);      }
               }); 
                   
                 
        }} >
          <View style={styles.container}>
            <Image style={{ width: width - 250, height: width - 250 }} source={require('../images/play.png')} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: width - 150,
    width: width - 150,
    borderRadius: 20,
    alignItems: 'center'

  },
  artistName: {
    color: "#FFF",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "500",
    fontSize: 18,
    marginTop: 5
  },
  artistSongs: {


    color: "#CCC",
    backgroundColor: 'transparent',
    fontFamily: "Helvetica Neue",
    fontWeight: "300",
    fontSize: 14
  },
});
