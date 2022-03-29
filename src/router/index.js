import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'


const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    // if page exists parse the string to integer, else return 1
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  {
    // Nested Routes
    // this route will handle the redirect for the Layout route
    path: '/event/:id',
    redirect: to => {
      return {name: 'EventDetails', params: {id: to.params.id}}
    },
    // we also need to redirect the nested routes or the app will break
    children:  [
      {
        path: 'register', 
        redirect: () => ({name: 'EventRegister'})
      },
      {
        path: 'edit', 
        redirect: () => ({name: 'EventEdit'})
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    // Match all routes that don't match an existing route
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    // 404 page using the prop called resource from the NotFound component
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  // this will remove the hash from the url
  history: createWebHistory(),
  routes
})

export default router
