import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '../services/EventService.js'
// import the GStore global state object
import GStore from '@/store'


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
    // api call moved here from the Layout component
    beforeEnter: (to) => {
      // fetch the event by id and set local event data
      // 'to' gives us the target route
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data
      }).catch(error => {
        // console.log(error)
        if (error.response && error.response.status == 404) {
          // here we handle the 404 error for our pages and events
          // if it doesn't exist load 404
          // here and in the else we return a path to redirect
          return {
            name: '404Resource',
            params: { resource: 'event' }
          }
        } else {
          // otherwise assume network error and 
          // load the network error component
          return {name: 'NetworkError'}
        }
      })
    },
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
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// start the progress bar before navigation
router.beforeEach(() => {
  NProgress.start()
})
// finish the progress bar after navigation
router.afterEach(() => {
  NProgress.done()
})

export default router
