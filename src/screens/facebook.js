import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  WebView,
  NetInfo,
  BackHandler,
  RefreshControl
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  CustomTabs,
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE
} from 'react-native-custom-tabs';
import Orientation from 'react-native-orientation-locker';
import { Menu, MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Share, { ShareSheet, Button } from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
var { height, width } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});
var Spinner = require('react-native-spinkit');

export default class FacebookPage extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => navigation.navigate('LoginPage', { index: 1 })}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.getCoverPicture();
        this.getFbLink();
      }
      else {
        Toast.show('Oops no internet connection !', Toast.SHORT);
      }
    });
    if (Platform.OS == "android") {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
  }

  handleBackButton = () => {
    const { navigate } = this.props.navigation;
    navigate('LoginPage', { index: 1 })
    return true;
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

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      Category: null,
      ProfilePicture: null,
      CoverPicture: null,
      UserName: null,
      PageName: null,
      City: null,
      Country: null,
      About: null,
      Website: null,
      Email: null,
      FBLink: null,
      TotalLikes: null,
      isLoading: true,
      refreshing: false
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }
  //177526890164
  //318363321543421
  getData() {
    // https://graph.facebook.com/v2.10/318363321543421/?fields=posts{created_time,attachments,message,likes.limit(1).summary(total_count)}&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=posts{created_time,attachments,message,likes.limit(1).summary(total_count),comments.limit(1).summary(true),shares.limit(1).summary(true)}&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson.posts.data, isLoading: false, refreshing: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false, refreshing: false });
        console.error(error);
      });
  }

  getCategory() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=category&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Category: responseJson.category });
        this.getPageLocation();
      })
      .catch((error) => {
        this.getPageLocation();
      });
  }

  getWebSiteLink() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=website&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Website: responseJson.website });
        this.getPageEmail();
      })
      .catch((error) => {
        console.error(error);
        this.getPageEmail();
      });
  }

  getFbLink() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=link&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ FBLink: responseJson.link });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAboutPage() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=about&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ About: responseJson.about });
        this.getWebSiteLink();
      })
      .catch((error) => {
        console.error(error);
        this.getWebSiteLink();
      });
  }

  getTotalLikes() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=fan_count&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ TotalLikes: responseJson.fan_count });
        this.getData();
      })
      .catch((error) => {
        console.error(error);
        this.getData();
      });
  }

  getPageName() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421?access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ PageName: responseJson.name });
        this.getPageUsername();
      })
      .catch((error) => {
        console.error(error);
        this.getPageUsername();
      });
  }

  getCoverPicture() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=cover&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ CoverPicture: responseJson.cover.source });
        this.getProfilePicture();
      })
      .catch((error) => {
        console.error(error);
        this.getProfilePicture();
      });
  }

  getProfilePicture() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=picture.type(large)&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ ProfilePicture: responseJson.picture.data.url });
        this.getPageName();
      })
      .catch((error) => {
        console.error(error);
        this.getPageName();
      });
  }

  getPageUsername() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=username&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ UserName: responseJson.username });
        this.getCategory();
      })
      .catch((error) => {
        console.error(error);
        this.getCategory();
      });
  }

  getPageLocation() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=location&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ City: responseJson.location.city, Country: responseJson.location.country });
        this.getAboutPage();
      })
      .catch((error) => {
        console.error(error);
        this.getAboutPage();
      });
  }

  getPageEmail() {
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=emails&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Email: responseJson.emails });
        this.getTotalLikes();
      })
      .catch((error) => {
        console.error(error);
        this.getTotalLikes();
      });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getCoverPicture();
  }

  _renderItem = (itemData) => {
    try {
      var likes;
      if (itemData.item.likes.summary.total_count >= 1000) {
        likes = (itemData.item.likes.summary.total_count / 1000).toFixed(1) + "K"
      }
      else {
        likes = itemData.item.likes.summary.total_count
      }
      var comments;
      if (itemData.item.comments.summary.total_count >= 1000) {
        comments = (itemData.item.comments.summary.total_count / 1000).toFixed(1) + "K"
      }
      else {
        comments = itemData.item.comments.summary.total_count
      }
      var shares;
      if (itemData.item.shares.count >= 1000) {
        shares = (itemData.item.shares.count / 1000).toFixed(1) + "K"
      }
      else {
        shares = itemData.item.shares.count
      }
      var createdTime = moment(itemData.item.created_time).fromNow();
      console.log("created time", createdTime);
      if (itemData.item.attachments.data[0].subattachments) {
        let shareOptions = {
          title: "",
          message: "Please like this page",
          url: itemData.item.attachments.data[0].url,
          subject: "Share Link" //  for email
        };
        return (
          <MenuContext style={{ flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: this.state.ProfilePicture }} />
                <View style={{ flexDirection: 'column', flex: 1, flexWrap: 'wrap' }}>                         
                  <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>{this.state.PageName}</Text>
                  <Text style={{ marginLeft: 10 }}>{createdTime}</Text>
                </View>
                <Menu>
                  <MenuTrigger >
                    <Image style={{ height: 24, width: 24 }} source={{uri:'https://lh3.googleusercontent.com/-5ZWPkn_QK-U/WgvtYzHubyI/AAAAAAAAAP0/HtFFy6HVw0MZAzSTuEu3e4i8cn5_LLangCK8BGAs/s32/2017-11-14.png'}} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => Share.open(shareOptions)} text='Share' />
                  </MenuOptions>
                </Menu>
              </View>
              <View>
                <Text style={{ flex: 1, flexWrap: 'wrap', margin: 10 }}>{itemData.item.message}</Text>
              </View>
              <FlatList
                horizontal
                data={itemData.item.attachments.data[0].subattachments.data}
                renderItem={(itemDataInner) => {
                  var widthFb = itemDataInner.item.media.image.width
                  var heightFb = itemDataInner.item.media.image.height
                  var difference
                  difference = heightFb / widthFb
                  return (
                    <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => {
                      Linking.canOpenURL(itemDataInner.item.url).then(supported => {
                        if (supported) {
                          Linking.openURL(itemDataInner.item.url);
                        } else {
                          console.log('Don\'t know how to open URI: ' + this.props.url);
                        }
                      });
                    }}>
                      <Image style={{ width: width - 20, height: (width - 20) * difference, resizeMode: 'stretch' }} source={{ uri: itemDataInner.item.media.image.src }} />
                      <View
                        style={{
                          width: 10,
                          height: width,
                          backgroundColor: 'rgba(0,0,0,0.0)'
                        }} />
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={this._keyExtractorInner}
              />
              <View style={{ marginTop: 3, width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
              <View style={{ flexDirection: 'row', margin: 20, flex: 1, justifyContent: 'space-between' }}>
                <Text>{likes} people like this</Text>
                <Text> {comments} comments</Text>
                <Text>{shares} shares</Text>
              </View>
              <View style={{ marginTop: 3, width: width, height: 20, backgroundColor: '#d1d1d1' }} />
            </View>
          </MenuContext>
        )
      }
      if (itemData.item.attachments.data[0].media) {
        let shareOptions = {
          title: "",
          message: itemData.item.message,
          url: itemData.item.attachments.data[0].url,
          subject: "Share Link" //  for email
        };
        var widthFb = itemData.item.attachments.data[0].media.image.width
        var heightFb = itemData.item.attachments.data[0].media.image.height
        var difference
        difference = heightFb / widthFb
        return (
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: this.state.ProfilePicture }} />
              <View style={{ flexDirection: 'column', flex: 1, flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>{this.state.PageName}</Text>
                <Text style={{ marginLeft: 10 }}>{createdTime}</Text>
              </View>
              <Menu style={{ padding: 10, borderRadius: 5 }}>
                <MenuTrigger >
                  <Image style={{ height: 24, width: 24 }} 
                  source={{uri:'https://lh3.googleusercontent.com/-5ZWPkn_QK-U/WgvtYzHubyI/AAAAAAAAAP0/HtFFy6HVw0MZAzSTuEu3e4i8cn5_LLangCK8BGAs/s32/2017-11-14.png'}} />
                </MenuTrigger>
                <MenuOptions style={{ padding: 10, borderRadius: 5 }}>
                  <MenuOption onSelect={() => Share.open(shareOptions)} text='Share' />
                </MenuOptions>
              </Menu>
            </View>
            <Text style={{ flex: 1, flexWrap: 'wrap', margin: 10 }}>{itemData.item.message}</Text>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
              Linking.canOpenURL(itemData.item.attachments.data[0].url).then(supported => {
                if (supported) {
                  Linking.openURL(itemData.item.attachments.data[0].url);
                } else {
                  console.log('Don\'t know how to open URI: ' + this.props.url);
                }
              });
            }
            }>
              <Image style={{ width: (width - 20), resizeMode: 'stretch', height: (width - 20) * difference }} source={{ uri: itemData.item.attachments.data[0].media.image.src }} />
            </TouchableOpacity>
            <View style={{ marginTop: 3, width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
            <View style={{ flexDirection: 'row', margin: 20, flex: 1, justifyContent: 'space-between' }}>
              <Text>{likes} people like this</Text>
              <Text> {comments} comments</Text>
              <Text>{shares} shares</Text>
            </View>
            <View style={{ marginTop: 3, width: width, height: 20, backgroundColor: '#d1d1d1' }} />
          </View>
        )
      }
    }
    catch (error) {
      Toast.show('error fetching data', Toast.LONG);
    }
  }
  openCustomizedCustomTabs(link) {
    console.log("passed link" + link)
    this.openGoogle({
      toolbarColor: '#191565',
      enableUrlBarHiding: true,
      showPageTitle: true,
      enableDefaultShare: true,
      animations: ANIMATIONS_FADE
    }, link);
  }

  openGoogle(option, link) {
    CustomTabs.openURL(link, option).then((launched: boolean) => {
      console.log(`Launched custom tabs: ${launched}`);
    }).catch(err => {
      Linking.canOpenURL(link).then(supported => {
        if (supported) {
          Linking.openURL(ink);
        } else {
        }
      });
    });
  }

  _keyExtractor = (itemData, index) => index;

  _keyExtractorInner = (itemDataInner, indexInner) => indexInner;

  render() {
    console.log("FB link to share" + this.state.FBLink)
    let shareOptions = {
      title: "",
      message: "Please like this page",
      url: this.state.FBLink,
      subject: "Share Link" //  for email
    };
    try {
      if (this.state.isLoading) {
        return (
          <View style={{ backgroundColor: 'rgba(33,37,101,0.7)', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Spinner
              type='Wave' color='rgba(33,37,101,1)}' />
          </View>
        )
      }
      else {
        return (
          <MenuContext style={{ flex: 1 }}>
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />} style={{ flex: 1 }}>
              <View style={{ backgroundColor: '#FFF' }}>
                <Image style={{ width: width, height: 200, resizeMode: 'stretch' }} source={{ uri: this.state.CoverPicture }} />
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <Image style={{ width: 75, height: 75 }} source={{ uri: this.state.ProfilePicture }} />
                  <View style={{ flexDirection: 'column', marginLeft: 20, flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#000', flexWrap: 'wrap' }}>{this.state.PageName}</Text>
                    <Text style={{ fontSize: 15, color: '#77797a' }}>{'@' + this.state.UserName}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                  <TouchableOpacity onPress={() => {
                    this.openCustomizedCustomTabs(this.state.Website)
                  }} style={{ backgroundColor: '#0084FF', padding: 10, width: width / 2 - 12.5, borderRadius: 5 }}>
                    <Text style={{ color: '#FFF', textAlign: 'center' }}>WATCH VIDEO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    Linking.canOpenURL('fb://messaging/' + '318363321543421').then(supported => {
                      if (supported) {
                        Linking.openURL('fb://messaging/' + '318363321543421');
                      } else {
                        Toast.show('Facebook messenger not installed !', Toast.SHORT);
                      }
                    });
                  }} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#0084FF', marginLeft: 5, padding: 9, width: width / 2 - 12.5, borderRadius: 5 }}>
                    <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXgAAAF4CAYAAABeneKmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAABAAElEQVR4AexdB2Acxdmdq9KpS5Ys90qzgdAJhGZDAqElhMQOCSEJnVADIT35fU6FkEBCqgmEJCSB2LTQqy16Mx2DjbEt2+q9l9Pd7f/e7I20Op10d9KddNLN2LrdnZ22b2befvvNNzM2oZ1GIBkIGIbNu1rYxCozcZwLnBv9WdlsA+f9nkJsFIe4Hrr97mldRTn57ZmunN5su6crw+Psc4mM7F7/XHfAWCyCwTmIUiRstoKgzZ4XtIncgN3mMew2V5B/wuY0HHZHUAg7kzZsNgF/h8rGbhhB5B5EaWy4a9iDRsBhGH57MNhnM4w+W9DoReQOuwi2iaDRgkDNSKLGZ7dv7/R4ttv9/k5Prz/g6ens8XT2dWY1dLbtvWFb01fvOKlT5THkCDykHzDxhjARwGQVMLENg8WQNLSHRiBOBMxGF2ckHVwjEI6AAQJbuW6dvb5kha2kXhjrVtoC4WGs19et2ZbfPC93/y6Xc35Phru00+3K82U68919wYUOIzgH6ZUG7fbCoMORbWSCat1C+PBK8CHVPjB3IPQXhJ/64+vDwB+dPIbOTZ9hftEDZCfgkSehazteDQ6cO3C04+jEMQOvCBeOTj+C9eLP19eLl0ILCLoO9F3V53TuwHV9dmdvZ2ZPX727z1eR39T2vvcre1YMk7vpjXfMsjJhJ277vr/a8Hq9eDrtNAJjR4BNWjuNQJwIgM5Anl5w3Cb81ZcJW9lyG2hvwOG2/erbd+RVLi52ZRqiOC/gPzLgcB7Q63LM7/a4p/XZ7dNswWApiLjAlgkazQBxg0A7+oToQkrd+PPhrw9/IHCDf7glevAi6QUL+3DOP8nhlI5DAvJACUZzxtRCDC+fEIQOH7xbUDxDZELS5jmJ32bHZwL+3E4hPKG/bATOZAogf6Mb3xFBo91w2uvwWPWZ3b7mTJ+v0hUwNvU4xItNjrzyBZUV/iNXvtSxUqzko/S7FWsNR32JsC1bJoJePqLspZG/ePoj6RONQAQENMFHAEV7DUaA0vlqyXyS1EE4Q8lmzSEPZn3wg0P2aS7OK+7NyZzl6e09BuEO6nW75va4nHl9NuEOgumCkIADaHXgP9EMWmsDa3dAXdIZEEFK5vjPNmmTvyFqkxQns4zcXJGkdOquPKqL0L1oh37JPxSQVI93Cn6tCcnXSShECIPQiyAU2KCE77ELe64NfyD+QrwRcnB0IKodD2fHF4gTKqHMQLAj0+evdgQD7/vcrmeEP/jRtObW5oL3arZ5v31AXSiTQQcvJP1N64RNS/mDYNEXIyBgbb0jBNO30g0BqXIBH/G519mGqlsuumijK+czs4/uzPEc0ZqbMxt0uMQeDOwfzMgo8eUI0Q7JuwvkTQmcapUW/NVD690ZBIeD6EKO7W+AzC2t0bwxmF4ZxyTeUOzQwUq7g++M/spSFJmIulZHeqqyDMpfXvAHLwCSv3xz4BxIgvxt00H8hXjRefDnpOQPqT+Xkj+kfntHXwe+DD4IOBzvZHd0VeV2dL3taexZf93Z85tlIaw/IHtvGVJ9BlK+1zaAqDWMPk97BKztNe3BSGsAIKWTlqhHFytWDCL1R8TNGY88cf601iwxyxPwn9qX4T6qw5MxJ2CIWYbTlm9kCdEKIm/olioWo8cvgq1IrMsqgZvgSjU3ddp0kgvN00Hn4fdCQVL6YO1Ikc45TiC/CPj1wwdXKiAELsKtTKewZTmFvciDa0j9LnzdGD3BHrwTqrJ9vmpPT98bfTbbA0bQvuWgDe+0Xuk9ok0BQpUOz/d9XxgYwOUXFi+t8PJauzREwNoW0/Dx0/uRvV588i8VtnUrIFOHqV1++cvnCisPXHp4Q1HuwgwjeDzUKkd3Zbpn9rhsAuoWqf9ugNRZ6RMGpHMoWKQkzvZE6pLtijzDTwBeUMRUjKOO8EorZ4IT+izCk+OjxsREAqJ+II0DQUj49tkuYS/F2ARUPsKJ25kAMavb3+ru87/e63I+nt3evaW4uubd687ea3s4kCT9fVeA8G1aug/HJp2uZUdMpwfWz2rYVqwF764Yqnq5/H+7ZhmerM+1FuQe4nPa9wUDHRwscjqbwEStkM57IFVSzVJHA0PTyFBxlmxHisyJsdIZpCuZx9rOrAASK4VbyBwIXpLwRR70+jMhzmdBnZODkdxpIP4MyPCGv28LBn3fzG/tft/T3X3/TafOeHdQ3iELnbJlqM2wl/igcPpiSiKgCX5KVmvYQ0H9Qpt0Ka1bzBe9N24q2nbQvFkuh1huOB2fb8vM2Btq8xki1y6aQeqVsOpu84lAG2jGB6KQsjhaDP+TzElI/FPOeq789DF+BFSn5JF/xDWodPn0g4RfiL9sqHRmZkGvD7J3dOHLIGg05fT6dsJi57FOu/P+0prdlTet3LsSUaRTUv0qJGlqcaRWTt3WxymIgGpLU/DR0v2RTEk9kvrl6odqP1k3reBgu804rc/lOKoj22nvgujYCT16BdUufZD2TLY2hXK0Ep7wjxJmv5SZ7hCP4/OzoxJ/Oqp2ZP1QGYbRcDB+sNApHAvdwpYHCZ8DuDmox8zu3s1+u+0+SPevz3jhzae93uUtjKrcCsNwrEV16olWCpGpd9QEP9XqlNJ6mXB4LXbp3mVeZ8MPr1zSm+H8emtO1qEwKj8EjJBdA5VLM6V0vzAqOPRnMjfbBPq8KT0SHnK9yfe80m6iEZAVFCqEpW5Yg3L0o9hm2IodNlsuBmxnZsOOH59jNrvtzeyunrdzunrusn3QVPb7K/fEK8B0yzYYzmXaGkfBMaWOmuCnQHUOslO3DKpduL5x3z535jGYtv+19kz3fn1ue043TPN2g9Sre6h64ewgfvBztrxN0BSDHG8hjSmAztR/BNWJKeGz7mixw4FaXmZhlYZip3AuyBUiDx6OXsOX6+vb4fb51/qD/oc+ftcb71/2p+UduCU46C5W4WQ1z/XgLDGZ7E61jcn+HGlZfmkFswpWMBY7da/3zYLqZYs/1+7J+CTm2J/eme/KbYFiHbp0saVXGJglatq70DIbtU9Sl0wQOqYlkFPsoUn07Nj9qpwQ77Oyl7iFgwO0eTDFzMVkBUcw+ERGV++TpbWt91+3cu5H/VBgzGUFJlVFW3KiP7w+SUkENMGnZLWMXKhwYvcKr7Pmyav292c4L2rNyTwm6HDu24FP8wpYWTT3imCVYnD0e3T+/jof8B45P313ciLAiu6vbJxLyZ5kD+m+GA2hCIO0syDWT8Nnm607uCu7p/fVrM6ev2c2d66/aeVc2E3BSaJfB6JfKd8X0k//TBoErPU/aQqdjgVVahiv7KCm9YP3ts2zyveafZThdJ3XkeE8vjvT4ca0f7EVH9zVfgHNuhTQpT6dUp1Sv6QjfvqZTbJnO+CLvV+Ng5GXPEyy2idb2KdBfefGYj/5vb53saTCmtz65rLfnzHz/X7sQPZcFVSrb/oRSfkTTfApXkVqyQCrGuab91YtaZ2ef06P23W6P9e1Xz2eoRFmch9i0lEvpxzR4AILALAzs4I1sQME7QYhoNqGqcYh5aOZYIrxXphcVYLBWZpeZrT4a5w+30NFbd133Xxy8dMqAWluyVmzWk+vIEnZoyb4VK0aDHxiLpJdEfsasca18fEvHNaX7bm03eP+VCDLMb0GzF3RLoKVWDOA46SQzWwwntA69VSt0xQslyKA/i880xLHKLULY4ZHOOZhGQpXe7Azu8/3SmZ715+Ktrc8df3Fi1v5KNrMMgUrNKxIqn7DvPXlRCHgDX0Gi5B0dPuC2zOf+dsZpwQzM8/rzHCd0uFx2BoxaPpOpwj4KJqb46TCiZqkNKZWRZR39I9GIA4EKCJIoodAL2V6KdWL4NIM4ZwFqT4XDQxr3b/l9AfWTN+y+4Ffnb9PlUyewgjWMNJ6+jjAHqegmuDHCeho2Xi9XvumVav6LWK83o1Z1ccs+irs1r/sz8g4phHT02swaLoZVjCG/K7GB7XqkEg81CGjZaPvawSiIkBS4B/blDmBFuobfBgudgjHdKwUOhO6eld73wdZPb33FFbU3nLjl/bYLRPVRC9hSKUfTfATXRvoFMvKyhxly5djHqkQ3/v3zsLG2YVf6MzMuKIz071/O3ShH7UJY1dfSLcOGwhuOKH16hNdcemRPwmCUj2JHlsjSs4vcQhjj1zhKMHNzC5/VU53z9+zWjpv/cNnZuwgKlTd7Lta70xFLCbaaYKfoBqgxO7FhpycZs4icF2YHYfM+1Ig03VJR07Gfo3oStthDSOXDcAa4ggiNxXVxD5BFaazlSZZ8uORNA+NIDYysS3NwqAsbOrz2rFFoa/v1oLGrn/87rMlW2QICC9etFuvZfKd9Nc/44aAJvhxg3ogI0o4avD0xhtf9Hxw0NKvdWRlfaM31/WxKjD47g4MnFKeh7QOwwZZR+xTZr8aSEefaQTGGwE2RkUacgE0kHcRJlDNyxT2eZh7kdnqr87p6f1nfnXl79VCZ7K986NTr2Y53tXVX1fjnnH6ZQhpBoTtlbRtM7zLbs+s+PGZn+vOzvxWh8d9SCM6yWZYxDTAIgbGMHa1KYYU79MPLP3EkwABEj0/Ldlk0WiNTIctsG+2cFJHn9Ppq8jq7v1jbmXD7b/78qJahqB5ZaTF73hPu+QgoF7GyUldpyoRkA3bskzvxY/Xn96Rl3tVd07GCXWogR3tUMX4pRGMg69ccL05zVzjpxGYBAiQ5OlCM2WDuWjFmDhlm4nxo+xW3xZPV8/v5y2/6TbMuO5huPD+QD/tkoOAJvjk4GqmSqsCiy37RQ/WH9w9LfuH7e6Mz7Rm251bW0WwAiaPcNSvy+mpWhVjQqd/Jx8CJBMp0ZvaRGMabOn3yBOOmWjUni7fKzlt7df/9cTi++STUT+PPQr0ZKnk1rMm+GTgS2Jfh0lKIan9in9tndM+b+a3OrIyLmzLcmZz8PSjXgjpWEqApo6sBK2KSUZF6DQnAoF+oqe0YhOBUqx5syRX2PJ9hsjv7vlfRmPrz//6mZmvsWyU5tdiy0ispyEVPRNR3qmcpyb4BNfuirVrHWrCxxpxkevl9Td8A3r2q9vz3Qt2gtjf6wGXB7FML1o0pR1N7AmuAJ1cyiDA9h36IuUhuNiFTUnyhSjs8HdCP//Xwp0Nv/rtOQuqWWCttiEKiXea4BOGKaR2LMGrrGMufrThhI7CnNVYtveoGuTxbrsIdAfltne0jFENP2G564Q0AqmKgEVHz5Usg0uxBMIiLIGQ3dG3Pa+964bZJxTc4qWsI2dxr8ZiZl4t9ySoMjXBJwBILxtmyNb3mjs/mts0Z+b3sL/pRU0eh3MzZp/WhAZQ9QSlBICtk5i0CFiMB4JusP5BOdhTFgyU09nzaHZD20/XnF76Eh9OSvNQ22izyrFXtSb4MWDYv4RviNzP39ByQUeW5wdQxyzE7FPxIXZNQvI0eZQ4a7FkDGDrqFMCAXYE/imLm1kuWNwUCFtRu78zp7v7DzM2vX39dZce08yHtQpOvNYufgQ0wcePmYxh1Rle9kD1vi3T8n7emZ312Sog+ma78PcF5AAqx1C1nn2UGOtoUxcB9guqbiABUW0TgNrGSbVNblvv29ltXT+49cSiR/j01kmBvNYuPgQ0wceHF9SEhm01hBCqZLAjvePR9a2Xgdj/rynXOW0z9qyH2SOldgfVMXJad5zp6+AagXRCoF9tg41HsPSBOCBP2Kf3BIzcru4/T9+5ffWvv3pAHfHQ0vzoWoUm+Dhws0rt37h798faZhbd0JGXdWI59jt9G8v3Qhaxg9ilvZdWx8QBrA6a1giQhKQ0zxXNsL/wYuwbuzesbXJbfR8UNLf/aM3JxfcSIGv/S2vA4nh4TfAxgYUVHzeUyRUf0QTt5z3dcnFHTvZPG7Od0za1CqOWm+PBX0vtMYGpA2kEIiJAkmdHAs8bLrsIHopJUqW9fpHX3fO7ks1bfvabiw9toCS/CkG03XxECId4aoIfAslgD+un4SV37ljQOXf6b9tysz5bDv3L2x1SC2NHw+yfhTo4tr7SCGgE4kVAqm3I9NByLsoQjn0gzee39L6T1dJyzW0nz3iaN7Q0TxSiO03wI2BkbUQXPNX4xfacnOub8tzz32sRwWpziQG5KJhWx4wAor41+REg2Y4zUzC7kNrG8NhtwYPzIc33+H15XV0/W/D1e2/wlp/bExqAZfczXweTH+mEP8E4V1vCy5+cBC1LDVx77ePZdacd8cu2rOwrKt0O8VqboELGwbVjdMtKDvw6VY2AQsAqze+TJRx7YOvAgtauJ/Mamy7902fnfgR9jl7TRoEV4agJPgwUrxeTlkL7oV56z67DmmeW/La1IPMT0LWLnVw/BhYynImqpfYw4PSlRiBJCPTr5tHtCmFpc2CBsBe3+6oLWtuu+etJJXcxW+vXdpKKMSmT1QRvqTZrIznv8cbz2/Jzf1Wb7Sp6rUUEegLmhCV+C+rvQQto+lQjME4IhEwqpd38wbnCOdcXEAVdnb9duPyC73rFOp+1/45TkVI+G03woSpatmGDk/uier2P5G0//pifteXkXLENYvq7pvmjtmtP+aasC5gOCFCal1/PhggswADsvrkYgG3tfrqksuay361ctAUqGzsEMG1lE2oMmuChwwMWXN0xePndO/ZpmlH616YCz9HvYamBCp/BZUzl5kpaJZMO9KGfcTIgYHZYED1mHWY5bMHDC4Vjenvv7oLm1itvOaX0fj6DVdU6GZ4pWWVMa4K3mkCe93jTyR25WbdW52TMeh1WMl0BbMIB2iexa5VMspqfTlcjMHoEzAFY9E5MjjoYNvPzfX2B/K6u7//9+IIbmKpW2Yy78dPoKzPRMa2V//X1zde0Zudet9vtcG1s5YxUAyoZLJCR6Ex1ehoBjUBCEbCqbGBh41jK9Wxau/429+EN11533WnN6b6WTVpK8KrSb7x6reftz3z65oaC3Au29mL1x24RAK9zQqq2kkloN9SJaQSShwD7q7SZx1Y6093CdkC+sBW3dL1YVFlz7h/PWvxhSJhLy4/xdCN4GypbbqV30R3vz+ycP++OxsLsE96CCWSNTwQxJZUDNFolk7y+qFPWCCQNgZDNvJHhEMbhMKWc3dG7M7u57au3nTr92XQdfE0bgucqkPJhsffjxfduP6Blxqw763MzljzTLIKBkL5dq2SS1vd0whqBcUHAqpc/DLNf5/X6Ows62i+47ZNF0l7eOu42LgWa4Ez4ZTPlHbYAs8vFiUDuFzxYfUr9zNmP7MrOWLK+UfgDfsOORmELKNFdH81PGI2DxmEStgH2YzuN4jDb/LVmEdhsd2bX5eTeee7TLdeS6LjMN1U2U570Qg845SV46xv7wsdqLqwvmHbjTpcz501zyQGnnpWaLk1dP2c6IUBi4x92jgosxuDr3m4hpre2/X7B8fnXeIXwq3G4qY7JlJbgreR+7pNNP6wtnH7LBzaQOy1lhNDkPtVbt36+tEVAfXzAYsKxrUsE3+gSonpa3hXby9rvvHrFWs86mFZycuNUB2jKSvBWcv/ahrZfN+blfuvNHiEqewwMptr0YOpUb9n6+TQCIQRCennD47QZR2HwdXpL51OF7+w+64+XL2lUM9inKlhTkuCtNu5nr2+7pWVa7oWvYGZqQx8sZWzCrmelTtXmrJ9LIxAZAWkvj41EhEMEl2Pm64zW7ldzy8vPuOWcpdVTWV0z5QhekbtXCPeWZ7r+1lrkObsMljJdfQZmpuK7LHL9a1+NgEZgiiNgkjyUNw6b/9gi4ZzR1vteQcXuM245a89tijemGgRTSgevKunSFX/M2fxM552NhZ6zn2giuXPZAU3uU63x6ufRCMSDAL/cYU6HfaKE89kG4a/Mydivac7ch86/66P91q20Bcgf8aQ3GcJOGQlekfs3vfcVVC8/8Z+NRVmnwwwyGNQ27pOhHeoyagTGDYGQuoZmNv4jCoVzdpdve3Ft5Zlrzlz0tnXsbtwKlMSMpgTBq0q52ru2qOr40/9TX5h50voGrimDjbBp455EAHXSGgGNwORDwEryh4Hk53T27p5eU3fmmi/M26j4ZPI91dAST3oVDSV3Tl743vceKqxcfup/avNB7vVJJnfaYGmnEdAITFoEqK6htgYTopyvNQn/7qyMuXUzSu+++O5th06lyVCTWoJXapnvfndt/o6TT72rrijr02Vacp+0nU4XXCMw3ggoAoTM5j8Ekvz8bt+uaZVVn/3ryoVvKX4Z7zIlMj/1fIlMc1zSUp9R3tPXZL1/7VfuqivIOr2sMcmS+7g8mc5EI6ARGE8EFAn2k3xX7/bpFRWf/ctZe7w32U0o1bONJ55jzquf3DEbdUtZx7/rCrJXPt1kkjt0TnKTjjFnohPQCGgE0gYBRYSGIfyHwYRyXmfP5sIdO0+59av77JjMJD/pdPCK3NnytmzouLWhEOSORYXUgOrETWLSivmpxwbhdRp+ncpPHF7W8Ot4yh4tLu9HCzNSfrHEjSVMpDxii6dCgeidWKTMX5GduU/rgnn3c1nxybyswaQieLnPIgZUWY1ffrLlz40F2V97EqaQoPcUsJZRMkCkRqb9JicC4XUafp3KTxVe1vDreMoeLS7vRwszUn6xxI0lTKQ8Yo8nSR7BOfD6Cki+MtfzsdZ58+47/8YXi8qWL/dTJx8ph1T2mzQF5pK/Xu9ySe5fe7zpZw1FBdc83SYMbeeeys1Ll00jMPkQkK8EmFjvxg5vRQXuuVkFhQd9fuded//phoP6Vqxd63h/3Tol8Kf8w8X+epvQRzHM9yrKcN5j9d+qKSz+dVm3EJihGsRqcXZt5z6hlaMz1whMOQSo2oA0aeDDJHgc1q6Z19x21+kn5H9lJebBSk2Cd3IM9U0OgjcMrOFvC57/QNU5VUUlf3vNcDobukHu2GJPk/uU61v6gTQCKYGAJHlzgTLj+Dxhn9vc8tt/fKrwalk47BAHTkp5ST7ldfBS7wVyv/ie7cfWFhbfvMkOcu8RAU3uKdEHdCE0AlMWAeqDsfqsDWN84oUOLDWeW/DNc55s/GbogSkcp7yAnNIFVOZJF961ba/6WbMf35yRsWAzNuvgIv5acp+y/Uo/mEYgpRAA34hAUASnZwr7wXZ/cHpb8xf/ecr0uyfDRKiUleAleFgAkiPYzTNm/rsiC+SObfbwRtXknlLNXxdGIzC1EeA+rxzrq4PmYIvNaW/OLbjta/fsPEquQGmktmVNShI8BzEI3lrg2n3AfrdV53oO3Qhbd5thOFNe6TW127p+Oo1AWiJAjQE1Bzu6hH+b25XXMa3kn1f/+51FtJFPZfPJFDSTNGxlZebghefxpl9UFORf8FwLB7QFdtqbBKMaadn89UNrBKY+AhQuQZhSkvfkuaa5M3L2W9HlvvdPq5f3UigtK1udcvJnyungld79q4/Wfa0qp+jvz/odwqe32pv6vUc/oUZgEiAgCRPrGRgw/DiqEJY1bW1/vOv4/Mtl0VPQsialCF4NWpx3b/mRtcWzHn/b7sqt6NSDqpOg3esiagTSBgFlPulwCNvyXCFmNjVedcfJxTeLkDl3KgGRMjp4rjFDvfsVN2+Y01pYctt2F8gd+i5tMZNKzUWXRSOgEaC+GLxkC/hF8C1MuGzMyr3+ovt2nci5Oqmmj08JgjfwacNF9qHAstfvd+ivd+ZkLfmgDZI7Fv7R5pC6Q2kENAKphoAcdMVEy4ZeEdjscmfWFZbcfNWajfNSbW9XZyoABz0RVUXG2Y81fa86O+eLG1vkFGE735TaaQQ0AhqBVERAWdZsbxeBgmmZe7v22Pv3EFLPsEETQaE1FWxCJlwHr/TuF9y/+5TdhaX3vxR0udp6RRD27prgU7FV6zJpBDQC/QiECJTDq8ayfC5n0PCTOz5dsipV9PETqqJRevdL/vzi7Lr84t9scUpy50xVTe79TUifaAQ0AqmKAO0ipQYC6oaXOoWo9RR897wU0sdPHMGH9O6suKY997uJC+yX41NHD6qmalPW5dIIaAQiIRAadLX3+jDT1enMaMgv/iOFVurjKcRGijNefhOW+Yp1Qub91Ydrr6nLyl3xhta7j1ed63w0AhqBBCOg9PE7O4S/KsezR+ue+/6aWdB4BOqaCVOFT0jGSu9+/p1bD6qcOe/pF4W7sA3L/9oxKk1TGu00AhoBjcBkQ8AGNuUcKIiutmOzhJjfUnfxHaeV3qL4biKeZ9wleO7MJD9dvGtzmktm3FyeIcnd1Ltrcp+INqDz1AhoBBKAAMidagkuLxzY5BeiIbvgF5eu/fDAiTSdHH+CX7VKQvnhESd8pyYn52gu/6tXiExA69JJaAQ0AhOOQEgf72jsEf6dme5ptYUzr18jhMsUar3jzrfjmqGc5QWd1LlrdxxX58771ssYdabFuxbcJ7xd6gJoBDQCCUKA+ng7Vr59v1UEMa/nxGceqr1KJh0SbhOUTUzJjNtEJ7mPIUaVv3Pe9bkfFpX8akeGMyuoNu/QDB9TZelAGgGNwORAgJu5cg3ct3uEyM0q+OHFd24uw4DrxvHWx4/XICumAYDFsdrvWQ/Xe7cXFa96FUsA2zEcERyvEkyOdqFLqRHQCEwRBLgWOzYLCexVIBxLOzqeOPnE3NMuFqJvPGe5jouKBm8tbpptnH/PR0c1evK++zr2N4RqBktuTpGa1I+hEdAIaATCEJCqGkza/BCqmoacnBOffajmMgYB7Y0b8yWf4GEDygEGDjTU55b+ZJvbnRnokxOaIMBrpxHQCGgEpjQC0F4IsRGqmnpP/ve+ccfbe0PYDY7XBKik6+A5oWkdvlSee7j2inpPzvHb2zAAgbca9zmU77Fksjzfk8lKPxFpj5TGSPdi7Q+JSGOkvJKVvkpXHa1loB9dsuqVaUfKl/6xuGhxw8sfLXwseVrDhKcXfm0NG34eLSzv0ynso4U3Q8f3O9o0o8UbS9mjpa2eMEI4Ncu1B/u5VuZnluaVLvwpgq+EPp63IsRQiSXmmFQJXg0oXPiPD/aqy8z/9tt9KHTQwMyu0CeKaiiJeZahqSQz/USkPVIaI90b+qSRfRKRRuSUTd9kpa/SVUdrGegXyd8aZqznY0k/Wtzw8kcLH++zhKcXfj1SetHC8r41jPV8pHTjuTfaNKPF431rGOt5tPLFGnaYcBRmweT2Te1CVDuzV3zlgV1fYpbYvS6p/Ms8kpdBSDXDTJqnz/hBlSdjRlc3VDN2m15IjKBopxHQCKQNAiB4OQFqm8Mumj3TfvCtXz9YzA27k62qSRrBq7Vmzrm7/JRaV84570E1g6m8dg48aKcR0AhoBNIJATUBqgZbkNZkZe23e8kRch9X7+DvioRDQh1Q4h0X14HVzA0nnpj97LX3rn8zI/vwCqwUyRmrfFDtNAIaAY1AuiEQUrgHhUvYP2nztc1v+GjZbV/a901K8SGdfMIhSYoEr6T316/690U1mSD3DmHoDTwSXnc6QY2ARmASIUAVPQjXLrChEZYxyGsunP1DFt+bRCk+4QTPtxHNIi/926tzG93ZV72HRXcwsCqnOfFhtNMIaAQ0AumKgNRg2A3bVswFqnFknfm1e7Z/htqOZRs2JMWiMdEELzfPZuXVly7+Zo3HM7+7yxxYHWaAOV3rWT+3RkAjkKYIcNYnV5wsd7tsDTnF3/Fe6s0pW77cz+VcEg1JQhNEAaVO//x/bDqo3p17/rtcTAxjqwkZWOUbIpXfEuNdtpHyG+merBL9ExGBcNyiXUdMZBjP8LSGCZYw7/D8wq/jySiWuLGEGS7PWOLGEiZS+qONFymtSH6xpB8WRg64CuGoahfBek/uUR+cfMlZTNobKf0x+iV2kDU0uPq5R1vufC87/6ytoaWA9cDqGGtJR9cIaASmFAJywNUQwZwsYT/K37l16aZHjrjpmpVNIsShiXrYhEnwoaWAjfPXbTuhzpF1xtaQ9B728kpUuXU6GgGNgEZg0iJAXoThia2jWxhV7uw9KxcfeykfRhmoJOrBEkPwoUlNa/HZUZdTcmmlx5UJHZMfG2jr9WYSVVM6HY2ARmBKIQCSpyAf/Ag67MbM/PMu+8PT882NQRKni0/IyK0XBcWf8cC9Oz7V4Mw+s7wVTI//cr2ZKVUl+mE0AhoBjUBiEKAUT57sxgz/uoLMhQWLDjwPXqu8iUleppIACd6QljN8G7VkFl69HVNxsdB9EJtnJ1a/n8CH1klpBDQCGoFUQECOT4Ir3+3Cki62zAvO+9tri4Q3catNjpngV6w117M5Z+3W02ud2cfXdoPpbYbehi8VWo8ug0ZAI5DSCIR08XLyU3VW1qyWwjlns8DeBNkMjpHgzbXeUUh7U17pJVUup5P2nVynIKVR1YXTCGgENAIpgoCyMtzcK0SLp+D8S//48AxKydKiZoxlHBPB90vv95Sf3BDMOLkSs7OQoB3qGfP9o48aB90GdBvQbSBqG6BFjdEjjBpn5vy6OYdeSF5PhEXN6AneYjnT5C44d3eWm7p3zmnS0jtrRzuNgEZAIxAjAljLhTs/BXcgfIMr50uXX3/nrERY1Iya4L0hIv/ffzcf0ezMOqMai9nTLFJ9bsT4XDqYRkAjoBFIewT4kQP+dHBpl5asrCXVey//AkHxrhobNGMheJZJtGeVXL7T5XKYljOWbbTl3bEVbkjsZKSpMokn7XjCqvRjPSYi7USkEWt5reGSnW8y02fa4elHu7Y+e6qdJ7Ls4WmFPyvvRwsTHkddxxp3LOmrvBJ9THDZ+y1qfEK0unIuvuwPT02DLj44ljVqRmUHzwy9yPhrf335kM3O3BOrUCBWsMGx1f6KkB4JhjQZaVqK2F92i99wp0PC0iNB2qkhaQ9XiOH8kYDlXTtcqKT4j7nsUUqV1PTDcYt2HaWsE3o7kWUPTyv8wXCfbtRtLlr6MvFRph9L2rL0o/yJJf1YwpjUacfK6oFum1Gbk700f8aeZ6JQf/WOsmSMNioJftNSk8maS/f+SlOGq0j4sGIk1DODy5EgshuUaDLSHJTBGC5SqWypVJYxQDruUcNxi3Y97gWMI8NElj08rfBi8H60MOFxrNexxI0ljDVNdT7aeCp+tGMs6ccSxswnNH0ouBOjme2Z0y7wkqNhFz/Kt1s4KUd7GOiEQuu9X7HmhcXNdvcZWym949Wtde/RsdMhNAIaAY3ASAhA1udoq70NJpO19oyDPvrvts8xvLJYHClupHtxq2i8oVQqSvf8dHNW1gLRBuld2PSyBJHQ1X4aAY2ARiBOBOR+p1jLqzHb6aoPFq9E9HtoUYMjPwX4DojZhalVRo7n9Xq5Vn3wO9fflttuzzj/PVP3npj13kfOWt/VCGgENAJpgQC1IdDFOyqwIm+r4T7lq2s3Hc4Hx4q9cfE148QVwStWMY7YPvu4o7EswYHYWxB8Pyblm0xP/2gENAIaAY2AFQEwqx+LkOVk5tS5ik/mHYsUbw044nlcBA9+l58H3bmFF9Y6Maxq6IlNI6Krb2oENAIagVEgQCke+hjbdixC1uvI/vpl/4DJJJzaNS/WJGPWwSvTyIv/8twBG505R9T1IYsgptfGPkAca5l0OI2ARkAjoBEgx0MNXpWRvaDEtfg0APIPb5yoxCzBlx1nqnOqZux9WqfbPdM0jYxfJxRn+XRwjYBGQCOQrghQfA7UY9H4lpyiL0sQQlqUWAGJieA5uFq23IZdv28sahaek7fy+wHKGgjwseajw2kENAIaAY1AHAhQH441JW1N0JbU2TwHX/S3jR/HoKdBbUqsycQUcNPSVZLJ3/7YmQf2OLOOCnRhiFdvxxcrxjqcRkAjoBEYFQJYZdJObUlXhqu4qnC+HGxVE01jSTAGgjfXfGdiXUHPF7a5ESUoDLljE18x+k9joNuAbgO6DSSlDchtT4OG7UNoTZpExsnf/8XNJeYqk94YuDsWM0mvqYdZcetjRZ3u3M80wzSSPqxP7TQCGgGNgEYguQhgF1S7gNakx51z+Hv7nLk/c1NalWg5x/QWYCL2jIWnVQr3LNhmkt+18j0asvq+RkAjoBFIAAJyrBP7O2132kRfn/MMJmnaxEe3YYxK8Go94obc0tO7XNC8Y1MPKv61agYo689SjYFuA7oNJLkNYDMQ6VqgPWnPyDn9vOv/lys9vKujCtojEjytZ7gs8Dd+++jeDSLjkFquhoCdnGhEo51GQCOgEdAIjA8CUmsC/q22e+a0z9j7JDPXVVEzH5Hgy45bJe9XzT3gmIArcyGWJggOXRY4ah46gEZAI6AR0AiMAQFJ8NCedDvtzvbc6Z9lUkq7MlKyIxC8YaPtOyPXG54jd2HLVUjvhrZ9HwlOfU8joBGYKAQwH0jwbyo6pTWpwcNVObI/9v3vf7+E2hVqVEZ63mEJfsXadfLeRX/fuNgmnKe0YWUzgGeX+qAk65y0bhtVpjEWmcCAfxoLjcFIbcCJNsKFWgJgwQDUGPaUazMoUALK5DDwaN2wUg+Ij2078MLleGSxYp25wgDPI7lhCX7dihUsktiWOWNJnSdnBqxn8K4Y8WURKX3tpxGICwHVwvIQqwctkH85caWgA6cTAtPRYPLxwI0034YEehAaC6Vd1Y5SA4vElAZdgcYt/qZct6hwFR3MZ1u3Qr46hn3MYQgeYj/Ff7gMw/nFXaR6mOlAek9MSYctjr6R7giwqRWglbWx9XEpPHTaDpzn6paX7k1j0PNnoD0swB8XPWzEglyXzxXiz0twznaCRjQMsQ1KY7JdsEvg68Re1YNjQJxy9Z8fnE2eHmnpgsg4sJfBrbh6hachI/vjPkn15leGeWeCfkPlmqDcJ0+2kxUnlLsIKLeE2tuGQ4XYcAQ8QPTtGA2aNtEkP1lxZcsdS9ljiRtLGJYjkoslbihMNuLPRDvohSqmHFL7YRDfHz9KiEv2E+LFWiF2tUKix33cNl0saauwoznGkn4sYWLNm/tv4LlbHZ7938/bdzajjbR0QeTlgldLSd0QS793ZI3NM8swJzdBhI+1FEkMlwplSOLjJSzpSYgTO2YTyR1lvx/kvmyOicZjhwnx6VchnUFaK0SLbZ7IZ5vIvMfaOMZS9ljixhJmuGeIEpeDpzPxVwHm7qTpByzB/7aHEGcshjSLdnPZi0L8u1KI6TAGqQtPK/x6uDKM1j+W9GMJE0P+UKRATWMzdnvctpmdruMQ5VWoaUIi0dAEIkrwK5ZKghfduTNPFQ5HNl6HQaQaMezQJLWPRiB+BLIQBSZaUoF6F7SLn1kUSgMd4yQQ/QMgfKpr2tHB89ChtUsfBEpQ38VoBxXcIhQv+BuWYmwQ1HYuVDKY3CkuDJH7vAyQ+xSHJaQlN/hFG3RnfdZLbRRWmBzOmiYSadtCW0OJXRn5+zS7JGJybbEpjp1+vAlCwINOSoJvA3nf+jEhPg/JjByOPt2vWTh9HnYePkQIP2648CLIYQDtpiwCrN5i/MzCXz2IHdoX8e0FQryzTIhvHijEIozCt8D/W69hoLFKiAUgdzlWiHDp4KiC2u3OWfTOz+8pHel5hxC82hLqgj89fojNZxzUDoW+NM9RvU0fB5hHYzFmLCg/5IGwG9BZf7evEOfsY46tUh3ITk7DLcJMd+ZCIf4L6b4R4T1o4Xwp9L8FdF1MGSxoFTMLfw1QyVWhXXwFFy8cLcTPMB6zPwZpIMSLNkiwP31TiL+WCzEPjag8jeofKiksSoPVff32UtfMJacCDuE11eo8HeSI1SBXdlwZST9YUbRkz76MbO7chO5E9Qy7m3YagcQhwBZVio7JT+9f4rP7QhC8G574XJR6VZUTw0nCx8lK6Fz7QO5fQecuRcuE7lBABtFuCiDAl/0M1OdukHcr6vbTMG6/HC/84zCUmGNhqg7U/01vC3HjR0LMgeS+m+SeTs5cCywQ8DgddUYJRqjErcMNtFpgMxEqW7aM0j8+ibKXVGbipBeqUW3/boKjfxOKwFx05l0g9+/tJcQVUM14IEaEk7vKkE1Q3Tsb4X1opee9JcRctGDqXWkGrd3kRMCDYnOAvRmkvhsVuXeBED/Ai/zURbCcAoHTcRITls2V8yJueQ8S62YMuroh4YPc043fAYWUeOogyufZcvbYgI+a5Su56gBntUIfb3GAbMBxcTEq7K+4+eaSnKD4dCtEIwQYHGMguD7TCIwagQUkd3TmKxeiMx8kRDYGUBWBD5corSUYho4DbLccYEp7xbhGX9duEiJAHbsfdVqDF30v2sDv8aJ/bJkQX0X9ktz55cY6J7lDKyFu3wS9O/6KUeFNuJZkNwmfe6xFdthsNj/42R0IHHTHbS8fwfTU6gPWtAdJ8JuWLgXcQmzOPaag3ZG5r0SUuplQp7JG1OcagdEisBCtbAfI/fx5kMQwcJqLVhiN3FVeJHmlrrkAah0/JPlL3xViPtKoRCCIMdqlOAKUKmkJRV37TpAU384/hMT+5b2EWFJoKoNZx0orzDqnWuGuLajrd0xT2S5c96YxL8Fsxi76bMEeT3bhTjFvPuB4vr5kBZAa7AYRvFqeoMfIWVTpysomwacxhoOR0lcJQYCS+w5IaytmCnH94eis6NyxkrsqgFVdcxH2t6FO/ip8ttOSgvpYkoF2qYkAJ6vBaEPOQG3B8RK85M/ZU4iPoz1AgJdOtQdyj9IO3w99+1ffgBoPgfqQRhdvprEzzSUNowqDVpldGUBQiLJlQ5s+X6YDLrQ8QY7DdRrfkHCAceTVysxg+lcjEB0Bkns5yP2zMOz6PT4q+QmuOnP02INDKHUNSeEbUNX8BtI8ZzZiPK6fKAbH0FcTiQAlSdZ/Iz6xuLzAidCrPXkMbNo/IcQnQuROqZ283f+VFirwwzuE+MJG3sDic/jrYKA0dxInvP460Obzg8ETvDd6i6hel2p2CzYWCX5AQd/qzjuQ9sZAGyoum3qxWqLpU41AfAjMC5H7CbCMILmXZo2e3FXOiuRdSPtS2EZzSY3vf2BK8rSJxqV2E4yAGkDtQmWUg9gPhgrmWsibJy3AshShAVS+5CmpK2ldqmdC5d6wW4jTXjUvihBGznSe4GdKnezB2T6b6HBk7vdK0eeBrLdJrFqFg7e/iAMEz1cCADz57LPzNjlzZkDQko7e2mkExoKAtJZB5z4UStdbILHN5Yp/aFgk6LE6RfKU7K7EYC3VNf+3BTp5WICR5HX7HSvCo4vPquUAaiWIvZtkghf6n/GVdepi1H+2maYicms7UPVFsn+hSojjX0JYpFECMbNe3TSjp/2vVNMAmxpXToGzy8MJT9u8Yaj0q2iUoXzu0VceCePiUq4/g5sJ6IJhOerLtEJgNlrQbpD7x7B2yD+PMmcgsmNbO/VYAWFaTDMLJPBNDNr+ABLiTny6zoG/bsBjRTf++JS0ZyJaJYkd5/+3txAfngB9OyxkSO6sK/5Zpfb+XEL+r9UIcfSL8MULu1STez88g07Mxm20wrPIsC8L3QOCA65fgleG8p1ZRYfY7M5cAMuAg/uH8lFHpqPOeaRTMaz+ys8MYcYZKayKyzDqXKWv0rCmqe7RT50znLoOD6v8hwtD/0j5DhcvPE8Vf6T0ec/qwvNTeakjw/Kcbrj8wu+ruOH+ZiqD8VH5W9MPj6/iWY8jxJsBCaES5E51zD8gudNCgh27/zms6YzxnGTBtGmR851DIclDsrlhmxALIMmXM09rvjynsz6f1Y/3hrvmPTorpurcvDN83PBw1vCqLNHSVnGsx/Cy8h79VH7W8+HuqTDhaYVfM77VWe5jkqng1BnOPqV0ePk8DIzuA7XM9IFxkZG+3NS9t+uFOJzkjnSmoz5rUZfSKYysR94YS9lVWmYOg9vESGmrezyqNHgMdxZ8BpVThR1t2ZmPub1eMICZrX3ujI/LrLkujcUevp/gVbkqM6fP6mItdYgAQg6539/wVcEZMdq59b7KaLh4Kqw6hodT8a33h/NTYdQxUjh1Tx1VGB7D/azX6lwdVbzhrsP9VXjr0RpGnasjw1nPVTyrn/XcGj7cPzyuuq+Ow91X/uHHCPG4EUMNyF1Az/o/kPuBNFZnOPirth2ezFivSfIkiXyXEN/F/D5OhvrdDkxlR3vexcQjlFPmafW3nkeKIyOEpRUeJ1KYkdIKv2dNz3qu0h3uGB7Wem09Hy4/axjreXj4sPyhcRN4d8svNWLMQfQrYMf+idnm5DUZnemhfiJ9ufEWX868twnG7QeS3GHlMRP1WA1yZ3thmP76kxeWa+u98PNI1/RTTqUVfm31H+58pDjqnjqqNMKPvK/8ws8jXdMv5ELRDBC8qHXn43U61OE9S2fIBcbW4kXbGXQuwAsUXliTkkftNAJxIsBP9DoapLthugVy/zi1g2hMchg/zrTiDU6SIMlPQ94/gBnmxfPNCVVU12iXWAQo/RFXbsjCGahHYIxlHQbQ/75MiBPmDsxMJo9Idcww2Sty39KC5X9J7u3Q35PcGREudDAv9O9gBMDTfuDfbMssPst75wJ50wKYJHiv1xSqnvr1f/b0+P1LOO8bai/dJQZDqa9iQIBTzlshObMBPYKPxuNmmZHGg9xV8ZROfjok9x+D5L8OSbICE2rmhsQZFU4fR4cA3p2iFPXMsVLiSr3MX2DFdC/07F/A+EcBApC0FXGPRCRKLbMDpH7hy0J81GxK7lyCQLvoCKCt2zi7z+kPlPSV7oXWDiMay8JjUgWj9O+1efvMCdjsc+UMVkyF1a/O6ADrEAMIZKMnUy1Cfr8HTe3k0EcjOzoluPF0zI/5zob+/yeQKjteEOLuakiGIKMqSDzajQ4Bjqt0A79a6Mf5hXb9vpC69xBiL6wfIx2JHSex1Ld6AezuxPIDIPfnavFFgPqp0PUTAjOGA4EOoqm73BkdnoJ9GEPxOc8lwfOEbpenJL89K8clukUwaNMrSJqo6N9YEICqXWD9Ijkg9i+Q+5mLzFgTQe6qvIrkabnxqyMxtR0k/2AdSB7EpCVEhVL0Iz98+PLmICqtk/h19s2FQnwNdLJ/ibyUL1OmRMzxP6pT7aIWXwCrXhHiviq8jNGINLlHhW5QAOBIQTzQ5RaOKl/h9EE3cSEJXu3M3RXMmFMH3RfWX5XxwgPra41AJATYZNiydkN0vxVmilztkU59fptXE/OrSH4hzDR/g/GA1ueFeBaDTCSTSoqa2o2IQCHYGu9DUQs1AHfT+jLUXRfsbQ6gZoRUXqznWImdmal2wc2yf/kqFhDbhfqA5K7rY8SqiHhTNmFQfDPqKceeOZOBQhs28T0LKR1KetROcA02ypkW8B/aA8sHG/0YU/9pDKK0AQhzYgbC0NadKwGetxQecKoTm1cT/IumTolxzzwh1oDkD50GMoEkyrXHdRuPjAG5ez7waUa91gKrQzCA+tAxQvzxWCGWz4VxFAIQUzYPjnkQylgc4zA8N+y46TVYOW3D2AjIXarNmJj+ixsDu2HYg3hZ5vb597rsZ3+Yz3rAkgWySuxi9Wp58qrXm2vYHXuZy/HFWl2xVKkOM1URYCtha9qNxnUDdLGcyEK/lCJ3lEe2ZvyQXPaBrvhvIPn5OHKJWknyCKOdiQBVbRxALYK6bWe3EAuh3uJX2SOfNNdn5wAq6xf/45LamTrxp6TfhS+BP7wuxM+3mpI7yZ3paTc6BACpHGhF7Nl1BfvNYipqZWC8h1fJVGvzjvF02t2zNdISDv0TAwIL0LK2Q4f6U9g8c5kAboCcauSuHgNFk0xPkuG2b/cfhWuobWirT0LTzlxagP2fEnsDPs1u2F+Ip0Ds5+8HFZwHCOGeksDjhUyRuw9prHkLywO/b+7GVINr8L12Y0AgtGSB0eNwF9a7S/F9SrdC/kodPM+2uord7Q5PIdd9AObx1p9MTP+kDwIk9x0g9x9B3/4tzBx1Q1RIVXJXtcJGTXNNkg0nXm0EyR/6HAitC2udoCek61onNG3NAyb8EuOo3DV7QNWGAdQlwIiqGuJFF4+e3Yxh/ipyJ5HfCnK/5l1TLaPJ3YrS6M8lX2OgtTUrw2H4p+Gba8D1E3y2T5RW2FwZUoIPVehAMH2mERhAYBF6/XZ8vn8bRPCdw801ulOd3FXprSR/CEaGXwbJH/EsyB0vK06Lr0ujtk9i5yxUrhnD9UzOn23upHQkPvK5QifdWOtVkTvT+sd7Qlz2tjmJqQ6CJD6etEsAAqrJcqA132+bySTXvS+ZHC/oVeZJcYbzYxhzdVCCD9XtGLNW2Y4xmUHRk5HmoAzGcJFKZUteWbjsL8n90gVYmvcIaDlgQjNWEhgD6KOKqto3yefjM7Bq4dFIBrplzr4tUTdHlXK8kZJXT0NLMpCXB8/IFT5b8byVeLFxCeeHgMFNy4Q4FiRPcic2jGFOGhuIOzRdhsX+QowQ5uhFqZ/uPx/gBQK9O2eoYjWCsD10h8aVkQb9xBJmUITQxWjjRUorkl8s6ccSJlLasfvRMMaP+pwW8C1FbnbhtdE63sYvMOmCLtce8kraz/BDdqwuAUkMKUIy0hySySg9UqlsySkLZ4JyH9Wvz8EKgUeObjemUYKb8GiSeAATSegTkFifAcEJkE899AjcdWh83LhlhMexSXULl/DtwTNyaYE9IL7/Ey/pO08wl/FVWycqYlal45zHkRzvh4dRaTDe3R/CdHYjxjqg129l/kMSGzl9M3gsYYYkDI/RxouUViS/WNKPJUyktOPwYx1BOLc77YuvvKKIH2bSyU22edblzJzDqU14beMfAvOlo1481qP1nBFVOOtxOH8VhvfDnfUez+nC/ZS/9V6kMFY/mVAoLRVPHVU4dRzOX93nUYVRR+s96/1w//BrM6WBZ4zlfixxrOlYy2g9t4axnkcKE/KjxLcbkvvnIfGu/gQ6Kwbd2Ikp4U1WJ4vOHzzHsXhpPYXnIgs2KpInNspZcRrpPDw8r1V4dU8dVfrqvrpWcVQ4dW0NFx52uGv4Uw/Lxd+4IFgV2NXA18pNsHh68lPYLg9mrSWhumQS0uRxjHVqJfeHdmC4D7busFAVnUi3EyQknSovj9Y/3lTXMmDYtboXfrTG4z3rdegyql94murampZKO9xP+VvjWMNYz1UYdbTe4zmduscjnfWozpW/Cgtse4VzZsW038LwFA5LFvTr4DvtGcVclQwJWaMPTljGkmHMs8Eh1d2BOAM+g8+Gi8dQ6p46Wv3Cz3mtnDX8cH4qjDqqcOo4nL+6z6MKo47We9b74f7h18PFV+Ei3Y/kp8LzGH7fem09t8axnkcKAz+aEu4GMRyPWYvXQWc9D/KBtRNbk5hs57LJ44fHE+YL8Tie9yQMvFJ9UQCJk/uGxuXCw1uvrecq0UF+uLB+PA+6pyJYjuH3I1xLlRP86yCxk+l/jMHTL2Ki0r4hWwumlsi6ZBGUwP/ELiFOfxFL1VDtCyz7t9pT5VRHFkI5q5/1nPfDr1WcSPesYa3nKk4kP3Uv/BgeNvxahbf6W895P/xaxQm/Fymc8lPH8DgqLeDcaXdOa8wtpbWrdP0E32zPzJbb9MHbmk4onD6kKQI0IaS9+IEwLbwZ5L4HRDESQtK/fMcRb0nyeCYeT1wgxMOQ4E99AaoEdJgCSPRxk/yoy84SjN0xlSz84H0s98DlV8l584S4CHMVDsIXGPZplp1c9nOcK0Iea86yWYTaxjOVeFGC3DmvJgss0yQzG2sOOv5wCJhqF5tos7uzRLCgn9f7T1psmZlo1ya7hxrAoMQi+Q0KoC/iRmAkTEe6F3dGiDCK9KaDGGpp6gB78VtB7vuC5BMp7Y3mMZIVhyQnnw0ZnLIYa6OgM3wOBAUIRAHuxUzy4Thbr3munCI85aeu1f1YjiptdUQcWsbQZL0GxNqJv9NmYkAcUvux87GeDKRoOg6K83kZLVGOxZfriyPRV2qFWPY8PPDVNw3jGo14UcbsWCiFhfU8WgLhYSNdM41kpK3KZs3Teq7uD3e0huU5nSonz9V9bUx0sgAAQABJREFUdaRfuJMNmGMcGW6bKxNKONOx/YqzLr98lito5BmoCJm+NfFQwEEZKj99HBsCkXBWKY50T4WJ5xhnehxorCO5Q5v38tGYqg5xcKpJ7uHwKZKn/xl7YXDwCIxNgSSD6Bd4x8XmwnG2XvNc/anUwq+VfyxHlTaO7Le0cKJqqQbqmHmwhl6Ll/LtJ2BVz0UmubP+GEXq2WNJP8Ywshj8Qf5vNUAF9BzOMbegFOJjXOTO/GRiPIGznps+w/+Gh410bfWzng+fqnknPGz4tYpv9beeq/vDHa1heW69Zhx1rY6R0uE9tNOAYXMu8BnzVRApwQfmnjAnwwjmhaaUsa1ol8YIcMMODjTSdJDWJTQlVOQ+1RuHInkePwfJ91/A4SuvQIqHJEqSb0+xdoFiyS8MJzr4LkjMdoyP/BYvpzPxNztkSyEldoTjMyXFIW+m/QHWcr8MkvvONqzpjrajNuxISp460UEIsGrJ8XZht2dn2hfKm6uEIQm+155fYjdsWQyhAg6KrS/SBgGqI7hWCBvCk5AAaV2iJAi2jXRwiuQp6X4Jemvu73ouLEGKQFoQjEVnwkBgl1SoWs9jy4CD312IVs8BVDD9T2AR8wW8lJZAlaZcsucoSLUWyrEdpH4lJPcXG/FiwRCfXhlS1cA4HtEW7NDJBGwOiGSmkwTf4/Rg6SV8jKMhQ1RDdalGFwqlD2mBQB6qPQBy70FDeeQYIT45n+3B5PekSX8piqyV5L+8P8YK0TcufA3mhiB5GiP0ApexO2s/s56PnHIOgtIIRq3NfvEClG0/IQ4oNU0iVZ2xGyfTjFW9PCo6MKsZ5P5UXWj/W/KIduOMAHgbG27z12d39b/iTQnekZFn2O1OSfCa3Me5YlIju1yQgQsdkzrTe2EPTr0tHXks3chdPnjouSmh0urkHNiNd+Pld+Ub0C2D5Dm1HxqRcXVUEfElXImxEe6D+sVZ5vLMx86DdCZH08wB1ETr2CM9pCL3esyN+NELaDNVWKET4zU7US7tJggBmriD4P1OJxZ3hgPhmxK8w5MdcKLVcnJrQiSTCXpAne2oEKBJnQf1zqn6dx4J3TPspOnU57d5lZ6/SpLPAEbnHwh1DUj+W1gwi5bGOB2X9VTQM+WKl9xQpZ0mq1gE7EdQxxyPl3Ahb8KpfptMid3MaeAl0gLV0I+exxozu4RYAHIv19yhIJqAIxooXBCHHsPJeWXSmRK83ZURoATglx93ODMDh8LowxRGIBNVza32aDFzOxYOWwnioNPkbuLAX5I8JdYs9IyLDjYl+R+9iwlgIHmuQEmiT4ZjLyxFnvxy4IYqXBlszUEwfdwDa7pwMACO5WK48frKUpJ7O8qz+kUhbtkhxGLYZW7Tkrusj4n6QTOQjkef3YnXrelMCR47toYmOalw6r4+TmEEwE+iEDVeDanwDyCus6GG4Htek/vQSqdkTHLLcQhxxaEm6f58E4gWXakW/okkeWQhaMlEu/IaqEBoqvpL6NjP3AebW3O9AbjxlNjNHM3nJw5cy+YXL8NaZ6sQC1E2Te4KoQk/0tIdyxU42LWlkwTfZ3M45TIFylcfpzwCJBHauleBQH4NqfA8/NHkTpP78FWvSD4PveZafO2Q6H7zATaugARbATJOhGOd0OSxFi9diubf3MtcwpcDqHz50klyxz38HzenJHcfGOQ6mI1eh+cmue9I0HOP24NM8YxYHX02p+R1Pqo86bZnOPvYerCSpDSi4R3tpiwCrGouQcCFp7yQDKl28MBTk3v0KlckT7v4738c0hII7w8fguRBdmMheUSXdbKTxA63YpYQl8N65zAcPXwbw0l1DIl9PJk9lC+fuw/s8bvXoZrBl8siFHi7JndZL6n0QxvIHpuTspp0kuB7hNMhPzFZYbrSQtBM3QOXjK3oxmDhPkJcBUmUy8Rqco+9vhXJT8OH8P8dgYFP6KP/sT1kIhhn/6HJI61jqtEBSe5HQ1K/JjSAmh/qporYme94OyW5kx/+gsHl7+BvDspVTl2AdimHAOurF7NZVcHkCdqnXdeXgmRqH+eQ3CG5X7KHEN8FOVESVZ14aj95Yp9OkXwJJNlfYbYvpdv/7IiP5OUSzGDODnRArqd7+6GGOHkPmyjNMssqVTE4nQhiZwmYv3xOnP8dg8pXbsTAMtpLHdoQ24x2qYlAn6XFSIIPYrENXV+pWVmJLJUkd5i2rZwPyfMTWG0QEqgm99EjrEieG1L/+ihI8jAzfbACJA9cdw3Todjh5IJguM/19Tk19peQ2L+4BDpt3oBTxD7eqhiZeehHfdHxMdZuFuIC6N2nofDcsIMbZ2uXugjIkdZQ8STB+21uuRCcNAUw21jqll6XbFQISGkRkvuJ0On+GhLnTJCSJvdRQTkokiL5mSDqPx+LpQM2CPF0FSb9gOR3ggjZnRQfctONAC4aubQA9Orfh4qMZqkHTh9IMhXqRJE7S/XgR1iuAeaQfJA+/HXrT/2BykrBM9ad3+5ks5NOEnwAwzaqEaob+jh1EJiN6t4N/e5hIJI1x2E/TthTpwKRTBWEFclzca/bl8Hc9GkhnqsdkOS5BypU6+ba7Dg/e54Q38AA6qF42WaETGPYMemY1kQ6FkN9OTxVLsRnn4MHPIvwQtJruk9kzcSeN/lchTYleHXV76089HGyI0By59T2ubCf/vcyIRZA16vJPfG1qkh+LkZM/7kcNutPCfFmoxB7QpLfCvzLob45eQbGPvbFDNSFsKeXPc+sC3bHgS6Z+LLFlaJkeGxEXiHEp55BTIwRFKOsDaEXUFxp6cATggD7t3KymdkDfYJ6GyVFqJv6ODkRAF9ItcBsSIeVkNw5gPfYcpANSF6Te/LqVJH8AqwEsu54LPkASf7dGixQhrX0b4Iq5oQ9IMlDNUan+tpES+xmacz2wkbDF83GaljzbMAdtB0OqtZotYyCKbWPoY6PJcdU8zLt4F0YZaUVgIX4U/tBdOlGRID1yKVkKbkLWGS8CXJfivVLSO4pIymO+AST96Yi+cV4md61DPr4ndiXFMRO0qeTdYCjWQ+sKfZKEj7WiUpi5URNP9Q23q2DKm89CoQB4Fkg9ypN7rJ+JsUPmxOcM+g32PXpTAkeiwgnsW2ZOenfcUOA5M4t27hhxyuQJA+EApivdNaxSSfjVpS0zIgkT7z5Ul2CP4k5rtn/BkvsA7WRTHJnJYyUvvqq2wKV0udI7h1Y0x1tR6/pTuQml2OLcuBHEbwc4rEbfsNcKnhyPYwu7VAESlC5ktzx6n5uuRCHYyBPk/tQnJLtowQmdjjiL3dZ4EWKOUXu21uwWQjIfVsrxmswbkByT8Hiphh6KVgc1JvdoK2W6aQE7w76A7RtHfBWt/VxMiFQiB5Zj0Ex9synlkGPOg/nrGrdUwHCxDgJf4rir8h9VxvWuwe5vwcJXtrwsw3B9bOEeal/JwMCqDQH+FwVVUrw7oDPb65VQCrQ1arAmUxHbrXXHESJ8ffAsRjQW2iWXhLMZHqQKVbWFOX2/sH2auw/+I0ybLUHs875UMvsYhvSbtIiQHv3jIBfaWjMBercRl/AEWKCVG2QkxbxcSg41zORE1Dw3v7vMVgvfC8zU6WaGYcixJWFVFmgvcljXDF14EQgoCR37sZ0ZRm2Z6wYmJiViPR1GhOHAPk7QwQ5AiedVNFkGj6f05T+NL8rZCbJkTsNeVB3XM/k9qNgf73E1MikKrkrcrHCq78yrGgk91zhz9m0P8AkprvLzfVz9FZ7ycV9nFKXM1ZdQR+No6ULqWj8vfYAWAL7+WkNjYIm9Y+wYpMbdtSjOm/GqpDcsINv7FQjdxI4y0RHK5IeNLVndgjxFmzE6ShVhG7La/2THAQUubdCGPjFi0Lc+qFJ7sOtm5OcUuhUk4kAVTRuw49vM9NJgs/o6+p0+CXpy5251U19TG0EpDkkJLHrsJ4713Qn4bMTKwuOVCi9LA8KwjLxI/ENkPqP1wux7FEhDnocZpyYVEPHhpnuJD8wPcXEJJG/Qbxh+XLtwMf7b14W4sb3YQqJSVdjWcM+keXTaY0VAbP32NDJXIG+dpWaJPhMo6fNFgyE9DZj6GbWqEpkUzkl4jhcmtZ8E5FPtDQi5Tdc2aKlNcr7C9FZd2PxsB9Bar/iMOjdSKAoFztxMoki1uISDlUextneDKnxeSEOeRiLnW0RYg+Y4okuLLYFsn8dA3xKjI8ELeOngxvJVn0sz2/Wg010ofP/BUv+/vRtLDYH/GtYRzElHKVWWNljav9R0mcZx5R+TA85yQPJ5cSkisZt+GDsajqpg3f6O1ptwWAvOpkzxhpX8Yce++uKTDP09th8Rkgz4XlFKemQ/EYoW5Sk4r1Nct8BcrwK09+/dyQmq2IhKCuZJosoYimn6oeU2PFfVGHSzKNQBVyA9cQF5Qp8ZswBuXwEZinF+S40xfNA8v/6lBD7Y1KQ5IpQ3Fjy02FGRoB48qVPM+i/vyHEt0Hw04F/I677belGTgJ3WZMjudD9IX1ipDjWe9HSZ1iEGXX61rym9LmN/O30+yBOwWF7PinBOzobWN9dZj3KN8GURmEyP9wi1NgOSO6X7C3ET2Axk41XtJXcJ/LZWA5J7OiLLdD4rYMa4AuQ2C94AftGo8wzMlFevIyUWoCbVc8G2bzThOd5Woj3YYfN+LojJ6YWSe7Ek0T+H0jtl72CNd2Bdwf8pEI2MdnoVFIFAdSrEQwIo8+HBSdMJwne2Hp/JfpfuzSaVCKYCpHsIxphUl2y009q4QcnvggVuB3DJ+cshLrjWKwhBrvliSZ3wquaDCXFTij6ysqxUTSIfeUGIV4CaS+ArjeAlkaVQGdYfVSCfUjyL9ZjqzpI8h9hRiVJSaU5GAF9FSsCitwZ/t5NQpyLlyx370I/l6qaWNOR4cLqLK64Ex04zcoeCAbA773lEvbVIrR33/33V3SeYJd6Gyx5ZIy7BJXsSkh2+uPQiBeAIEnun5+LQbLlsJ6BNDzR5N6fPwgZX4bi9Uoh7nhPiN9/ZAJSAkLhFP1y3hzBVeI+N61+vAbjCU9h44wT8VLIM0leSvQjxNW3hiJgJfcHNuNF+wwsK/Clx7rof8HG2yfiDT+0WBPnky5lZz8MGv5tfa4dCmwpwZdhE5BMf0+PVs4oWFLrOB+1VA5yP302drU/AVvtZU0suZNA+EeJnW4zpPSfPYt1bx4BuWMAdS6+LIrwB81LzOuIV4Dk50PSf6wae8VCXbMb+notyUt44/ohl4WqRTyBF+1nyzB1He0nG3+tvKndlEYgI9jb6wj28kNNOjnIyrNcf2d3rzFNBNg6dEOQ4KTCz1x0zJ2ormOng9yPhzojd+LInaROp6TqCpDwwyD0SziAisHUDJD6NLx8dkeR2GUiEX442WYeSH5tBQaK1sOU71MYiJ3gl1mEYqasl6we/qAPP1suxEnAkC4P4x7Nuk+bYEzdXyhfhC0n0Nud01cXUGY0AwQf7G5sQgfDgmOY7BRqJVMXjEnxZLNA7jSFPLhIiFtAdgsLJkZtISV2IKYk9iaU6YmtsL8Hsb/N4RyoV2ZBj06JvYojemNwuxB/AdL7TzmShST/y0/C6gOk368OGkPaUzmqIne+fF/cLcRxUHUJP772oCarR7/WLj0Q8AR6m6d1be8tl4+7GmaRMKWBSGZ4/N0VNrNzmrNZKclrN2EIzAC5V/ViFyboom+DWmZvkDyJVknP41EwkgbzJLGzOXSBMCgZ3gKLjPsq4QHJcC42m24AgVRJhoFfAhx19osguf9tO3THG4T4Ob5cikD6muQjgyuhxw/bBndjOorkDjOZ6RDf6oCldmmCAOo/M9hX7an8oamiWbXK6JfgXX2d240AGN6B5eLNPbjZp7WbAASKQe41tGMDyf0TEiw37KDabLzI3UoYzBMz28VbIPS/gNhJunRzQbj8DBytOkYmMsLPdhDTQjz/X/Cl4AIePwPJp4LV0AhFnrhbobbBr6nDnkQxMEdiOiT3OlmRE1csnfM4I4C+agv4dxz0sOh6nlnj2ilgSoNTo727951AiOG1Dn6cK8aSXSHIrIHkDpXHBpD7EbNYO/K/rChL0KScSimZKbNVwG1qwAqV72D2I3TtZPoSlIu3kkXszFO5HZA3FkE98/vNaKjA5SfLsVk1iEtL8gohtIsQubOeziC5463LWarVWnIfACkdzqh3QcfsCNo/+L0QvUoz0y/B7wo6qx0BX2/Q6YbcpN1EIJCPCmqHGgSvXfEoyGzZPLMUcjegJBcoXM9e0SbEPZio9E3YUHMG6gyQRgB/nBE3ntxBSZ4kfxPKkgGV0I+Pw4cN8NEkP0DunDtwMcYrymHNpMk9yR0lhZN3gjuaDKNKFnGdnNUU6Cf4WV0VvrbePdsaM3M0wU9AJWaD3O0gM/L7fcuE+PRisxBKQktWkZg+HVUx+C/qYI65AWqRs97CBUdNITHPBcFyCzeS6kS47ciXk6U4qOsEyf/oWJA9JPp0JnnVLnbi5XvteiFeqMFANzDSm2RPRAud8DzZM+2ernZR0F3fsdtSHHST1fJyZtVj3TnB3irZy02NgCWYPk0mAplg1myQO3dkuhPkdcbeZm6qEycrbxKkJHbkz/XkH/pQiK8/BHKHNCildhBGHkSA3QiHok2oK0cZFqM8P8OL54YX8A2KAnHwd6JeOhMJhmoX1dC1r9ogxP92mS9hTe4TWSsTl7e0isHIaVagt7W4ezfFMqz7YSra7QIjrbyefd8d7RlBH2Q3OProv3HBAAKymA6yqoPe/fZPgFz3YwUga+CfjEFVWa2huiVBkihfwiv/8scwkQp/j1ab0nImJOUa3GvDX6q0hW0oC00of/y6EL99CUMCeI50I3nVLrhhxy/LhPjHNvRdvPh2Y7wiVepJl2O86wJTVCGqYy/W6tzG9ejBdKvlrxMsgqUJDNs6m617RsDxBgJ+EXdIAdolGQEnCHYmkN6FzvqXoyA9H2RmmCzVQ3+6yJfunVpMKsLSAj//ABcgCM4+ZZnKU7j2+fk5NwOraL4G7RFeQlcdgYaNMvc/Gx9sijr1jNyw49fPmIPP82CmqvdRnaIVHuNjobsaNFnuEM6tx/99zY5nGc/rlb3Y1MGHFPKtft8uNyRJ/A9RQIw56GBxI4AXrpiFP5L7bz+OFRcPM5NQnTjuBEeIQKmPjtIuXTksLe6GPvvbJHbocCkB9qIlcCo7peJUdpiIJyiizAPJf+sV2MmjYX8D2E11kmcdsv668CL+3XMYj8CLeb4m91RuquNaNgfahb+vq9rLYby1hkOsNGc1hQh+nSzMrO7drU2d0/2+rGlOKddrok9KJZFn5+OHa7r/8lAQFAgePJVwKVRyNX6UqqcO+T0Kc8erocdu5orRkNjnYEid68BMpm82DkTXAL8StN4rXsSAK47n4+tHqWvUiwzBpoRTahmu6f5HPO+qN/EVg3qjWkbW8ZR4Sv0Qo0SA5pF2ty8gSnrq63YykZD+nacUJIXYd4VsJ9Na3qzKNPoqJdvotiOhSfQPyX1uiNxXHYhd7aF3d6MWEim5szKZHvMiubfjk/4BSOtfegBqoPUg9w7T4kKuzU5yn4SOZNcJ3KaB3C96FhPC3jYbLMldfbFMwscaUmRF7nyp/eVlIb7zKoQDkDtnDk/SqhvyjNpj9AioAVaXr6uv0FfzUXhKJsF7zXUk917zvY96g/YPE0PwpJlEu2SkmagyxlY2Lh62qxsdFYOp1xyTeJtuk9jN/Tc5gPpsuRCXPoRVBZ8QYj107tTZcpMQEkT/0rGJgmCc0+nCM/QAz0I8z7nPmOMJrAW+1BJB8uFbH4Zfj/Vxrenx3HrNtBW585luA7FfBYKfFyJ3CO9RHGNZXfi19V6082hxeT9amJHyiCVuLGEi5THaeJHSiuQXS/qxhImUdnQ/iO9ygNUnbA0Zuza+JmOsGqgMdA3pDOpt7lhp68wK9JQ7QAzy6y+8XOg4odChk2EODMfZOVanLq1pynDWQDiP5NcfRCViCRce3nod73l/PhFOrGnxdvg1PZSfOoaFmw89zM5OqBX2AcEfBxNEmNCwE49VpSAhxQ+JTaopUJD3arBFG6Tam6CSoag3C+qYHtznYl4RnbXMKoDyU0f6q3N1VGGtx5HuqXDWMNZz3rdeW8/D4+JeJ56Ny+GySZ+1wbST//wSEwtFkCpavMfwrQ/Dr+NNLzy8NT3rOcNZy/5PqGQugWqGdchNU6KOk0jM+APXj1/o2vQ1f/vvhTyHvQ7FjXZ/pLSt94acI2GVtjoyjPVcXlgiDroXHtZ6zYDWa/NyxF9r2qHoA5QZnhYCqPDqyMSt5yOVneHoUK/9blBc+KrryGFNpu3rbHzl315TglfhENWU4JlySG8zvbu6OqMHw6ymWtiarVmIwT4MN9RFCkO/cP/wa6YUyW9oDgPhwsNbr+M9j5SP8rOmRb/wa6uf9V7ofDaQ3gnVyLmLhfjhcqgWMpEE7in9uMom3iPTYFlUOh9Bt37Ds0IccC/I/T1YxuClUhoiBq4WOqwLlXPQfeWnjrypztVxUITQxUj3VHhrGOs571uvrefhcUP3aMrJJR7ovvC0ac/P80RJ8kxrPJ21XdyJwfCvP4OBcIhiTei4VE1FddYw1vPwiOH3xnptTT88Leu9SOcqvDoyjPU8PE74vXivw9OzXlvT4rn1muGGu7b6W8+taYfHZ7jwsMNdRw5rs6H9F/c2VnjNeZLMod8NEHzIK79jx1t2f08XqB/9Izyn/nj6JA4ESO6VGOD8wgJYL51grnFu7cRxJNUflPGlOgadnkRWgy+DWzcKcTSInSaERah0rqUOgxnBvU9H4vb+RCfxCdc758uMD3r6k1jOOKSNlCQ/iZ7L2i7uw7jJl8vwXCD3FrShHt0dJ1FNjkNRzfVn5Ebb2b62jd7+bm6q3FmCAYIP6W38z3/ppd6gUcfPAuh3gpLj2bD036gwmAUcSe7HwyaSa5vPw4Yd1k7MSojHMa6KT3VMM8wsH3hfiBNB7BeWgczxlcBNM9pwrxbqGJoVpkvd8QuFljVc7+EkjDmUleMcDlBICORFCv+oemURH8UL6kx8jbhRf370Uqqi0qUe9XPGVdc20dcr2rv9z7DdCK8xwOm4HLhgL4Db9JpoyO1trpHvALk+memvf+NHoBToVvUIsd90If5wohB7FAyQc/ypDZbYe0DeT28LDaA+IsS7XGgKxF4AguPEFz+JPQ0dN7coJcnDcmj5o9j8YpcJAttzKkMiyT1UX+vLhTgFXyEcCKOlk5xNHLqnDxqBfgRCDRp83d7T21jV7285GSD4gYEAf0F3wyZpJo/1DVK7W1ieJMVOSe61kK5dhdiIGuS+ZJpJ7gMwx1Zg1qGS2imxQzgVb6Aqv4NlBT4J65i7dgq5EBeX0a1G4JZUZrHYHnnMoaiSmsE1IID/UcDptUqcU4CBfyrCwzKxePx5qUKIE/D1wbIX4xn0VnsERrtICKC5yBmsub7OzfN3/rHFDLN6UFALwSMwd3eCw7Z+jxp+iECU4M3NPwZF0hcjI1ACFGs5Tg2TxBdA7tywgyTNDiwBHjl6/12rLTt1yZux5vdvnhHikHvMaercSHkGBmvLkXZHKjJX/5OM/wnX0aHVicDYBDcDfwvTX4kh2nTKOfm1jLK9Ccunz+OFxDJPR9m5U5Z2GoHhEEBTliaSPUFR9uYDT0LsgwstUaDi8GN2wIU2/2hsb9uS3dvc3ZGF3TDZIVKwUwwUOrXOpqGj1uPdyFmiz38aO+zMjp/cpcSOJJT5ZDX06vfBIua7sKjowFpxHDw1QOxcWqAGn/HaRUaA+8PORj1UAr9THhbi8dOE2H9G/PUROfXE+ErVDNrMpnosVwFyr8ao+CzU7Vj3tk1M6XQqqYsASdlmy+wNiGBf2xZZTssSBarcVgkefqul/4Lqe1rzfG0fUkMP6ULTu0IrypHk3kjChd50/UlQD8yLj0yUKoaSphxA7RFiHUj9ZEjslz0HcodkNy8HK08iC+612atrJkqNgNyB0xyQPInz89DJbwGRSsuaFMBOkTtNW694HKo3fKHNJrlryT1qvaZ7AFAEpXd7VldD+6zW93dLPCxLFCh8EG6Q47Vs+sXeD29omLHntVh5LERZg8LpizAECoBcN0kXf4+fAquWvUwkCaZUDYSFt14yDDu7kti7gfhz24X4Mya43F+Om9DFzsIfBFHRJmsHJ9rFhIBq0PMgrOzCC3MpxkL+dzoGvHGkCkxhHlNiCQyk8t6NnbMuxtfFoxgn4MYq47EVYgIfQyc1cQgEoCVw5DTVvXDED0pPfcq0iFbNvb9Ug1U0JPeQmG/4WjZ5enpFty0DkcgqjBuPG02caOknI81oeUa/z632ArBH7A3YxINQy0hyRzRZ2iiwyY6OsHwJcIbi2+jot72OdUe2wRMvC647woE27rHJ9GJzMufYgk7xUAozzuDlCpTvQ0r+Igj1bpD8QgyAK6KNBAOXDrDOMA2/jhQnFj+VZw0GTr79uE08CvlrQZYhyilKxd3PhssxvA2EXw8XL5J/tLgK5SiNPVLS0i9a+gwUS5hIGYw2XqS0IvnFkn4sYSKlPZwf0gNhcIs+t6/pI0nuNI/0csrTYBemosHNkJg/u+7lbZndLfVQN0DIGRpxcDKRrkZb2ZHSUn7JSFOlPbpjLopEdNp9NrH2BCFOW2qmoz6/h0uV9/uldqRB1cHP10NnD3XMXz407bm5wfVOpE2pnU0kdpd6OMVe9uSEJCI0H50PFcgbtUJ8DQOvu6C2oQRPwo3krOTO++HXkeJE81Pk3oSvie89aRP/3UFyx0B5kCVMZL2FpxV+Ha2k1vvR4vJ+tDDW9MLPY4kbS5jwdHk92niR0orkF0v6sYSJlPZwfnJY3uHs6TCKMDFVhrKsP2ONNZTg1cJjt175ii9ovEN9ctz8Ys1hCp9zq71MgNMCk7Y7jsdM1QPMhx2J3BWxU2Ln3y58onMJ2H3WYQRkIxYfQxIzQUJQy4r6YYhnCkOatEdTUPKFOR+qkOeqTJKvAv4jkXwiC6TIvQ3t5QcwhfzHViEWSnJPZC46rTRAQFrPBIKBeufuVyGqDO+GEjz5HOI++MaX31W1xe1Dj+BrkMyknYkAoIBwLfJwrIcktuZYfPYfYsoKw5E7/dnBFbE3dmP/Vbx7T4fEfvlzSA9mlTOzoaYB6dOenfbu2iUHAUXyZVCNXILBTVopSZKXTT05eSpy74SF1er1aDMfmHvM7khinsl5Ep1qSiAAjijoqt25+b9ezJyAA29EcuE6eDMMxX2vEDlN7z9Zn7/nucKT68FQK+1phkkmUtJT1w/jnQLqW1HTBbv0o4T46uFyHFS+A0ngVod6kJ9Akthxys2tX9yBeJDWn9gFDyTGpQWgNRDVUgeLE+2SjsBOYL0AuD+4HS9XkPwfT4btOaRpRcSJLIBKk7OPf/GMEDe+jbyRF/eY1U4jEB8CYBTqCnHI7Gl8DHHBQnRhxGN6WpYqCHlYDx3/O+d5l6+jxvSTeh/r7bQ8J4zT8UNy/wmI/aIjATS+g5R0bgVF+sGD5M6lA17YKcS1GOA76X6QO1QEM9DJi0Dwu3BPmzxakRuf83IQLAex7/4Iu1xBZdKAr6pEq2sUudO66jfPg+AxgC517qhz7TQCcSMg99AWtszuZtHe07lexjfXn4nYoiJL8GQxuMIq0Wbvqn6zK2/mQtNH/84GNhUggm8dCNvlo/GVAwRVJ1boKG0WyYKof1AHHT1MHq/DZzmnoFMH3IJTru2t3cQiQHUNN9H4zxbUJcabfvkpvHQxBhJep6MppUqD1lF/flmIH71imkLu1PU+Gjh1HCDAeUnYcdWW29P8YXHdE5XkETV/SZ6G/UQmeDMZ2yabzTeru+Meu7/vzKDdFdLDh9g/LKEpf4nHnoe/XZhsdOF+Qnx/GXRg7sFEIPXvAEKpaXYA/QcxA/UqkDunn9uhuOeCYLKD606eMk2G1jW0Qb9lE77G0CNWnzC0buMtLNsCX/DUut0OddzVz8MyCu2F6+QoASDeNHV4jQAWk5EDrH6//4kP/nPDVjQmLieDFhzZDUPwCBxatsDe/uF7BR3zm5ry5hfJ9wd+Iic1tX25j+ouqGXO2luIn8Jihht2KAmNXK06NFFoQLiH3sfGG2/B6hTSewHIIwN/NHfkzErtUgwB1EsF/uagjm6GfjwDKjduypIf9gKPtdTyRY/2wqr+L9K7uAztBaq4TvjFtGFHrBnpcOmGAMdBHTntzSKns/xNWtqJdVLNPuzoHZryMC5kLrn01gu32X19TwrzVZCW9MRZkLuhlvnUAuhR8QlfCmsXkjslddmZASGltXZYwjyyWYgVsIw592mQOyT4+TnwR3xKbkhCuxRFANUjKvEzGyR/wxtC/A4SNzcrj1cnr8idj/kgvgjOxiwUO1Q/PrQB7iGrnUZg1Ahwaw/wsNHXt6XkpZOelemslHLEsEmatB35tpzV+gT2aS3pa34ps9f3xR67O23UNOBrqT+XU9whkR85GzsmnYwlA3JNcidkDMMfSmWvlOM+iOGfH8IPqJZCHYO5T4LWGtpNDgTIv7X4oxptFXTmTpDyN4/B3AQQtPpaG+lJrOT+BNrBGbRxgCtA/BG3SzSD6V+NwAgIoHVCouR+2Rm+pvfeeEl8JDf3iDB71ZoImvAIboX5dphece+Lzq7mSi5uM7pZrSPkkaK32NnnAB2uX7KkVIh/nQodfD50qgCYxK70q+/W4HP+ESGOvdckd5o8FuBznJOUmtPyeydFKzTGYtHaqRF/tHD64UvQy+OPawxFk+TZXuQLH0euI3TSwziBZzHJXb/kY0RfBxseAQ6vCoetuz2Y3/z+ozLcKimDDh8Fd0aS4PnG4JgtB1tfK/i/896yi9LZmFHNjKa8I7lXwOIlDwbv950mxCKMQATR0R2hV+IOKMDuxUqP13IAFRJ+AST2DJACB+y0m9wIQNMm1/8pwTjL1c+iXkHS5x+BdT/A4JEkedkdQgz/2i687B9CApipxs3Oa9keFPNPblh06ScWAbk7R6avpbp9ywaT4GMoT4iuoocsbNn8uL2L6xly8YJYKD4Zb4FkpDnw7KofzgQqJHeRB2nsdCH2LjHD2OFfAwj+/ioI/78g9+fgD+mMn/RdeBfKzjyQ3ASeJRenCXywccua1c865QD5pWUwc0Wd96HZU5KnKmaQwzXHY7hQ3OEP4g4ic7OR6O3BmhDPrdeDckjAxVjSjhZ3rGWPlj4fP5YwkWAabbxIaUXyiyX9WMJESnuoX15n3ZMFT/6hUd5RhDU0WL/PyBJ8fzB8pu5648GM4kN+5M/MmQ6sWeIoyUe5bUk79tNkpDmQOx+KW+1VU4RDx37lFCE+NtO834pOW7YVsxBh8vYsOjI39JiNwdYGROJKj1HhMJMZp9/k4jRODzHh2XTCAi0HUPLr7IL1kOSdNvElLEnhgJ/StyuJ/oNa7NxFcu80yT22DTus9WQ9T8ajjyX9aHGj3Y/2PLHEjyVMpHxGGy9SWpH8Ykk/ljCR0h7kh809OkRvb/v/qihCDLN65KAYuIguwYfKlnO/tzqns+aJ8ASm0rXcR5Xkjm+U56GWOXyeEJxe/sw2rFnyPwyaPQByR0fmxJhsvBpp8qhnoE6lFjD0WbgVIlaBFrl4oZ+D1n8vTF+ldAM/jsdQot/agB2jSO6wmuLmItywI9RthiaofTQCcSKAtkTrGZuns/7daVu/844ZfXVMqUQneE56wtsCs7l7jc6Gezw9rUwYY62j/maKqWDjHagYKHKTbI5KPHsGdmNaKMTrFZh9iAHUZXdjc2uQfCmk+mJ0YC4t0Mlerl1aINCOuubYiwd1vxKWMfeFuhj9OBazAuReDpKfC519BcidTjcPEwf9O3YEOLnJ9f/tfQmYHMWVZmRm3V3d6taBJAwGj9nxAcbwmTEe4wMzO2P7G6/n84yl3bFZ22ADBs/w8RnWYGxWpc/Dgj3DMcAgEJLMZQmpJSHrQEJIqIUOdJ/0qdbR91XdXXd1XZn7XmSllEpVd1V1VXVXVb+QqjIzMvJlxB9Zf75+8eIFKg1R39aWTQfPqNq7K/mkjS0/A4JHAerbYvpHPz5mCw0dBQ0X505N/DNciDuCTPwz3A0+z7PhB7oBvGU+BgOqT2xn7KZa8HuHH/MV4BWD09f7oSyaZChNPQQ88HPCCVASKAC49N+7jeACC7rOfbB/vEcld1qNaeo9FxPQYhmUackUGPBO7/vwPfV+Kh9ncm+gtgxTcqWnGb868qRv9o0PAx9CfEmIilDif4wCd7MY/Hgx6Nf9N6oDpo8cBC+KITgBpH4F/KA1rSxDpKhYGSNQBb8YH3jI4BjMX8IgfMuAOksVXSspEQL5RQAeKkFICCKTpg2d3vXJ313zN4eZAk8fWFUyTBlq8CAt6RNf07FlsynQN4hvFbhRRn8mZFiXSSnGGwA/Wpymvv0sTCsHO+swDJR9zAl2dmghkfukdEvR3hTDTTjgpe+An1kLmGWmgWJA5F603VXiFQMiR9/3kRCrGm5ec1h15MqqTZkTfNInvnXFo7scI+7DIr5DuE98xi+TrCqWsnABbgVjqAzCqLETfnCJ7IWAUDCAij9gHEAlO3vKXpjymRhyAGcp43PiLcAzWXQAl3IbS7Xuar35ChxVof6eSM9BHMYHa/lCePIyT/CIZp1k+1DTG96KK/9OtlWhFo9vmaxumvUd9RcUoMPA3MTdiaygjQ2U/N8kerBov1AIoJUGZ71OmVTKbS3VuiOzggpuDg+s/NoaVxsMCTLmcmXVmsw1eN2TLHz08vtV4d6mZFZWN9SJKapd5PVwWbSkqGClyhAChMA4EACNGdlIcvq6I2ZP6ztA7gk2bxUo1Dw/Y4nZEXzSTNOx571uKdj/psRne2R3w4xrRgUJAUKAEJiiCIBrpCyAfcU04ts2d8kP9nAYaudnbV/I3kSTjBNf1b9jy0jllf/ir75qDgy18gl9U7QvqNmEACFACOQPAXWOkWT2DypOX/2fYXA1lOnMVWMlxmc7T06Tnf6rY0t8sz7/U7BHloXLpBEcOiYECAFCYBIQkMH2Lk4bPn1i2uPX3NoOjn1QB+TqrI3I2Zlozrd0Id+b1l23Ugr2+cvFZfJ882iHECAECIFJQQA4HOIEiLEoq/C0LufkjsvyjYPcsfrjI3iXOk327JsP7KgMdu9So8ajuKxfMHgRJUKAECAECAGOAJ9bJFT6O9rFjnfX8KwsXSP1QGZvg9euVhd7jVsG61+2Oq/4dsQ2S1Tjx0+gy6RWF9oSAoQAIVAOCID93QTOK6Zw3+ud659pxfU4eGCYcbZtfBq87mamZf97V0WwdxvOa4WU9SivThTtEgKEACEwlRFA27tk9XV0Odtq3+ZA5KC94/XjJ3h0mYTBVrQRmXzn3rAFYN42TKsF/Z3sNFP5EaW2EwKEwDgQUGlTisWZPdi9oW3ts0eyiRo52g3HT/Ao0aUGvZn90nc3WkIDu/jrQiEtfjSwKZ8QIAQIgdQIgO1dYKI12Ot2tKxYwsssyF1ZHr8NXq0l1+JPuoThywePvxq2zfpKrAKWGcYptqpbT+q2UC4hQAgQAoTARQgIYHt3+s+sat/0HK70DAw6Pi92vdDcNHiU5FLfMpal/7zWOdILa9DzBARPlpokFrQhBAgBQmB0BNCsDdp7hb9tyNq791UoKHPzTB5INHeC58HGFOEcLFhmG2peZA2jTz5Ul4c1wN0iS/TeKbIOKeLqGJ8V43GuVdfLw339cT5lo6xcZKe7Nte6p5OfS/0zkZ0L1pnIH62Mlg9mbQn2rYGe5T9d+WuYuAopaf7OpWp4bR4I/kIVpi35/ma7v2M7SMV3kupRg40opg9Wt5jqQ3Up3v4wPivG41z7Ti8P9zHlKlO73ijLeKyVy2Sb7lo8jykTWanKZHJtJmXGKzvVdZnmZVKv0cqo+XzFJpuvrcdxdvlrLq69u5CXsQY5p/wQfNKjBsJLDjo8x5fYfD0QuoA7Tualkjm3kgQQAoQAIVBsCKimGZi1GmEO/+mVHetfOJQPzxl9M3O34uulgVP+1YJg9T54ZK1n1o3fBnanGDV6fGifECAECIELCHDPGafndEfVrrv+tnvPjubkxKa8Kcbq9KQLN8xtTxBET11dbNYnPuMesV/5TwlLFaxcOcELguTWArqaECAECIGJQkCR4iNClfvI7/vW/tu6fJM7NiK/GrwqT/kCLELSfv/uV9xzvvxjBRaNTZprJgo0ug8hQAgQAsWNgADWDVjXepq74fiMHdd+98xh1l4Igs+PDf4ClNwvHheHNbVvfL7Ce7YfTuFfCRTC4AJGtEcIEAJTGwGcKSRZggPM5ql/npM7hmDHscw8p3wTPLr3cB/OnnVPHrYHzi6RYuFklfNe9zxDQeIIAUKAECg0ApwH+Zcj1Lmtcsl8vtQq580C3DrfJppkFTF+saDMncuuCtzesMlf85lr4QSZagrQgSSSECAESggB9JyBaU32QEe4+vTa7/WseuBd1XOGhwnOe0Pyr8HzKqqByHp6WJtj4MjT5mAfenVSILK8dx8JJAQIgRJDQBaUBLhFtv7xU6se2M7rnqdJTalwKBDBw61cQOmQ5FdvX1Xlb9uQHM4lW3yqXqA8QoAQKH8EcGAVxiQrvafPOk889UIdY3Hmyt+kplQAFo7g0T0SBg4GGAuYe7Y/5fCc9XAtngZcU/UD5REChEC5IqAOP+LcfskUHmL2ocbn2z7Y1JjvSU2p4CuQDV53q+QC3bPu2fLk8NyvPhw3OTCwDppsCn9vXTVolxAgBAiBSUMAtXcwU1f3H9o2/bm/+v4ZxrwTUZcCavDJ6idNNbY3vvWcw3v6EOQisZOpZiJ6l+5BCBACxYCAjORu95312rq3PM7JXTXNFLxuucaDz6CCqqmmwyV0z+3d82TMMv2tsPNjJghIxkeTMxBARQgBQoAQKFEE0D4jMFN8hDm9zS/2rn5sZ67rrGYDxESZSbhR5hqIiDl8345nh+bc8nNFNJPbZDY9RWUJAUKgxBAAcseZ/DCwWuU+fqDq2Rv+sZOxrkLMWB0NmMKbaNQ7g7auCK2MRRwffOM/Kodb6vFPFnixYeMpEQKEACFQhgiAbzuaZrztwcrO7b/j5F6gGaujgTdRBI9vMu5V0/ERO+0c2P24NdAZT5K8OsY8Wg0pnxAgBAiBEkVASoRZhb/xpa7VD27mmjvO9J/ANFEmmgtNAk0eyF6c8fP3nx+ec8u9sslCppoL6NAeIUAIlAMCSa+ZaQPH91U9d8M/dTDWPZGmGQ3CCRhk1W510TZhP3Db0/GvHb3FO+OG6+EMkfxF8NABIUAIlDACqKWD18yZoLNny79xcldNMxOqvSN+E2ei0XoraarpPMJabZ3v/8bqawtxUw25TmoI0ZYQIARKFYHkKk1SxMvsgw3/3lX7yKZCxppJB9PEm2i0GqkToNjsuzb+v8HZMAHKUkUToDRsaEsIEAKliQCYZgRZkWoG9m2d+cKXf9jCmBtmdQLPwhjkJKSJ1+C1RqoToGT2yneervA27uAgaAt1a2VoSwgQAoRA6SCges14mnss52of4+SOiuwkkTvClt8l+7LqiIUQkEwRg3ULAzX2cINSfe23Y7aZ1SAC7VST95dFVm2gwoQAIUAIcARQQxctgU65snvnA/1rfz2pphmtTyZPg8caJBcH6d35p4PT3HsW2gLtABK+8SiUgdZBtCUECIFiR4BbX2B91SCr9tUvnrbizuWTaXfXo1UcmrJqjxdr7t7yrG/2V36RMFXgauPqcIW+trRPCBAChECxIZB0iawaOLjH8sIX54PRfVJcIlPBUhwEr/rGK7MYmxO978M3vbO++DdMFFO4TuKbsjiqfCmYxVy3S2tLOZkgYOxT43EmMjItg7Ix5ev5NtbVeKzeLbPvdNfmWvd08jOrZepShZQNdxTBxRvCADuGm7oqj//++311r+4rFu0d8ZhcE43WI+g6CSQPseN7K5t+/2jVcEMbggbPuiGUQb4efu3G+dwWc93y2c6pJMvYp8bjfGKBsvMp3yjLeJxN3dNdi+fTlRnrfrlcO5ZcPFdI2cBSCSbZ/G3x6v4djxUbuWPri4PgeT+ooQw63193wNpf97DVfyZK/vEIDCVCgBAoOgTQgAxvD1PMyyo8J5/uXnHfa8WkuWt4FfT1pt0kq+08RWK1QmLGj2of9c792uNx22X4GqLQwlmBSIUJAUKgwAjIghwTq/r2rhZevvUuD2Pwf/L83Udra/Fo8FoNazEYjyLUvD7vhWnuY8vEeAgO4Z/6xtRK0ZYQIAQIgclBAE3HsixWDR4/5Hzv1t9wcsdxxEn0dx8NiMmKRTNafTCf03mrwHyfXPpNl3zv7v/mmXXzVxXRlGLQdSwxdI4QIAQIgTwjwMkdFs72NPZWti97qPMMa+GmGWFio0Rm2qri0+Cx5sl4NacZ6zA3PfmvFcMnT8EgbIpB10ybSeUIAUKAEMgZAZlBGAKb71TUOrDzl50bFu1k81ZJfD5PzqILI2ASZ7KmaVDdQh4/PvjqD3udM2c3sYq534rbZjrBVIOeNcX5YkrTJDpNCBACJYsAhCGAdehC3czZv/tXg8t/toRr7i9eN+ERIrNBsHgJHluRJPnwK7ednn75Nd0x++xvJyw1FiB5jPlQfAPE2SBPZQkBQqBUEECPGVGKeFhV//7/qHpj/h88LkUuZs1dA7Y0SBJmut7qEsSm2197cHDWN56IOa/Eea745iRNXutJ2hIChEAhEEByV4RYUJzev2e5bek37+9ibBCzinFQ1QhAaRA8IIljr5czwR7/yerfDV/29V/GrDNAh+fVL5U2GLGnY0KAEChqBLire0JIRCD8797tttrb7uweZu2TsTLTeGEqFQ0YPWsgwAMLxV/9/sKqwf2vmmJ+zXESe4ESIUAIEAJ5RkCA2O5xqWrw0GH7/tvu4+SOcbPQCaREUqkQfNKzxiUOMeaLLv3OQ86hg+ukRAhJXvuHSj59CAN6BugZyP0ZYCzOFFlyDh1ttjQ8c1fXcXCHLHKPmVTvnOIeZDXWuK4OPGtcYrSuLuQ8/Pou6TPf/FzMMecahZnU6JPclGO8iI4JAUKAEMgKAZhzI5scw8fbrU0v/2iw7s2DpeAxk6qFpWm/VsMLy7A6yFXxu3e9Fpr1xa/LgiUBlvrSemGl6hHKIwQIgclEAMhdkezDJ7qtTctu92x/bgdLhk+ZzEqN996lY6LRtzC5UAhMEW6zrf3qPQ73kX2CEpfARAM+8iVjHtO3iPYJAUJg8hHAOTaS3dPQX3Fu7d2lTu4IZ2lq8NqDkNTkZ3+afS7w9X3LQrNuuklhEpI8aPLQNGxdofi+kLK19hm3k3FPYx3Ge5zPuudTVqr2TKT8fN8r3/JS4VMOeZfixMnd5mkYrmhbe+fghsf+DGYZoRR83cfqDmxmaackyV/2KXZ98NZ9S0Mzv3CTIkDcmkldb7a0IaXaEwJTDAGN3Aerzq69u3/TY+uA3NUlRUsciNI00ehBT5pr+pvZiYodX/qZw334kKAkyFyjx4j2CQFCYDQEkuReP1TV9vY95UTu2ODS1+C1btNp8oGv710cnnnTzYpgxoFXfImVTzu19tKWECAEckWAD6jahuvdFWfX3DW42bW+XDR3DZjyIj6V5JUZc9mnI/9j1+LQjJu+Ios2DGmA7Syvtmo9SFtCgBAYDwKgucvgLXOyu6J15T3urU9sKgebuxGI8iO9pCYPC3hfE/5Z3cuhmV+8TRbt5Cdv7Hk6JgSmJAJgW1cEIPeE5Bg61mk7teLOoe1PbStHcsfuLT+Cx1YlSX46Y1fGf7p1UXDGl/4+YarU4k+WZ5ux3ZQIAUJgLATQp07BpfYqho+0mpsW3zFct2y3xhdjXViq58qX7JLmmgrGZlvv3PiMr+bm/xW3zoBXGl95pQCDy/jslC+cpfqA51ZvY58aj3OTrvrwas8MysakHatH4/821tV4nI3kdNfmWvd08rGumZQZs00oQBHiEbFq+MBR00f/fs/g3g0HS3kS05itTZ4sANFlctsJKKN61whBxnrjy77zi+qBupfNoR4wu/FBV4wnrz4zWlWMx1q+casvp+3zreGHiXn6ZDzWn9PvazIxT3+Ncd94rMnQX6/laVvjOU2Gtk1VznhOK5Nqq5evv864bzxOJcuYp5etP6eXhfn6csZzxuuM5y851vUplwvH+jLGfe2Yl9XfLFkvfRYvo5ePsvXH+sKG6zOSb5CFsrX6oWjjvnacUrbh2kuux/OG+2EZLWmy8dgonx/rrjWW0cqPJl87b7zu4mNciUkQokGx2r3nA/vBr92ukjusxlSL5pryTeU9tZ8vGOISI3U7wo7j1+60X31dImaq+mvZOh3XosWOLd8XXPk+s9QyQiAbBFCZE8XIEKtx715teedb/9LXmlxHtchXY8qmkaOVNbw6RytW4vm44jn8g3jyttj3nrnDO+ebj0drPj0N/hwGkk/Oei3xJlL1CQFC4BIEuBukKdTFKvv3Pl+14n8+0cZYTznb3I0ITA2CV1sN046B6GFlqBnf+vV3Q1fPez5ccz1wvpQnN0r8W3EqwWl8lMrx2NinxuNc25xvefr65FN2Oll4HtN4n/908lF2JmWw3PnEyd3iO5Ww93+4wFz7k+fcTAmoYkonnvv51oxzp7xNNEZQ6haihw0LL/nvjZVO336zfc4XYtbL5jLBjMaarJ+gi8WP9+G+WAodFRMCxj41Huda13zL09cnn7LTycLz6cro62bcz+TaTMpwufg7VpickCo8J4YcA1v/1bP63kUhlxJhdXBm4dQhd0QjY9SwcNmkZPjPOTeyz0auf+f33hk3f0e21kDzCuVhUzbIUUMIgWJGQCX3RER0Dh9tcHa+/lDv5kVbYKEOkdXOL+vB1NE6ZWoSPKKR9JW/irG5/h+sfMQ3/ab745V/gWfwQZhaf9lgqykRAqWNAAymKqIY97IK96EtlUf/9tHu4+yo9jsv7aaNv/ZTl8iSHjbeuh3BqpPXfWC68lM9omi5JWadZWeCiHZ5TFP3Bai2n74JgVJAQLW3B86yioFdL1re+O5DfX2sdaqTO3bc1CV4bD0uAchcLDjv2sTI6jsOTp9l/kiUpn8+Zp15GRNM4HfD7XVE8ogVJUKg+BDA9ZhBGcOYMvVD09zbfzv01p1PhJjLw1y3gkPFNzRFrfhqPkE1IvLSgMYFdcFOdwXElffevNkVnn7j9+LWyyC8gUAYaRjRlhAoFgQEIHb0b0+EmH3wyInKs6/9unfHkq2gtcugs4HiNrUGU0frFiIvPTLcLg9RypjgPPvzU68kZl0zn8Uytcnj+E6xwFlMddEDXGr7RhyNx7m2Ry8P9zHl6xnSy0a5xmPMyzSluzbXuqeTr68nL8vHyUzBTlbpOVIrbf6Hx9xuPnkJ3aCnvNauR4tmcurR4OENmNjKmC9hn93KcL6r+svQlxplP18/zFHEZ5VdTHXJquJFVtiIo/E41+rq5eG+/jifslFWLrLTXZtr3dPJx/rzlwh8AYErsmQZrvdP63nnN443/uFeIPdm0NyJ3BEmQ1IpzJA5pQ8/qz5J8HsgbKb0g0CNLy4EeMwYSYz6BefwkWNSx5rfDm57Hk0yCbYAfq1qEMHiqnIR1IZIbLROwOEbrjSMVoDyCQFCYAIQwF8hukBKZt9pxeE5trTiw3lPdZ9jTTwSpPpX9wRUozRvQQSfrt+I5NMhROcJgQIggNYYMMdg9FclIjmGT7Q7Bnc84X774Te8jIGjjCKCvX1KTl7KBmwi+GzQorKEACEwEQgguyO5S+ZQB7N5jq2paLr7D72Heg8BsaNnM3xoMDWTjiCCzwQlKkMIEAITgMB5rffA/wAAABLLSURBVB1094hk9dZ3OYf2/Gd0zf1LexkbSmrt5CWTRU8QwY8FFjxvlAgBQmBCEEB2h2lLimgOtjO77+QGU/MTT7gP7D0IHjQwU5UGUsfTC0Two6Gm1xOI6EdDifIJgdwREGCuicIkIR4S7N4TbZbBPU/Z1j30FmjtAxAoDFdd0tZTzv1eU0wCEfxYHY7ETuQ+FkJ0jhAYJwKosKNPO1wug4eMvzlu9zWsMp964NnBgx1H4IcHM1IXwkDq1IwCOU5QL7mMCP4SSCiDECAECowAhgBBN2RRgqX0bJ4Th22D7z83uPF3a+C+6CGDk5YU5iL1Ktd+IIIfC8FMJtiNdT2dIwQIAR0CqK6rE5aEWFiw+prcdt+xpfKqOxcPMnaOPGR0UOVplwh+LCCzMc/wZ3csYXSu5BAw9qnxONcG6eXhPqZCKBW5ytbXU63lxd+jydfy0dApwEfBwH0yTFhqiTv8Lest5/7rPwf2bj0AwkbIQ+ZiSPN1RAQ/FpL4gF54SMcqqZ7Lpmx6aVSiGBAw9qnxONc6GuUZj3OVr78+F9mZXJu6DLorAL0rohTuYQ5f4z7TwI4X2ObHNw5AzCfVHAPnya9d31N52yeCzxuUJIgQIARUBJDpwYaOIQZgzQkpMsgs/pZWm+fAYuXtB2qHVXOMCDFkoBhNWAIUCpaI4AsGLQkmBKYSAkn1nRM2WGJgAFVIhCSrp6HX5ju5Qtxy55KhADsFiMTOm2NcUwmfyWkrEfzk4E53JQTKCAGdxo7+7LEQaOzNXpu/6S1L21NvDuw/vB9iCySYC1R2F5ljJrLjieBHQ1s/0Wm0MpRPCExlBJQksav+7JIgj8AA6imvPdD4jrljzStsz6pDYGf3q5OV5oNfu2sqozUpbSeCHwt2fH7xQ4kQIAR0CHBiBxWIL2cpsPiIZPW1BM3BM+ttvauXu+v+tAMKh/iPRw0xQFEfdehN5C4R/ESiTfciBEoWAU7qwOkYmx1s7ALY2KN+Zg6c8dkCTeuk/m0rhR1LdrvRMwbDC6yah/xPIQYmub+J4Ce5A+j2hEBxIwDErgBRi9wrhg+eSjEvk3xnuh2hxu1Sx7pXE3trj4BnjIcPni4A6hdgMlMh/PmLG6iirB0RfFF2C1WKEJhMBFBbh6R6xOCBxGRZEDGsgP/UOSnQ+rbt7I/eHjjCDsG5EW6K4XFjwOXRBTmUigYBIvii6QqqCCEw2QhwMwyYVUBbV//BwGmcicG2uC10tsnkaXzT3PXINveR0Ed+xqJgihFZLZhi0OfdRaNVk917qe5PBJ8KFS0Pn/ekMqNl0ZYQKC8EtAcctG8cM0WrORhkRDnMTN5Wn2mkc5/D++Ga4KbfbYGl8vqg7RHVjx32amnJvGJ/Fojgi72HqH6EQEEQSGrruDQeWM3hFiJLxJgYGWD2wOl2Fux82+bduCOxbflOPnCK1M/dIrE0zT4tSJcUQCgRfAFAJZGEQHEioJE61E71XReBriGUgIexYJfHET33keRpWM16n/3Acai7uRtdHecp4BGDej2YYbhXZHG2jGqVGgEi+NS4UC4hUCYInCd1jaBFHiFGjkmWUBsQe98x+8ip/Zbe2nUDu9/BQVMffKIel4KxYsgjpsSfAiL40TqQZrKOhgzlFz0CSbs619K5e6PEqToeYUK4n9lH2nvFQNe7LNyy03n0sX09PawFmgQXqTYY1Ne5hu8q+oZSBdMgQAQ/FkD4O0n+VsYqRucIgclFAB9STuSwwSeWD5ZilcB7PcFMwQ4mR4Y7KiLnmqThhnXRjhV7q+rrO7oYG/TjrKV5tegNg9epTzta5CmVBQJE8GXRjXluBLrIcaLgTKH7uet283xLEpcNAioPJwlZJWaYWQoSYJ4pELYcZeaom5mD7V3yyNCeisiJ48LRR991t7NWKBOGTzSIt0MzDMZhr4VFrymVJQJE8GXZrTk1KgFUIcEH17qHxGclIt2jWqhjeN1uTrejizNDQEfqmp86er7AP/RpEUaGYMrRYNQe7e6RQt110XDvzgrvklZlT8Mx8IIBt3UXkPkCjOaIgqDzQFunRTYyg76ESxHBl3Dn5bHqqsaODnNMkUy+1hCEfO0TzLar486rJFmyqaYqNbaIyjT4zW21WAs1OEke6zPFRakQ8xAByVcr52S1l/DNCv4sCWYOgZElPNTD4kNnqyKtDfHeE+/EO/6rqbKN9aP5BaaYqlo6vgiQzF0uzKE0hRAggp9CnT1KU3E4GTwrFMEU6sQ43rstg1sW244/1Zz4q8e+5Bu69hrRXPN50V59w4j9iqqEqRoc66y4Tg9ehWv2ABudn/CCOZBI01dxSPedJHJeLGn/5q9S2EffdDS74HcCyiVGmBAPMttIR0wMDzXEY76DjvipM5bu5/b3Heg6Clo6N72AKDmA8lQvGJBDPusc3in6RQQ/Vsdrvz9tO1bZkjqHDeKEgjq7JIFnhSXQ0mT1HHhZ2PDgWggc1cFJeoOACyKbZtvYx2O3/PMno8J1c53Oubcw5+wvBU2Xz5GlqmrBWmWRbTMkRQTFEl8V3H5/nvDP659E+vqHKEnm+BeRmniHwC6aXHiuGPUxZWRIZvGQxxHvcZvCPSfCvoEdZvlUm71vUbv5JGvtVEkdBkkhZMCqefzvL5CB5hcgeNTYVeH0PXURIIJP1/faTzBduZI4z3kEtTqkYVGMBySLr7HT7j+2XNp/91J3FzsLzdAtqeYCjXyB3OcSzrDtK87AOZzqsp5Vs2oxxCqrvnL/TazmM38dNF398YSp5nLJbL1Ksc2oitlmS4pg4boocg3/4AtFpTF1i3ihnopJ0Gv8PINnl9aX8UHRtZc3SW0q7KqIYHFtDimaW6KDTAz3ReRouENJBDqciY5uU+DUkWDDqj3x3lMDzhHmh+lIwxHG4uiozjV0bnoBFDFkwHnxeJISIaAiQI+F8UlYBTP35sMP5he+J1lV5cMQKy8ORcrgRcjZFYdNJZaIMKu/KWDxN6xwdPxgWd9+jAroAmPLgiTlAjldnEATT2Zd0Drx2UGTDNhqmGkmY1cKf/fDz43Ybvh4RLxyttlsv1a0Vnw2Zq6ZEzXPtMsmJxNEK1j40bwDcOKVKFL94H25sQdykAJ1mj9mGF8AmGdM+X6UjRAY74fHSZywttgS/FaroWKD3/jB/ARAD7ijh4sQDzNLfCBujnn7WcTXGomETliU/s6KaHOP1PJ8fc9p7u2CJnTsL/yolVGSOPB7XNJHUIwSIXAxAmVAXBc3iI6MCAA3oB1WBuVbSUjmwKmYDZdU69r0krR76W6IHhXgCzTUzgeSdalEYhSBBHPpNHUoq6AZQGH1tQl37bwWtlVoZuxPeLX5MsYuG7mZzZEtP64WhE9Mq66ovk501nwubq75eESaMT0qVVWKorlSkCwOZqkUZFOlpJjgBYBX62uBtIn1V0kUz3J6w53zCV8P6ZImUyNcLD/WVRdeZJpkTQJHA2vF/6lncZ/LEyH6ohALwAccV2LhaEKO+01ywG9NDHrMMU8XCw83Bv3Dx0xy94Alsc9nbj3SX93HejrB3MJdF1Ee2s8xLeBt1+4L9yBS57jQV8YIjPWIZyykrAqWjQYPvMCJHalHEczhDmaGAVT7wLbF8ff+sBEiA3pSaOW5dSVqmAs51QFJXTy4dzVjNrDt22PwgbXczI5pbIbzhp9eK1d/4hMJ04w5UdPMmhGlplIQzTNMJtMsQTLXKKK1UjY7zUD+TDZVMFkEs09SfMqt/mnW76drlUahWO78Pu5oBxe2GD5XSoQYmLfg4wcb+UgAtHJPIhF3xxOJAZvi9Vtlt8ecGOoXAl3tsbbXG4Zbhjvt4HsO2lTEAUQOL1UcEMURCzVdTOiYp90wWYA2hMD4EMjmZzC+O5TaVRrB3wsmmuoSNdFo5g60s2N0QF9DvTR8cLHpnf+zFrylO3UeFoUkEtC5deIv1j71zx3uo8aKH/NcxmbK17M5woy/nxk3/0V1zDKrMio47RGl2swUS5XNJF5uMpvxBVAFDp1g97FWgMnHkRDMVgV2ZDgB/kCSLJglULJVTRhdxQUT/xsE/iCALaxeoaBrCrwmFHwrxRPgqpKQ5HhMUHA/HhHlWFhIxIOKHEUC98vxxOBILN4ty/KQWfRFzcwbscaHAlKswyv5Vw3GDrA+sKX0wUsMTStI3toHb4PpAhiaqQVzORKkmSMUlPKPAJloxsIUf5IXfpZjlSyCc1hRThRoy5ZEWFYNXB67bL7Df5QO3PenwW6MNwJlXECkE+NhgaaV0XBJogrc6loIZRZoZBjvcbF2dkJoY2xTqmstYOuvgIvt0auYNWFjloSVmWXzTIskXG1iklOMCVWw+pBFlESbFFcsUAEYQoGtqFh5ZdQvIHchxOugwBnQyGG5opgsKb6EIIfg058Q2emYGGNRKcxi5lYWgcIjcO/AOdDCwZKuwAdsW4akaeJa9gLYufjFpp5JladdQ1tCII8I8Oc9j/JKX5Reg59WMho8WoTRWg2qaoSZvQ0+a6DxLUvTD5cM1rPj0ClRrrUbzCbF21lA/Ei/CxfC84ksmUwX26S13Inb6k1Q/K4LoXrnB6YxB2tNiRAoGgSI4I1dUXoEj14WoLXGGLjVxe3B5vXm3tqXHDtX7MaBO5XYkXjKxgyQfGZTcGmKLN69qZ7ybMqet/sTgRt/LnRc3AiQiaa4+2e02mkaO56XJP8ZGLls2W3pf++F2Pant4GdfXBo3ioJIgSCCeTiwc7RBJZQfpKaU7B2iqxR25VN2VGF0AlCoLgRIIIv7v65tHbqACp+i1J0gFm8DSesvn3LYhsfeQuIfQCsBLgAMtrZUbOnRAgQAlMYASL4kuh8VFqTA6gyDqB6ILRAc4fNd3SZ6cC9K9zd7BSYYi74TbvIlFAS3UqVJAQKjAAR/FgAI68mDQJjFSvcuSSxo9cFH0Adkcy+pmF74ORq86kfveQ+werh3hE+UQk1dlfhakKSCQFCoPQQIIIvyj7T3irczAKhBWKCOdAStwaa1zh6l/+xf9eaOqh2lPuZ4xxKjEVCiRAgBAgBAwJE8AZAJv8QyB1noCLHK7JkCpxltlDzTqlv24vKjme29TM2xFe6r4Xz5E89+d1FNSAEihgBIvii6RyN2MG9AwdQI31gZ286bvPuXiJt/O0aiPfdy+1F6D8jkMZeNN1GFSEEihgBIvji6Byg7aSdPepldn99u8l3/BVr3X0rB3wwgMog+BRq9Dgz9ELQreKoOdWCECAEihYBInhj16DpA9OFUFDqcd6/OWPjFw8tICRCgsnXMmgPHFspNN6x1NvITsK5C7HZyW877z1AAgmBckeACH6sHkb6xcS5OLnlGWm+kIy1a1MXVTV2DLAlx8EzpjlqDTf+2db2wiL3/p374JLkDFRQ2ctvolJqRCiXECAE8o4AEXw6SDWi1rbpyuP5lGUxk6vh+LcBEHtCkILnmD3YtF1yb3tJ3P7se2Bn94E/O5A6FCRiRyQpEQKEQA4IEMHnAF7mlwK5q54xyPKwBmo3TlQ6bhvesyiy5bH1EJWwh8eMWQBnsRwlQoAQIATygAARfB5AHFMEBhVAzR1js2MIX99HZ23+468p63/xOsQOb4drYYISDKKixu4aUxKdJAQIAUIgKwSI4LOCK9PC3ByDX+oAajzIzIHGISD3N6SOO173HGYngPFVQneRnT1TVKkcIUAIZIcAEXx2eKUpnSR2dHnkq4jCAKq/KQx29g2WrmUvuj/cfBAEhNQ1UEljTwMmnSYECIEcESCCzxHAC5cDuat2dhFWfxNMoXMMFt141zr87tKh917YDOVgTWUoQxOVLkBGe4QAIVBQBIjgx4IXFfK0Kam1M9DIZUUSYQDVFmw8ah7au8j87oKN4BnTcz60AEaEJH/2tIhSAUKAEMgPAkTw6XAcleThBPd4AcaG0AJi3CNZ/PVnLN4DfxQ2/nK5l7G2pJ2dYrOnw5jOEwKEQEEQIIIfH6w4USk5gBpgVn/DsDnUuMzW/JM3B+pxANUF3I5rdYLG7krtFT++29JVhAAhQAhkjgARfMZYJU0xGAsGNHZBjsJSeS1BW7D+z6b2xS87D75/sBNnoPKl8uYnmODKWDIVJAQIAUKgEAgQwWeEatIcA8QO3o0CLG7NrMFTW80DKxd56t58H0T4PNyXHSzsFJs9I0SpECFACBQeASL4dBjzNVD5AKoojXQxW6DxkNm7b5Ft8//dAPF7B5IzUDGEL81ATYclnScECIEJRYAIfjS4ka7RKpNIWGAAlVn8Ta123/5lysYHV3j4DFRc3HohzUAdDT/KJwQIgUlHgAh+tC6Q44zBf6v3cBd4x6wyHblz2XAHa4Li8WRoARpAHQ07yicECAFCoCgRwEFSSI7b9zzunL9+6/Qb2Jfh0AqeMaCtQ8wYBtEeKREChAAhUAII/H9eKaduW4fu6QAAAABJRU5ErkJggg=='}} style={{ height: 16, width: 16 }}></Image>
                    <Text style={{ color: '#0084FF', textAlign: 'center', marginLeft: 10 }}>MESSAGE</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: width / 5 }}>
                    <TouchableOpacity onPress={() => {
                      Linking.canOpenURL("fb://page/" + "318363321543421").then(supported => {
                        if (supported) {
                          Linking.openURL("fb://page/" + "318363321543421");
                        } else {
                          Linking.openURL(this.state.FBLink);
                        }
                      });
                    }}>
                      <Image source={{uri:'https://lh3.googleusercontent.com/-H0NFikmaPUo/WgvtquKhCUI/AAAAAAAAAP8/isqBUL-ATzghH3J_stg_rD192vyeUO_cwCK8BGAs/s64/2017-11-14.png'}} style={{ height: 24, width: 24 }} />
                      <Text style={{ color: '#707070', textAlign: 'center', fontSize: 12 }}>Like</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                      Share.open(shareOptions)
                    }}>
                      <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhCg8RFh+PaxsVAAAEl0lEQVRo3sWYb2wTZRzHv7/bdWPg3BYMgWzTRFxiMKDxhWKCCAMxZEMZrrIXIpqYRbLM3WkGZm/WYExgwfUaGMbx1rCNIdnK+BOUbDNEAw7UGH2l8U/8u4Stm2PQru3PF33atV2vvbte1ydp8vy75/O55/r8nucOsCGp661fK9khwCeVhrwKwIFeqwr2CAAyeltfzqcAIFOfFQX7BCwq2ClgScFeAUCmPmVPPgUAGf1mFOwVCJhXsFWAGjEnFAw/CFsFeESqEwoOowo2/we6EhTU+iUXSFTg/swK9q8CdI2g1rhCDgQAbdS4Qk4EzCjkSEAo3IkqKLuXXADQRimmgDN6CvYI6IziHsusQNaIzSvlx1AtVeMRrsZarBDV5Zovuaf6HF8Q7fN4RRvMWuBAeeEe2osaFKRoTCEAtG6mi1EFcrqHLAscLPG/RI3YAYdul5QC6RUMCriWTSvcjpKUjUFM8L80AwTqTs6mvl5fwZCA2shH8FBCVRg38TmP0e/zE92T4Mxj6ClkFFCe4S7aGFcxg15c8Y98NGVs7uJu41m+tFghrUCTY7kHB+Iq/iAteOr4jFl0nMJF3BdR4AaPN4NA80rHWWyJFb/nzrv9PfNW4XoKugIt6wrO42FR8HPHX8cGQtnBFykE2Onx6ggotTiN+yN5uon97h/sgEdS6ya6tKCQMoiqTfAKfJA7SjfaiQfKx/GdyBbSvhQzoG7nyyLO+WlvcuTKNrmW+Qbxgih4y5yLBFrWyl9zOQBgjnd7Psst3hVIiugHS3CVHwQAzPBOz2iu8UkbqUuaP83rAAB3aJvnmu34oWQ8IMd3mfqA6iI5fksbzwF+RzI+IQ6oT/F1UXnK3ZRuMKWMKsKVqKRKquBCmsYMT2MSv/45phcr9PAJM8BHRebb0rdTDeIsqNocakANVWEFC3MWv0iqKIdPB+/F86nwcQLKThF2Z8npupeMXrNFcqI+vMrKASodPibgknxHRM2H7p/iO6jr0cL1eMAC2QA+JjD1Km0AANwOdS00HioNHObmRYevSYzzLWmCp+CjKQ6iiLvp0dR4tdg3lA4vBFqK6H1R7oxttqTs9x/FqoWufI+GcS504/jPyYMo03p49mJ7OrwQkBsjwYf/uXtCDPkkdyP+GHIFnxQNdv5nZvKN4IUAvxgpSJ09c4BL9nWhmWIhioa5Q7tlBm0cD8hAS5FYoWHuA9Ri3wBqY/CraHffMAsH1GKcx7bMeEAG5K0c2Z2/1P4+VOofxibRNkvvunvMwyN4NoQHZCC8K7K66Wzbav9lPC5avgi+fuKXXOMBCaBdAAAOfzN/LYY/VrZ1KfCArDyBKgDAberDGgBAmN5xe6zAAbWYh1FjHA/IvEGE12is8/M+bcAaPrhc/tQcHpDFXUcT02tW8YB8Dk+bwwMyJQiwSztjFQ+YxwMSVsfh+zyHs8BHkwl8wiOgH8veWGo8IMUEwvxm8jkg9/j4R9CtfbX0eEASHx1+C7TnAx87lnOb3reN3OKjAtc9ltd+dnghQG1Z4oes4gEorNj8+ml2BkJ4L58CUD7OKx6SoyO/Av8DigLp4hJprnMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTAtMTVUMTc6MjI6MzErMDI6MDC5LAaSAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTEwLTE1VDE3OjIyOjMxKzAyOjAwyHG+LgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII='}} style={{ alignSelf: 'center', height: 24, width: 24 }} />
                      <Text style={{ color: '#707070', textAlign: 'center', fontSize: 12 }}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: 3, width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
                <Text style={{ textAlign: 'center', margin: 10 }}>{this.state.Category + " in " + this.state.City + ", " + this.state.Country}</Text>
                <View style={{ marginTop: 3, width: width, height: 20, backgroundColor: '#d1d1d1' }} />
                <View style={{ flexDirection: 'column', margin: 10 }}>
                  <Text>About</Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ height: 16, width: 16 }} 
                    source={{uri:'https://lh3.googleusercontent.com/-IPuuqhqKAp4/Wgvt8Fuc79I/AAAAAAAAAQU/DU5EeprnAD0EMU57ydHrEY47BGJJ8WZYQCK8BGAs/s32/2017-11-14.png'}} />
                    <Text style={{ marginLeft: 10 }}>{this.state.About}</Text>
                  </View>
                  <View style={{ width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
                  <TouchableOpacity onPress={() => {
                    this.openCustomizedCustomTabs(this.state.Website)
                  }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                      <Image style={{ height: 16, width: 16 }} source={{uri:'https://lh3.googleusercontent.com/-3v6RCAahhEo/WgvuB9ee96I/AAAAAAAAAQY/I4kSvEIMP_cOi9gHJ9fwPIOBImmJxrjPQCK8BGAs/s32/2017-11-14.png'}} />
                      <Text style={{ textAlign: 'center', marginLeft: 10 }}>{this.state.Website}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
                  <TouchableOpacity onPress={() => {
                    var email = "mailto:?to=" + this.state.Email;
                    console.log(email);
                    Linking.canOpenURL("mailto:?to=" + this.state.Email).then(supported => {
                      if (supported) {
                        Linking.openURL("mailto:?to=" + this.state.Email);
                      } else {
                      }
                    });
                  }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>

                      <Image style={{ height: 16, width: 16 }} 
                      source={{uri:'https://lh3.googleusercontent.com/-S30aiOufKWg/WgvuJyygJPI/AAAAAAAAAQc/sNiQazJhZksen6KZM8WbseqUVpIiYcEVgCK8BGAs/s32/2017-11-14.png'}} />
                      <Text style={{ textAlign: 'center', marginLeft: 10 }}>{this.state.Email}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginTop: 3, width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
                </View>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                  <Text>Community</Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ height: 16, width: 16 }} source={{uri:'https://lh3.googleusercontent.com/-H0NFikmaPUo/WgvtquKhCUI/AAAAAAAAAP8/isqBUL-ATzghH3J_stg_rD192vyeUO_cwCK8BGAs/s64/2017-11-14.png'}} />
                    <Text style={{ marginLeft: 10 }}>{this.state.TotalLikes + " people like this"}</Text>
                  </View>
                </View>
                <View style={{ marginTop: 3, width: width, height: 20, backgroundColor: '#d1d1d1' }} />
                <FlatList
                  data={this.state.data}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor} />
              </View>
            </ScrollView>
          </MenuContext>
        );
      }
    }
    catch (error) {
      Toast.show('error fetching data', Toast.LONG);
    }
  }
}                                     
