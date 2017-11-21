import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  BackHandler,
  View,
  Image,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,


} from 'react-native';
import Toast from 'react-native-simple-toast';

import Icon from 'react-native-vector-icons/MaterialIcons';
const STICKY_HEADER_HEIGHT = 50;
import Orientation from 'react-native-orientation-locker';

const demoArray = [
  {
    title: "14 APRIL 2017 Vaisakhi Samagam (Dhadrianwale) G.Parmeshar Dwar Sahib PART – 3",
    album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
    url: "http://k003.kiwi6.com/hotlink/c7w64m4irl/part_3_audio.mp3?_=1",
  },
  {
    title: "14 APRIL 2017 Vaisakhi Samagam (Dhadrianwale) G.Parmeshar Dwar Sahib PART – 2",
    album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
    url: "http://k003.kiwi6.com/hotlink/xdba0n11xj/part_2_audio.mp3?_=2",
  },
  {
    title: "14 APRIL 2017 Vaisakhi Samagam (Dhadrianwale) G.Parmeshar Dwar Sahib PART – 1",
    album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
    url: "http://k003.kiwi6.com/hotlink/gmu8xete1t/part_1_audio.mp3?_=3",
  },
  {
    title: "1 FEB 2017 Tohana Haryana (Dhadrianwale) (Satgur Ki Jis Nu Matt Aave)",
    album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
    url: "http://k003.kiwi6.com/hotlink/nbs0a48dac/1-2-17_Tohana_Hariyana_Satgur_Ki_Jis_Nun_Matt_Aave.mp3?_=4",
  },
  {
    title: "31 JAN 2017 Tohana Haryana (Dhadrianwale) (Mohe Marna Ka Chao Hai)",
    album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
    url: "http://k003.kiwi6.com/hotlink/ln9m95a7bk/31-1-17_Tohana_Hariyana_Mohe_Marne_Ka_Chao_Hai.mp3?_=5",
  },
  {
    title: "30 JAN 2017 Tohana Haryana (Dhadrianwale) (Phal Tere Karma Da)",
    album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
    url: "http://k003.kiwi6.com/hotlink/vnqv3jjtbx/30-1-17_Tohana_Hariyana_Phal_Tere_Karma_Da.mp3?_=6",
  },
  {
    title: "25 JAN 2017 Manvi Malerkotla (Dhadrianwale) (Kabir Tu Tu Karta Tu Hua)",
    album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
    url: "http://k003.kiwi6.com/hotlink/8u3lqq3dva/25-1-17_Manvi_Malerkotla_Kabir_Tun_Tun_Karta_Tu_Hua.mp3?_=7",
  },
]


export default class AudioList extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

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
  
  _keyExtractor = (itemData, index) => index;
  
  _renderItem = (itemData) => {                       
    try {       
      const { params } = this.props.navigation.state;
      
      var index = demoArray.indexOf(itemData.item);      
      const { navigate } = this.props.navigation;
      console.log("In render item audio"+index);
      var url = 'https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg';
      
      return(                                                                     
           <View style={{ flex: 8, backgroundColor: "#191565",marginBottom:10 }}>
     
          <TouchableHighlight onPress={() => {
            //navigate('AudioPlay', { songIndex: parseInt(rowId), item: params.item, songs: params.item.songs, image: params.item.background, artist: params.item })
            navigate('AudioPlay',{ songIndex: index, item: demoArray, songs: demoArray, image: url, artist: demoArray })            
          }}>
            <View style={styles.song}>
              <Text style={styles.songTitle}>
                {itemData.item.title}              
              </Text>
              <Text style={styles.albumTitle}>
                {itemData.item.album}
              </Text>                                               
            </View>
          </TouchableHighlight>
       
    </View>
        )
    }
    catch (error) {
      Toast.show('error fetching data', Toast.LONG);
    }
  }

  // renderFooter = () => {
  //   return this.state.isLoading ?
  //     <View style={{ alignItems: 'center', marginTop: 10 }}><Spinner
  //       size={this.state.size} type='Wave' color='rgba(33,37,101,1)}' />
  //     </View> : null
  // };

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    var url = 'https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg';
    //console.log(params.item.background);
    // let songsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(params.item.songs);
    //let songsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(params.item);
    return (
      <View style={styles.container}>
        <View style={{ flex:0.5, backgroundColor: "rgba(33,37,101,0.7)", justifyContent: "center", alignItems: "center" }}>

          <Image circle
            style={{ height: 100, width: 100 }}
            source={{ uri: 'https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg' }}></Image>
          <TouchableHighlight style={styles.playButton} onPress={() => {
            navigate('AudioPlay', { songIndex: 0, item: demoArray, songs: demoArray, image: url, artist: demoArray })
          }}>
            <Text
              style={styles.playButtonText}>
              PLAY
          </Text>
          </TouchableHighlight>
        </View>
        {/* <View style={{ flex: 6.5, backgroundColor: "#FFF" }}>
          <ListView
            dataSource={songsDataSource}
            style={styles.songsList}
            renderRow={(song, sectionId, rowId) => (
              <TouchableHighlight onPress={() => {
                //navigate('AudioPlay', { songIndex: parseInt(rowId), item: params.item, songs: params.item.songs, image: params.item.background, artist: params.item })
                navigate('AudioPlay', { songIndex: parseInt(rowId), item: params.item, songs: params.item.songs, image: params.item.background, artist: params.item })
              }}>
                <View key={song} style={styles.song}>
                  <Text style={styles.songTitle}>
                    {song.title}              
                  </Text>
                  <Text style={styles.albumTitle}>
                    {song.album}
                  </Text>
                </View>
              </TouchableHighlight>
            )} />
        </View> */}

        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh.bind(this)}
          //   />}
          style={{ marginLeft: 10, marginRight: 10, marginBottom: 10,marginTop:10 }}
          showsVerticalScrollIndicator={false}
          data={demoArray}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          //ListFooterComponent={this.renderFooter}
          // onEndReached={() => {
          //   const { params } = this.props.navigation.state;
          //   if (this.state.pageToken != null) {
          //     this.setState({ page: 'two' })
          //     this.getData();
          //   }
          // }}
          // onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(33,37,101,0.7)'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  playButton: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: "#191565",
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "#191565",
    paddingTop: 5,
    height: window.height - STICKY_HEADER_HEIGHT,
  },
  song: {
    padding: 10,
    

  },
  songTitle: {
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 5,
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 12
  },

});