import DefaultTheme from 'vitepress/theme'
import GlobalComponent from '../../../components/GlobalComponent.vue'
import AudioA from '../../../components/AudioA.vue'
import "element-plus/dist/index.css";
import ElementPlus from 'element-plus'
export default {
  ...DefaultTheme,
  enhanceApp({app}){
    app.use(ElementPlus)
    app.component('GlobalComponent',GlobalComponent)
    app.component('AudioA',AudioA)
  }
}