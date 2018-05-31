import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'versions-page',
      component: require('@/components/VersionsPage').default
    },
    {
      path: '/versions-page/:id',
      name: 'detail-page',
      component: require('@/components/DetailPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
