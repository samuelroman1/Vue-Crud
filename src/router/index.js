import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/AboutView.vue'
import Dashboard from '../components/Dashboard.vue'
import ListarUsuario from '../components/Usuarios/ListarUsuario.vue'
import CrearUsuario from '../components/Usuarios/CrearUsuario.vue'
import ListarCliente from '../components/Clientes/ListarCliente.vue'
import CrearClientes from '../components/Clientes/CrearClientes.vue'
import ListarDepartamentos from '../components/Departamentos/ListarDepartamentos.vue'
import CrearDepartamentos from '../components/Departamentos/CrearDepartamentos.vue'
import ListarPuestos from '../components/Puesto/ListarPuestos.vue'
import CrearPuestos from '../components/Puesto/CrearPuestos.vue'
import ListarRoles from '../components/Rol/ListarRoles.vue'
import CrearRoles from '../components/Rol/CrearRoles.vue'
import ListarFacturas from '../components/Factura/ListarFacturas.vue'
import CrearFacturas from '../components/Factura/CrearFacturas.vue'

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
    {
      path: '/listarCliente',
      name: 'listarCliente',
      component: ListarCliente
    },
    {
      path: '/CrearCliente',
      name: 'CrearCliente',
      component: CrearClientes
    },
    {
      path: '/EditarClientes',
      name: 'EditarClientes',
      component: () => import('../components/Clientes/EditarClientes.vue')
    },
    {
      path: '/listarDepartamento',
      name: 'listarDepartamento',
      component: ListarDepartamentos
    },
    {
      path: '/CrearDepartamentos',
      name: 'CrearDepartamentos',
      component: CrearDepartamentos
    },
    {
      path: '/EditarDepartamentos',
      name: 'EditarDepartamentos',
      component: () => import('../components/Departamentos/EditarDepartamentos.vue')
    },
    {
      path: '/listarPuesto',
      name: 'listarPuesto',
      component: ListarPuestos
    },
    {
      path: '/CrearPuestos',
      name: 'CrearPuestos',
      component: CrearPuestos
    },
    {
      path: '/EditarPuestos',
      name: 'EditarPuestos',
      component: () => import('../components/Puesto/EditarPuestos.vue')
    },
    {
      path: '/listarRoles',
      name: 'listarRoles',
      component: ListarRoles
    },
    {
      path: '/CrearRoles',
      name: 'CrearRoles',
      component: CrearRoles
    },
    {
      path: '/EditarRoles',
      name: 'EditarRoles',
      component: () => import('../components/Rol/EditarRoles.vue')
    },
    {
      path: '/listarFacturas',
      name: 'listarFacturas',
      component: ListarFacturas
    },
    {
      path: '/CrearFacturas',
      name: 'CrearFacturas',
      component: CrearFacturas
    },
    {
      path: '/EditarFacturas',
      name: 'EditarFacturas',
      component: () => import('../components/Factura/EditarFacturas.vue')
    },
	],
})

export default router

