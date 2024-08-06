import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import JoinRoom from '@/views/JoinRoom/JoinRoom.vue'
import CreateRoom from '@/views/CreateRoom/CreateRoom.vue'
import PlayRoom from '@/views/PlayRoom/PlayRoom.vue'
import LobbyRoom from '@/views/CreateRoom/LobbyRoom.vue'

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
      path: '/CreateRoom/:id',
      name: 'CreateRoom',
      component: CreateRoom
    },
    {
      path: '/PlayRoom/:id',
      name: 'PlayRoom',
      component: PlayRoom
    },
    {
      path: '/LobbyRoom/:id',
      name: 'LobbyRoom',
      component: LobbyRoom
    }
  ]
})

export default router
