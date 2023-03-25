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
  <div class="container-fluid">
      <div class="card">
        <div class="card-header">Agregar Empleado</div>
        <div class="card-body">
          <form v-on:submit.prevent="formulario">
            <div class="row">
              <div class="col">
  
                <div class="form-group">
                  <label for="nombre">Nombre:</label>
                  <input type="text" class="form-control" name="nombre" aria-describedby="helpId" id="nombre"
                    placeholder="nombre" v-model="Empleados.nombre" />
                  <small id="helpId" class="form-text" text-muted>Ingresa tu correo de usuario</small>
                </div>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col">
  
                <div class="form-group">
                  <label for="apellidos">Apellidos:</label>
                  <input type="text" class="form-control" name="apellidos" id="apellidos" aria-describedby="helpId"
                    placeholder="apellidos" v-model="Empleados.apellidos" />

                </div>
                <div class="form-group">
                  <label for="dirreccion">Direccion:</label>
                  <input type="text" class="form-control" name="dirreccion" id="dirreccion" aria-describedby="helpId"
                    placeholder="dirreccion" v-model="Empleados.dirreccion" />
                </div>
                <div class="form-group">
                  <label for="ciudad">Ciudad:</label>
                  <input type="text" class="form-control" name="ciudad" id="ciudad" aria-describedby="helpId"
                    placeholder="ciudad" v-model="Empleados.ciudad" />
                </div>
              </div>
              <div class="col">
  
                <div class="form-group">
                  <label for="fkPuesto">FkPuesto:</label>
                  <input type="text" class="form-control" name="fkPuesto" id="fkPuesto" aria-describedby="helpId"
                    placeholder="fkPuesto" v-model="Empleados.fkPuesto" />
                </div>
                <div class="form-group">
                  <label for="fkDepartamento">FkDepartamento:</label>
                  <input type="text" class="form-control" name="fkDepartamento" id="fkDepartamento" aria-describedby="helpId"
                    placeholder="fkDepartamento" v-model="Empleados.fkDepartamento" />
                </div>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="btn-group" role="group" id="botonesopcion">
                |<button type="submit" class="btn btn-outline-primary">Agregar</button>|
                |<router-link :to="{ name: 'listarEmpleados' }" class="btn btn-outline-danger">Cancelar</router-link>|
              </div>
              <router-link :to="{ name: 'listarEmpleados' }" class="btn btn-outline-primary" id="finaliza"
                style="display: none;">Finalizar</router-link>
            </div>
            <br>
            <div class="row">
              <div id="alert" style="display:none;" class="alert alert-success" role="alert">
                {{ smg }}
              </div>
            </div>
          </form>
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
import axios from 'axios';
export default {

  data() {
    return {
      Empleados: {},
      smg: "",
    };
  },
  methods: {
    formulario() {
      var cuerpo = {
        nombre: this.Empleados.nombre,
        apellidos : this.Empleados.apellidos,
        dirreccion : this.Empleados.dirreccion,
        ciudad : this.Empleados.ciudad,
        fkPuesto: this.Empleados.fkPuesto,
        fkDepartamento: this.Empleados.fkDepartamento,
      };

      axios.post('https://localhost:7051/Empleado', cuerpo).then((result) => {

        if (result.status == 200) {
          document.getElementById("alert").style.display = "block";
          document.getElementById('botonesopcion').style.display = "none";
          this.smg = "agregado exitosamente :D/";
          document.getElementById('finaliza').style.display = "block";
          console.log(result);
        }
        // window.location.href = "dashboard";

      })
    }
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>

<style lang="scss" scoped>
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

	h3, .button .text {
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

				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons, .text {
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

		h3, .button .text {
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