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
  ToastAndroid,
  RefreshControl
} from 'react-native';
import {
  CustomTabs,
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE
} from 'react-native-custom-tabs';
import Orientation from 'react-native-orientation-locker';
import {Menu, MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
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

export default class FacebookPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (<TouchableOpacity onPress={() => navigation.navigate('LoginPage')}><Icon name='navigate-before' style={{ marginLeft: 10 }} size={40} color={'white'} /></TouchableOpacity>)
  });

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    NetInfo.isConnected.fetch().then(isConnected => { 
      if(isConnected)
      {
        this.getCoverPicture();
        this.getFbLink();
      }
      else{
        ToastAndroid.show('Oops no internet connection !', ToastAndroid.SHORT);      }
     });     
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
  }
  //177526890164
  //318363321543421
  getData() {
    // https://graph.facebook.com/v2.10/318363321543421/?fields=posts{created_time,attachments,message,likes.limit(1).summary(total_count)}&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao
    return fetch('https://graph.facebook.com/v2.10/318363321543421/?fields=posts{created_time,attachments,message,likes.limit(1).summary(total_count),comments.limit(1).summary(true),shares.limit(1).summary(true)}&access_token=139003756724341|9ZrwPqUzrJWTCPGsy7--ooO13ao')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("response+++++++" + responseJson.posts.data)
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
        console.error(error);
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
        console.log("FB LInk", responseJson.link)
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
    //console.log("Shares"+itemData.item.shares.count)
    if (itemData.item.shares.count >= 1000) {
      shares = (itemData.item.shares.count / 1000).toFixed(1) + "K"
    }
    else {
      shares = itemData.item.shares.count
    }
    var createdTime = moment(itemData.item.created_time).fromNow();
    console.log("created time", createdTime);
    if (itemData.item.attachments.data[0].subattachments) {
      //console.log("Data==============" + itemData.item.attachments.data[0].subattachments.data.length)
      // console.log("Data==============" + itemData.item.attachments.data[0].media.image.src)                       
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
              {/* <Image style={{height:16,width:16}} source={require('../images/menu.png')}/> */}
              <Menu>
                <MenuTrigger >
                  <Image style={{ height: 24, width: 24 }} source={require('../images/menu.png')} />
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
                ///console.log("image album", itemDataInner.item.media.image.src)
                return (
                  <TouchableOpacity style={{ alignItems: 'center',flexDirection:'row' }} onPress={() => {
                    Linking.canOpenURL(itemDataInner.item.url).then(supported => {
                      if (supported) {
                        Linking.openURL(itemDataInner.item.url);
                      } else {
                        console.log('Don\'t know how to open URI: ' + this.props.url);
                      }
                    });
                  }}>
                    <Image style={{ width: itemDataInner.item.media.image.width / 1.5, height: itemDataInner.item.media.image.height / 1.5, resizeMode: 'stretch' }} source={{ uri: itemDataInner.item.media.image.src }} />
                    <View
                          style={{
                          width: 10,
                          height: width,
                          backgroundColor: 'rgba(0,0,0,0.0)'
                         }}/>
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
      return (
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: this.state.ProfilePicture }} />
              <View style={{ flexDirection: 'column', flex: 1, flexWrap: 'wrap' }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>{this.state.PageName}</Text>
                <Text style={{ marginLeft: 10 }}>{createdTime}</Text>
              </View>
              <Menu style={{padding:10,borderRadius:5}}>
                <MenuTrigger >
                  <Image style={{ height: 24, width: 24 }} source={require('../images/menu.png')} />
                </MenuTrigger>
                <MenuOptions style={{padding:10,borderRadius:5}}>
                  <MenuOption  onSelect={() => Share.open(shareOptions)} text='Share' />
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
              <Image style={{ width: itemData.item.attachments.data[0].media.image.width / 1.5, resizeMode: 'stretch', height: itemData.item.attachments.data[0].media.image.height / 1.3 }} source={{ uri: itemData.item.attachments.data[0].media.image.src }} />
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
  openCustomizedCustomTabs(link) {
    console.log("passed link"+link)                                           
    this.openGoogle({
      toolbarColor: '#601983',
      enableUrlBarHiding: true,                         
      showPageTitle: true,             
      enableDefaultShare: true,
      animations: ANIMATIONS_FADE                       
    },link);
  }

  openGoogle(option,link) {
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

    if (this.state.isLoading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator color={'#601983'} animating={true} size={'large'} />
        </View>
      )
    }
    else {
      return (
        <MenuContext style={{flex:1}}>                                            
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />} style={{ flex: 1 }}>
          <View style={{backgroundColor:'#FFF'}}>                               
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
                  }
                });
              }} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#0084FF', marginLeft: 5, padding: 9, width: width / 2 - 12.5, borderRadius: 5 }}>
                <Image source={require('../images/mess.png')} style={{ height: 16, width: 16 }}></Image>
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
                  <Image source={require('../images/thumb-up.png')} style={{ height: 24, width: 24 }} />
                  <Text style={{ color: '#707070', textAlign: 'center' , fontSize: 12}}>Like</Text>
                </TouchableOpacity>                                                             
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                  Share.open(shareOptions)
                }}>
                  <Image source={require('../images/share.png')} style={{ alignSelf: 'center', height: 24, width: 24 }} />
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
                <Image style={{ height: 16, width: 16 }} source={require('../images/info.png')} />
                <Text style={{ marginLeft: 10 }}>{this.state.About}</Text>
              </View>
              <View style={{ width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
              <TouchableOpacity onPress={() => {
                  this.openCustomizedCustomTabs(this.state.Website)
              }}>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                  <Image style={{ height: 16, width: 16 }} source={require('../images/web.png')} />
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

                  <Image style={{ height: 16, width: 16 }} source={require('../images/mail.png')} />
                  <Text style={{ textAlign: 'center', marginLeft: 10 }}>{this.state.Email}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 3, width: width, height: 0.5, backgroundColor: '#d1d1d1' }} />
            </View>
            <View style={{ flexDirection: 'column', margin: 10 }}>
              <Text>Community</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Image style={{ height: 16, width: 16 }} source={require('../images/thumb-up.png')} />
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
}                                     
