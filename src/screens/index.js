import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Login from './login';
import Splash from './splash';
import LiveClass from './live';
import LiveTV from './liveTV';
import Contact from './contact';
import FacebookPage from './facebook';
import VideoClass from './video';
import VideoPlay from './videoplay';
import AudioPlay from './audioplay';
import AudioList from './AudioList';
import AudioClass from './audio';
import GalleryView from './galleryView';
import AlbumView from './AlbumView';
import Gallery from './gallery';
import ImageView from './imageView';  
import YoutubePlaylist from './youtubePlaylist'; 

export function registerScreens() {
  Navigation.registerComponent('example.Login', () => Login);
  Navigation.registerComponent('example.Splash', () => Splash);
  Navigation.registerComponent('example.LiveClass', () => LiveClass);
  Navigation.registerComponent('example.LiveTV', () => LiveTV);
  Navigation.registerComponent('example.Contact', () => Contact);
  Navigation.registerComponent('example.FacebookPage', () => FacebookPage);
  Navigation.registerComponent('example.VideoClass', () => VideoClass);
  Navigation.registerComponent('example.AudioPlay', () => AudioPlay);
  Navigation.registerComponent('example.AudioList', () => AudioList);
  Navigation.registerComponent('example.VideoPlay', () => VideoPlay);
  Navigation.registerComponent('example.AudioClass', () => AudioClass);
  Navigation.registerComponent('example.GalleryView', () => GalleryView);
  Navigation.registerComponent('example.Gallery', () => Gallery);
  Navigation.registerComponent('example.ImageView', () => ImageView);
  Navigation.registerComponent('example.YoutubePlaylist', () => YoutubePlaylist);
  

}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
