import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/AboutView.vue'
import Dashboard from '../components/Dashboard.vue'
import CreateUser from '../views/CreateUser.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/about',
			component: () => import('../views/AboutView.vue')
		},
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/CreateUser',
      name: 'CreateUser',
      component: CreateUser
    },
	],
})

export default router

