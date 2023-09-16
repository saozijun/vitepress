/*
 * @Description: 
 * @Version: 2.0
 * @Author: volcano
 * @Date: 2022-12-06 12:38:21
 * @LastEditors: volcano
 * @LastEditTime: 2023-09-15 23:56:41
 */
import DefaultTheme from 'vitepress/theme'
import MyLayout from '../../../components/MyLayout.vue'
import Music from '../../../components/Music.vue'
import SearchSong from '../../../components/SearchSong.vue'
import Collection from '../../../components/collection.vue'
import home from '../../view/home.vue'
import "element-plus/dist/index.css"
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
    app.component('SearchSong',SearchSong)
    app.component('Collection',Collection)
  }
}