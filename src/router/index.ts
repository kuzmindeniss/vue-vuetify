import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UsersForm from '@/components/UsersForm.vue';
import UserComponent from '@/components/UserComponent.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: UsersForm
  },
  {
    path: '/employee/:id',
    name: 'employee',
    component: UserComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
