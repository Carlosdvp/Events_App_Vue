import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    // if page exists parse the string to integer, else return 1
    props: route => ( { page: parseInt(route.query.page) || 1 } )
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  // this will remove the hash from the url
  history: createWebHistory(),
  routes
})

export default router
