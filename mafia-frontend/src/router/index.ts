import {createRouter, createWebHistory, useRoute} from 'vue-router'
import HomeView from '../views/Home.vue'
import JoinRoom from '@/views/JoinRoom/JoinRoom.vue'
import CreateRoom from '@/views/CreateRoom/CreateRoom.vue'
import PlayRoom from '@/views/PlayRoom/PlayRoom.vue'
import LobbyRoom from '@/views/CreateRoom/LobbyRoom.vue'
import {useWebsocket} from "@/stores/websocket";

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

router.beforeEach((to, from, next) => {
  if (['CreateRoom', 'LobbyRoom', 'PlayRoom'].includes(to.name)) {
    const roomId = to.params.id
    if (roomId) {
      const ws = useWebsocket()
      ws.roomId = roomId
      ws.joinNewSocket()
    } else {
      console.error('No room ID provided in the route parameters.')
      return next('/')
    }
  }
  next()
})

export default router
