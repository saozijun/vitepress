import DefaultTheme from 'vitepress/theme'
import MyLayout from '../../../components/MyLayout.vue'
import Music from '../../../components/Music.vue'
import SearchSong from '../../../components/SearchSong.vue'
import "element-plus/dist/index.css"
import ElementPlus from 'element-plus'
import 'aplayer/dist/APlayer.min.css'
import store from '../store'
export default {
  ...DefaultTheme,
  Layout:MyLayout,
  enhanceApp({app}){
    app.use(ElementPlus)
    app.use(store)
    app.component('Music',Music)
    app.component('SearchSong',SearchSong)
  }
}