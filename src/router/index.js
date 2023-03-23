import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/AboutView.vue'
import Dashboard from '../components/Dashboard.vue'
import ListarUsuario from '../components/Usuarios/ListarUsuario.vue'
import CrearUsuario from '../components/Usuarios/CrearUsuario.vue'

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
      path: '/listar',
      name: 'listar',
      component: ListarUsuario
    },
    {
      path: '/Crear',
      name: 'Crear',
      component: CrearUsuario
    },
    {
      path: '/Editar',
      name: 'Editar',
      component: () => import('../components/Usuarios/EditarUsuarios.vue')
    },
	],
})

export default router

