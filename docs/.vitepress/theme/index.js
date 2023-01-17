import DefaultTheme from 'vitepress/theme'
import GlobalComponent from '../../../components/GlobalComponent.vue'
import AudioA from '../../../components/AudioA.vue'
import User from '../../../components/User.vue'
import MyLayout from '../../../components/MyLayout.vue'
import SearchSong from '../../../components/SearchSong.vue'
import "element-plus/dist/index.css";
import ElementPlus from 'element-plus'
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import store from '../store';
export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({app}){
    app.use(ElementPlus)
    app.use(store)
    app.component('GlobalComponent',GlobalComponent)
    app.component('AudioA',AudioA)
    app.component('SearchSong',SearchSong)
    app.component(APlayer, {
      defaultCover: 'https://github.com/u3u.png',
      productionTip: true,
    });
  }
}