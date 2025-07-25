import DefaultTheme from 'vitepress/theme'
import MyLayout from '../../../components/MyLayout.vue'
import Music from '../../../components/Music.vue'
import SearchSong from '../../../components/SearchSong.vue'
import SplashCursor from '../../../components/SplashCursor.vue'
import ShinyText from '../../../components/ShinyText.vue'
import InfiniteMenu from '../../../components/InfiniteMenu.vue'
import FallingText from '../../../components/FallingText.vue'
import Loxbe from '../../../components/Loxbe.vue'

import gsapJy from '../../view/gsapJy.vue'
import gsapBase from '../../view/gsapBase.vue'
import gsapBase2 from '../../view/gsapBase2.vue'
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
    app.component('gsapJy',gsapJy)
    app.component('gsapBase',gsapBase)
    app.component('gsapBase2',gsapBase2)
    app.component('Music',Music)
    app.component('SearchSong',SearchSong)
    app.component('SplashCursor',SplashCursor)
    app.component('ShinyText',ShinyText)
    app.component('InfiniteMenu',InfiniteMenu)
    app.component('FallingText',FallingText)
    app.component('Loxbe',Loxbe)
  }
}