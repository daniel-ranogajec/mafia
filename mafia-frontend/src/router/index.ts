import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import JoinRoom from '@/views/JoinRoom/JoinRoom.vue'
import CreateRoom from '@/views/CreateRoom/CreateRoom.vue'
import PlayRoom from '@/views/PlayRoom/PlayRoom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/JoinRoom',
      name: 'JoinRoom',
      component: JoinRoom
    },
    {
      path: '/CreateRoom',
      name: 'CreateRoom',
      component: CreateRoom
    },
    {
      path: '/PlayRoom',
      name: 'PlayRoom',
      component: PlayRoom
    }
  ]
})

export default router
