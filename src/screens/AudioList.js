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
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const STICKY_HEADER_HEIGHT = 50;
import Orientation from 'react-native-orientation-locker';

export default class AudioList extends Component {
  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    
        if (Platform.OS == "android") {
          BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }
      }
    
      handleBackButton = () => {
        const { navigate } = this.props.navigation;
        navigate()
        return true;
      }
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => navigation.goBack()}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    console.log(params.item.background);
    let songsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(params.item.songs);
    return (
      <View style={styles.container}>
        <View style={{ flex: 3.5, backgroundColor: "#A0A6A2", justifyContent: "center", alignItems: "center" }}>
          <Image circle
            style={{ height: 100, width: 100 }}
            source={{ uri: params.item.background }}></Image>
          <TouchableHighlight style={styles.playButton} onPress={() => navigate('AudioPlay', { songIndex: 0, item: params.item, songs: params.item.songs, image: params.item.background, artist: params.item })}>
            <Text

              style={styles.playButtonText}>
              PLAY
          </Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 6.5, backgroundColor: "#2AF7EA" }}>
          <ListView
            dataSource={songsDataSource}
            style={styles.songsList}
            renderRow={(song, sectionId, rowId) => (
              <TouchableHighlight onPress={() => navigate('AudioPlay', { songIndex: parseInt(rowId), item: params.item, songs: params.item.songs, image: params.item.background, artist: params.item })}>
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: "#601983",
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 5,
    height: window.height - STICKY_HEADER_HEIGHT,
  },
  song: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#111",

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