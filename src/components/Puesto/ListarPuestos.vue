<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<img :src="logoURL" alt="Vue" />
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/Listar" class="button">
				<span class="material-icons">person</span>
				<span class="text">Usuario</span>
			</router-link>
			<router-link to="/ListarCliente" class="button">
				<span class="material-icons">hail</span>
				<span class="text">Cliente</span>
			</router-link>
			<router-link to="/listarDepartamento" class="button">
				<span class="material-icons">domain</span>
				<span class="text">Departamento</span>
			</router-link>
			<router-link to="/listarPuesto" class="button">
				<span class="material-icons">engineering</span>
				<span class="text">Puesto</span>
			</router-link>
			<router-link to="/listarRoles" class="button">
				<span class="material-icons">work</span>
				<span class="text">Rol</span>
			</router-link>
			<router-link to="/listarFacturas" class="button">
				<span class="material-icons">receipt</span>
				<span class="text">Facturas</span>
			</router-link>
			<router-link to="/listarEmpleados" class="button">
				<span class="material-icons">badge</span>
				<span class="text">Empleado</span>
			</router-link>
		</div>

		<div class="flex"></div>

		<div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">logout</span>
				<span class="text">Salir</span>
			</router-link>
		</div>
	</aside>
	<div>
		<div class="card">
			<div class="card-header">Puestos
				|<router-link to="CrearPuestos" class="btn btn-success">CrearPuesto</router-link> |
							<button type="button" v-on:click="editarDepartamento()" class="btn btn-warning">
										EditarPuesto</button>
			</div>
			<div class="card_body">
				<table class="table">
					<thead>
						<tr>
							<th>pkPuesto</th>
							<th>Nombre</th>

						</tr>
					</thead>
					<tbody>
						<tr v-for="Puesto in Puestos" :key="Puesto.pkpuesto">
							<td>{{ Puesto.pkpuesto }}</td>
							<td>{{ Puesto.nombre }}</td>
							<td>
								<div class="btn-group" role="label" aria-label=""> 

									|<button type="button" v-on:click="borrarPuesto(Puesto.pkpuesto)"
										class="btn btn-danger">
										Eliminar</button>|
								</div>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>
	</div>
</template>


<script setup>
import { ref } from 'vue'
import logoURL from '@/assets/logo.svg'
const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

<script>
import axios from "axios";
export default {
	data() {
		return {
			Puestos: [],
            smg: "",
		};
	},
	created: function () {
		this.consultarArticulos();
	},
	methods: {
		consultarArticulos() {
			axios.get("https://localhost:7051/Puesto").then((result) => {
				console.log(result.data.result);
				this.Puestos = result.data.result;
			});
		},
		editarDepartamento() {
			window.location.href = "/EditarPuestos";
		},
		borrarPuesto(id) {
			var pregunta = window.confirm('Esta se seguro de eliminar este registro?');

			if (pregunta === true) {
				axios.delete("https://localhost:7051/Puesto/" + id);
				window.location.href = "listarPuesto";

			} else {

			}
		},
	},
};
</script>

<style lang="scss" scoped>

.btn-success{
	margin-left: 80px;
}
.card{
	margin:70px;
}
aside {
	display: flex;
	flex-direction: column;

	background-color: var(--dark);
	color: var(--light);

	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}

			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3,
	.button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons,
				.text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons,
				.text {
					color: var(--primary);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;

			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3,
		.button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>