import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Todo from './components/Todo.vue'
import Admin from './components/Admin.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
    name: 'Login',
    component: Login
        },
      {
      path: '/Signup',
    name: 'Signup',
    component: Signup
        },
      {
      path: '/Todo',
    name: 'Todo',
    component: Todo
        },
      {
      path: '/Admin',
    name: 'Admin',
    component: Admin
    },
    ],
  mode: "history",
  scrollBehavior() {
        return {x: 0, y: 0}
    }
})