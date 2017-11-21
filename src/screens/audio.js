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
  Platform
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
var { height, width } = Dimensions.get('window');
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
  

const Artists = [
  {
    name: "Samagam List 1",
    background: "https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg",
    songs: [
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
  },
  {
    name: "Samagam List 2",
    background: "https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg",
    songs: [
      {
        title: "24 JAN 2017 Manvi Malerkotla (Dhadrianwale) (Thande Buraz Vich Thanda Seena Hoya Maa Gujri Da)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/lji9rjn9er/24-1-17_Manvi_Malerkotla_Thande_Buraz_Vich_Thanda_Seena_Hoia_Maa_Gujri_Da.mp3?_=8",
      },
      {
        title: "23 JAN 2017 Manvi Malerkotla (Dhadrianwale) (Sahib Mera Neet Nava)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/rr4u7k9ewi/23-1-17_Manvi_Malerkotla_Saheb_Mera_Neet_Nava.mp3?_=9",
      },
      {
        title: "21 JAN 2017 Kotdunna Bhikhi (Dhadrianwale) (Jagat Jalandha Rakh Lai)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: " http://k003.kiwi6.com/hotlink/17wui36tc8/21-1-17_Kotdunna_Bhikhi_Jagat_Jalandha_Rakh_Lai.mp3?_=10 ",
      },
      {
        title: "20 JAN 2017 Kotdunna Bhikhi (Dhadrianwale) (Bas Ese Karke Tere Naal Saddi Bandi Ni Sarkare Ni)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/o9vzztpsbv/20-1-17_Kotdunna_Bhikhi_Bass_Ese_Kar_Ke_Tere_Naal_Sadi_Bandi_Ni_Sarkare_Ni.mp3?_=11 ",
      },
      {
        title: "18 JAN 2017 Dakala Patiala (Dhadrianwale) (Ek Noor Te Sab Jag Upjea)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/wrcott9c17/18-1-17_Dakala_Patiala_Ek_Noor_Te_Sab_Jag_Upjea.mp3?_=12",
      },
      {
        title: "17 JAN 2017 Dakala Patiala (Dhadrianwale) (Mohe Nirgun Sabh Gun Tere)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/5668hymbby/17-1-17_Dakala_Patiala_Mohe_Nirgur_Sabh_Gun_Tere.mp3?_=13",
      },
      {
        title: "16 JAN 2017 Dakala Patiala (Dhadrianwale) (Gur Ka Bachan Basaye Ji Naale)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/uq7fdyjrlp/16-1-17_Dakala_Patiala_Gur_Ka_Bachan_Basaye_Ji_Naale.mp3?_=14",
      },
      {
        title: "11 JAN 2017 Akbarpur Bhawanigarh (Dhadrianwale) (Bedosh Nimaaniyian Jinda Nu)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/5svk0q9a5e/11-1-17_Aakbar_Pur_Bhawanigarh_Bedosh_Nimaaniyan_Jindan_Nun_Gangu_Tun_Phara_Ke_Kee_Laina.mp3?_=15",
      },
      {
        title: "10 JAN 2017 Akbarpur Bhawanigarh (Dhadrianwale) (Mera Baid Guru Govinda)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: " http://k003.kiwi6.com/hotlink/v298trdweg/10-1-17_Aakbar_Pur_Bhawanigarh_Mera_Baid_Guru_Govinda.mp3?_=16",
      },
      {
        title: "9 JAN 2017 Akbarpur Bhawanigarh (Dhadrianwale) (Sabh Kich Ghar Main Bahar Nahi)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "http://k003.kiwi6.com/hotlink/rqsnyg0sdf/9-1-17_Aakbar_Pur_Bhawanigarh_Sabh_Kish_Ghar_Meh_Bahar_Nahi.mp3?_=17",
      },
      {
        title: "7 JAN 2017 G.Parmeshar Dwar Sahib (Dhadrianwale) (Nelle De Shah Aswara)",
        album: "ਢੱਡਰੀਆਂ ਵਾਲੇ",
        url: "https://k003.kiwi6.com/hotlink/4ba3hg61n5/7-1-17_Gurudwara_Parmeshar_Dwar_Sahib_Neelae_De_Shah_Aswara_1.mp3?_=18",
      },
    ]
  },
]
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class AudioClass extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => {
      navigation.navigate('LoginPage', { index: 1 })
    }}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

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

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }
              
  _keyExtractor = (itemData, index) => index;
            
  _renderItem = (itemData) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={{elevation:10}} activeOpacity={0.5} onPress={() => {
        navigate('AudioList') 
        //{ item: itemData.item })
      }} >                    
        <View style={styles.container}>
          <Image source={{ uri: 'https://lh3.googleusercontent.com/-S-38rhqUoM8/Wdtp8-dRjUI/AAAAAAAAAHI/tE3OQa3r8wwYDQ42KVr6kd8Js-CrzLXdgCK8BGAs/s512/2017-10-09.jpg' }} style={{ marginTop: 20, resizeMode: 'stretch', height: height / 2 - 150, width: width - 150, borderRadius: 10, }}></Image>
          <Text style={styles.artistName}>Shabad List</Text>
          {/* <Text style={styles.artistSongs}>{demoArray.length} songs</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: 'rgba(33,37,101,0.7)',
            height: height,
            width: width,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <FlatList
            data={demoArray}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#191565',
    height: height / 2 - 75,
    width: width - 50,
    marginTop: 25,
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
