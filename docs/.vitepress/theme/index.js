import DefaultTheme from 'vitepress/theme'
import MyLayout from '../../../components/MyLayout.vue'
import Music from '../../../components/Music.vue'
import SearchSong from '../../../components/SearchSong.vue'
import Crad from '../../../components/Crad.vue'
import SplashCursor from '../../../components/SplashCursor.vue'
import ShinyText from '../../../components/ShinyText.vue'
import InfiniteMenu from '../../../components/InfiniteMenu.vue'
import FallingText from '../../../components/FallingText.vue'
import home from '../../view/home.vue'
import "element-plus/dist/index.css"
import 'animate.css';
import './styles/index.css'
import ElementPlus from 'element-plus'
import 'aplayer/dist/APlayer.min.css'
import store from '../store'
export default {
  ...DefaultTheme,
  Layout:MyLayout,
  enhanceApp({app}){
    app.use(ElementPlus)
    app.use(store)
    app.component('home',home)
    app.component('Music',Music)
    app.component('Crad',Crad)
    app.component('SearchSong',SearchSong)
    app.component('SplashCursor',SplashCursor)
    app.component('ShinyText',ShinyText)
    app.component('InfiniteMenu',InfiniteMenu)
    app.component('FallingText',FallingText)
  }
}