import Vue from 'vue'
import Router from 'vue-router'
import UserListPage from '@/components/Page/UserListPage'
import ChatListPage from '@/components/Page/ChatListPage'
import SettingPage from '@/components/Page/SettingPage'
import UserLoginPage from '@/components/Page/UserLoginPage'
import Signup from '@/components/User/Signup'
import ChatRoom from '@/components/Room/ChatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserLoginPage',
      component: UserLoginPage
    },
    {
      path: '/userlist',
      name: 'UserListPage',
      component: UserListPage
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
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/room/:id',
      props: true,
      name: 'ChatRoom',
      component: ChatRoom
    }
  ]
})
