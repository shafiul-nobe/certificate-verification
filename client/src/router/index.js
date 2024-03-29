import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '../components/Home.vue'
import VerifyMeta from '../components/VerifyMeta.vue'
import DocumentComponent from '../components/Document.vue'

Vue.use(Router)

const  routes = [
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent
    },
    {
      path: '/upload-document',
      name: 'Document-Upload',
      component: DocumentComponent
    },
    {
      path: '/verify',
      name: 'Verify',
      component: VerifyMeta
    },
    {
      path :'*',
      component:HomeComponent
  }
  ]

export default new Router({
    mode: 'history',
    routes
})