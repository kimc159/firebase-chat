import Vue from 'vue'
import Router from 'vue-router'
import ChatListPage from '@/components/Page/ChatListPage'
import SettingPage from '@/components/Page/SettingPage'
import UserLoginPage from '@/components/Page/UserLoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLoginPage',
      component: UserLoginPage
    },
    {
      path: '/chatlist',
      name: 'ChatListPage',
      component: ChatListPage
    },
    {
      path: '/setting',
      name: 'SettingPage',
      component: SettingPage
    }
  ]
})
