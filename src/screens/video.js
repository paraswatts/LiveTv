import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  NetInfo,
  ToastAndroid
} from 'react-native';
import YouTube from 'react-native-youtube'
const show_first = [
  {
    img: 'https://lh3.googleusercontent.com/-B3keoeL9Qak/WdtIzJwH60I/AAAAAAAAAFg/9BIRiWnGV0c76BJehDv9UN92tiLfEoLIQCL0BGAYYCw/h360/first.jpg',
    title: 'ਮਰਦੇ ਮਾਵਾਂ ਦੇ ਪੁੱਤ ਮਰ ਲੈਣਦੇ,ਆਪਾਂ ਜਥੇਦਾਰ ਠੀਕ ਹਾਂ | Appa Jathedar Theek Haan | Poetry | Dhadrianwale',
    id: 'rpgdDRefarM'
  },
  {
    img: 'https://lh3.googleusercontent.com/-mmAXzYxnie4/WdtI205KJRI/AAAAAAAAADU/unz9ZPkKK6E4eKyYfBXa1o9bsLI6L3ldACK8BGAs/s480/two.jpg',
    title: 'ਦੱਸੋ ਕਰਨੈਲ ਸਿੰਘ ਪੀਰ ਮੁਹੰਮਦ, ਮੇਰੀ ਪੂਰੀ ਵੀਡੀਉ ਕਿਉਂ ਨਹੀਂ ਸੁਣੀ” 7.10.2017 | Dhadrianwale',
    id: 'LZI5s0YiC44'
  },
  {
    img: 'https://lh3.googleusercontent.com/-VBkxfIXFJCo/WdtJAoVUD8I/AAAAAAAAADg/OeNTi5Tuua8f8Zl5DSlOCmhzI0W9geM9ACK8BGAs/s480/three.jpg',
    title: 'ਹੈੱਡ ਗ੍ਰੰਥੀ ਜਗਤਾਰ ਸਿੰਘ ਨੂੰ ਜਥੇਦਾਰੀ ਦੀਆਂ ਵਧਾਈਆਂ ਸਿਰਫ ਦੋ ਸਾਲ ਪ੍ਰਚਾਰ ਕਰਾਂਗਾ ਬੋਝ ਲੈ ਕੇ ਨਹੀਂ ਜੀ ਸਕਦਾ',
    id: 'BV7KEfVhbF8'
  },
  {
    img: 'https://lh3.googleusercontent.com/-S7iSgTzxp7A/WdtJEmUqnDI/AAAAAAAAAFg/Yo3hN8mm0xob5VG4AbnogDR5LtD-JIPTwCL0BGAYYCw/h360/four.jpg',
    title: 'PARMESHAR DWARS OCTOBER MONTHLY DIWAN | 7.10.2017 | Promo | Dhadrianwale',
    id: 'OoNPt2FLodc'
  },
  {
    img: 'https://lh3.googleusercontent.com/-SHU5tFy0lWk/WdtJJ16UwgI/AAAAAAAAAD4/DVWdHmhyJDIUyDigVcZ_cGMuGu9kJkgYACK8BGAs/s480/five.jpg',
    title: 'GEORGIA DIWAN | USA | 30 Sep 2017 | Full Diwan | Bhai Ranjit Singh Khalsa Dhadrianwale',
    id: '9CdjEhDo1Bs'
  },
  {
    img: 'https://lh3.googleusercontent.com/-PzS4368xP1M/WdtJQ0BqpDI/AAAAAAAAAEE/VkQSqM2jGxAd09uqIt-3A8CFo_vVk6yEgCK8BGAs/s480/six.jpg',
    title: 'ਜਾਗ ਲੇਹੁ ਰੇ ਮਨਾ ਜਾਗ ਲੇਹੁ ਕਹਾ ਗਾਫਲ ਸੋਇਆ | Shabad | USA Tour 2017 | Dhadrianwale',
    id: 'g190LuKtsfU'
  },
  {
    img: 'https://lh3.googleusercontent.com/-kYxE9nUKENU/WdtJUxFeV4I/AAAAAAAAAEQ/QLwaGOIGmtEJHTb8afgtrOVMO9qjeQvsgCK8BGAs/s480/seven.jpg',
    title: 'ਇਸੁ ਮਨ ਕਉ ਕੋਈ ਖੋਜਹੁ ਭਾਈ | Es Man Kau Koi Khojeh Bhai | Part 1/2 | 6.9.2017 Rajpura | Dhadrianwale',
    id: 'g190LuKtsfU'
  },
  {
    img: 'https://lh3.googleusercontent.com/-m8zwGP-LU5s/WdtJZnqafiI/AAAAAAAAAEc/KbXgCjvTp5sa-9e5oDKPWvx9zjh3zlv9wCK8BGAs/s480/eight.jpg',
    title: 'ਇਸੁ ਮਨ ਕਉ ਕੋਈ ਖੋਜਹੁ ਭਾਈ | Es Man Kau Koi Khojeh Bhai | Part 2/2 | 6.9.2017 Rajpura | Dhadrianwale',
    id: 'F0FIEB8VYz0'
  },
  {
    img: 'https://lh3.googleusercontent.com/-jUQCK4p81gY/WdtJfNcJYXI/AAAAAAAAAEo/KUBVJPfzjgwAwM7wszwrxjzu959CGZvHACK8BGAs/s480/nine.jpg',
    title: 'ਇਕ ਘੜੀ ਨ ਮਿਲਤੇ ਤਾ ਕਲਿਜੁਗੁ ਹੋਤਾ | Ek Ghari Na Miltey | Shabad | USA Tour 2017 | Dhadrianwale',
    id: 'RkabxoT684'
  },
  {
    img: 'https://lh3.googleusercontent.com/-XMR5TeJ66_Y/WdtJiZqRX3I/AAAAAAAAAE0/QO803LjTlFAOheIQtdi59gf9Nxwc07vRACK8BGAs/s480/ten.jpg',
    title: 'Waheguru Simran ● 2017 ● Meditation ● Bhai Sahib Bhai Ranjit Singh Ji Khalsa ● Dhadrianwale',
    id: 'RpEumsSpqsM'
  },
  {
    img: 'https://lh3.googleusercontent.com/-fTcSY7ZO59M/WdtJlodXHPI/AAAAAAAAAFA/xsyvfbv76CkkykyTv_u-tvRJ1r7gveieQCK8BGAs/s480/eleven.jpg',
    title: 'ਬਾਬਾ ਜਰਨੈਲ ਸਿੰਘ ਜੀ, ਸਤਿਕਾਰ ਉਹਨਾਂ ਦੀ ਕੁਰਬਾਨੀ ਕਰ ਕੇ ਹੈ, ਉਹਨਾਂ ਦੀ "ਸ਼ਹੀਦੀ" ਨਾਂ ਰੋਲੋ | 24.9.2017',
    id: 'Fpei5-4yyqQ'
  },
  {
    img: 'https://lh3.googleusercontent.com/-3It2bwb1L6M/WdtWM3MgGgI/AAAAAAAAAG4/318aKVXKAEwUUQ8MaIfPKA2TrsPifPDeACK8BGAs/s480/twelve.jpg',
    title: 'LYNDEN DIWAN | 22 Sep 2017 | Full Diwan | Bhai Ranjit Singh Khalsa Dhadrianwale',
    id: 'Y5JBFZGDPS4'
  }
]
import Icon from 'react-native-vector-icons/MaterialIcons';
var { height, width } = Dimensions.get('window');

export default class VideoClass extends Component {

  static navigationOptions = ({ navigation }) => ({

    headerLeft: (<TouchableOpacity onPress={() => navigation.navigate('LoginPage')}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });
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
  _renderItem = (itemData) => {
    console.log("Image==============" + itemData.item.img)
    const { navigate } = this.props.navigation;
    var image = itemData.item.img;

    return (
      <View >
        <TouchableOpacity style={{ flexDirection: "row", width: width, marginBottom: 10 }} activeOpacity={.5} onPress={() => {
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

          NetInfo.isConnected.fetch().then(isConnected => { 
      if(isConnected)
      {
        navigate("VideoPlay", { videoid: itemData.item.id })
      }
      else{
        ToastAndroid.show('Oops no internet connection !', ToastAndroid.SHORT);      }
     }); 
         
        }}>
          <Image style={{ height: 100, width: 150 }} source={{ uri: image }}></Image>
          <Text style={{ flexWrap: 'wrap', flex: 1, marginRight: 20, marginLeft: 10, fontSize: 18 }}>{itemData.item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _keyExtractor = (itemData, index) => index;

  render() {
    return (
      <View style={{ backgroundColor: '#A0A6A2', padding: 10 }}>
        <FlatList
          data={show_first}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
