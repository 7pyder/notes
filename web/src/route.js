import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth'

const routes = [
  {
    path: '/login',
    component: () => import('./components/Login')
  },
  {
    path: '/register',
    component: () => import('./components/Register')
  },
  {
    path: '/notes',
    meta: {requiresAuth: true},
    component: () => import('./components/Notes')
  },
  {
    path: '*',
    redirect: '/login'
  }
]

Vue.use(Router)

const router = new Router({routes})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
