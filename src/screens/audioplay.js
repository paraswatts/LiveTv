import React, { Component } from 'react';
import {
  BackHandler,
  NetInfo,
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slider';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
const window = Dimensions.get('window');
import Toast from 'react-native-simple-toast';

export default class AudioPlay extends Component {

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  constructor(props) {
    super(props);
    this.state = {                                                
      playing: true,
      muted: false,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      songIndex: 0,
      songsArray:[]
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => {
      navigation.goBack();
    }}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  componentWillUnmount() {

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentWillMount() {
  {
      const { params }   = this.props.navigation.state;
      const tempData = params.item;
      this.setState({songsArray:params.item},()=>{
        console.log("songs array"+this.state.songsArray)
      })
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this._SongIndex()
    }
  }

  _SongIndex() {
    const { params } = this.props.navigation.state;
    //console.log('song index'+params.songIndex)
    return (
      this.setState({ songIndex: params.songIndex })
    )
  }

  togglePlay() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ playing: !this.state.playing });
      }
      else {
        Toast.show('Oops no internet connection !', Toast.LONG);
      }
    });
  }

  toggleVolume() {
    this.setState({ muted: !this.state.muted });
  }

  toggleShuffle() {
    this.setState({ shuffle: !this.state.shuffle });
  }

  goBackward() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        if (this.state.currentTime < 3 && this.state.songIndex !== 0) {
          this.setState({
            songIndex: this.state.songIndex - 1,
            currentTime: 0,
          });
        } else {
          this.refs.audio.seek(0);
          this.setState({
            currentTime: 0,
          });
        }
      }
      else {
        Toast.show('Oops no internet connection !', Toast.LONG);
      }
    });
  }

  goForward() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log('audio ')
        this.setState({
          songIndex: this.state.shuffle ? this.randomSongIndex() : this.state.songIndex + 1,
          currentTime: 0,
        });
        this.refs.audio.seek(0);
      }
      else {
        Toast.show('Oops no internet connection !', Toast.LONG);
      }
    });
  }

  randomSongIndex() {
    const { params } = this.props.navigation.state;
    let maxIndex = params.songs.length - 1;
    return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
  }

  setTime(params) {
    if (!this.state.sliding) {
      this.setState({ currentTime: params.currentTime });
    }
  }

  onLoad(params) {
    this.setState({ songDuration: params.duration });
  }

  onSlidingStart() {
    this.setState({ sliding: true });
  }

  onSlidingChange(value) {
    let newPosition = value * this.state.songDuration;
    this.setState({ currentTime: newPosition });
  }

  onSlidingComplete() {
    this.refs.audio.seek(this.state.currentTime);
    this.setState({ sliding: false });
  }

  onEnd() {
    this.setState({ playing: false });
  }

  render() {
    
    const { params } = this.props.navigation.state;
    const tempData = params.item;
    
    //console.log(params.item)                                 
    let songPlaying = params.item[this.state.songIndex];              
        console.log("Song playing",songPlaying +""+this.state.songIndex)
    let songPercentage;
    if (this.state.songDuration !== undefined) {
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }

    let playButton;
    if (this.state.playing) {
      playButton = <Icon onPress={() => this.togglePlay()} style={styles.play} name="pause" size={70} color="#fff" />;
    } else {
      playButton = <Icon onPress={() => this.togglePlay()} style={styles.play} name="play-arrow" size={70} color="#fff" />;
    }

    let forwardButton;
    if (!this.state.shuffle && this.state.songIndex + 1 === params.songs.length) {
      console.log("forward if")
      forwardButton = <Icon style={styles.forward} name="skip-next" size={25} color="#333" />;
    } else {
      console.log("forward else")
      forwardButton = <Icon onPress={this.goForward.bind(this)} style={styles.forward} name="skip-next" size={25} color="#fff" />;
    }

    let volumeButton;                 
    if (this.state.muted) {
      volumeButton = <Icon onPress={this.toggleVolume.bind(this)} style={styles.volume} name="volume-off" size={18} color="#fff" />;
    } else {
      volumeButton = <Icon onPress={this.toggleVolume.bind(this)} style={styles.volume} name="volume-up" size={18} color="#fff" />;
    }

    let shuffleButton;
    if (this.state.shuffle) {
      shuffleButton = <Icon onPress={this.toggleShuffle.bind(this)} style={styles.shuffle} name="shuffle" size={18} color="#191565" />;
    } else {
      shuffleButton = <Icon onPress={this.toggleShuffle.bind(this)} style={styles.shuffle} name="shuffle" size={18} color="#fff" />;
    }               
                  
    let image = params.image;
    return (
      <View style={styles.container}>
        <Video source={{ uri: songPlaying.url }}
          ref="audio"
          volume={this.state.muted ? 0 : 1.0}
          muted={false}
          paused={!this.state.playing}
          onLoad={this.onLoad.bind(this)}                                                   
          onProgress={this.setTime.bind(this)}
          onEnd={this.onEnd.bind(this)}
          resizeMode="cover"
          repeat={false} />                                                       

        <View style={styles.header}>
          <Text style={styles.headerText}>
            {params.item.name}
          </Text>
        </View>
        <Image
          style={styles.songImage}
          source={{
            uri: image,
            width: 250,
            height: 250,
            borderRadius: 10
          }} />
        <Text style={styles.songTitle}>
          {songPlaying.title}
        </Text>
        {/* <Text style={styles.albumTitle}>            
          {songPlaying.album}
        </Text> */}
        <View style={styles.sliderContainer}>
          <Slider
            onSlidingStart={this.onSlidingStart.bind(this)}
            onSlidingComplete={this.onSlidingComplete.bind(this)}
            onValueChange={this.onSlidingChange.bind(this)}
            minimumTrackTintColor='#851c44'
            style={styles.slider}
            trackStyle={styles.sliderTrack}
            thumbStyle={styles.sliderThumb}
            value={songPercentage} />

          <View style={styles.timeInfo}>
            <Text style={styles.time}>{formattedTime(this.state.currentTime)}</Text>
            <Text style={styles.timeRight}>- {formattedTime(this.state.songDuration - this.state.currentTime)}</Text>
          </View>
        </View>
        <View style={styles.controls}>
          {shuffleButton}
          <Icon onPress={this.goBackward.bind(this)} style={styles.back} name="skip-previous" size={25} color="#fff" />
          {playButton}
          {forwardButton}
          {volumeButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(33,37,101,0.7)',
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: window.width,
  },
  headerClose: {
    position: 'absolute',
    top: 10,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: 'center',
  },
  songImage: {
    marginBottom: 20,
  },
  songTitle: {
    marginRight: 20,
    marginLeft: 20,
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',

  },
  back: {
    marginTop: 22,
    marginLeft: 45,
  },
  play: {
    marginLeft: 50,
    marginRight: 50,
  },
  forward: {
    marginTop: 22,
    marginRight: 45,
  },
  shuffle: {
    marginTop: 26,
  },
  volume: {
    marginTop: 26,
  },
  sliderContainer: {
    width: window.width - 40,
  },
  timeInfo: {
    flexDirection: 'row',
  },
  time: {
    color: '#FFF',
    flex: 1,
    fontSize: 10,
  },
  timeRight: {
    color: '#FFF',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
  slider: {
    height: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#191565',
    borderRadius: 10 / 2,
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1,
  }
});

function withLeadingZero(amount) {
  if (amount < 10) {
    return `0${amount}`;
  } else {
    return `${amount}`;
  }
}

function formattedTime(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if (isNaN(minutes) || isNaN(seconds)) {
    return "";
  } else {
    return (`${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`);
  }
}
