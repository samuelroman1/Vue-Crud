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
            <div class="card-header">Actualizar Usuario</div>
            <small id="helpId" class="form-text" text-muted>Mofique los apartados que desea cambiar</small>
            <div class="card-body">
                <form v-on:submit.prevent="formulario">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="user">ID:</label>
                                <input type="number" class="form-control" name="user" aria-describedby="helpId"
                                    id="pkUsuario" placeholder="ID" v-model="pkUsuario" />
                                <small id="peticion" class="form-text" text-muted>Ingresa id del registro que desea
                                    actualizar</small>
                                <br>
                                <br>
                                <div id="botonbusca">
                                    <button type="button" class="btn btn-outline-primary"
                                        v-on:click="Buscar(pkUsuario)">Buscar</button>
                                    &#160
                                    <router-link :to="{ name: 'listar' }" class="btn btn-outline-danger">Cancelar</router-link>
                                </div>
                            </div>
                        </div>
                        <div id="user-password" style="display: none;">
                            <div class="col">

                                <div class="form-group">
                                    <label for="user">user:</label>
                                    <input type="text" class="form-control" name="user" aria-describedby="helpId" id="user"
                                        placeholder="usuario" value="" />



                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="password">Password:</label>
                                    <input type="text" class="form-control" name="password" id="password"
                                        aria-describedby="helpId" placeholder="password" value="" />

                                </div>
                            </div>
                        </div>

                    </div>
                    <br>
                    <div id="fk-empleado-rol" class="row" style="display: none;">
                        <div class="col">

                            <div class="form-group">
                                <label for="fkEmpleado">fkEmpleado:</label>
								<select  class="form-control" name="fkEmpleado" id="fkEmpleado" v-model="Usuarios.fkEmpleado">
				  <option v-for="empleado in Empleados" :value="empleado.pkEmpleado" :key="empleado.pkEmpleado">{{empleado.nombre}}</option>
								</select>
                            </div>
                        </div>
                        <div class="col">

                            <div class="form-group">
                                <label for="fkRol">fkRol:</label>
								<select  class="form-control" name="fkRol" id="fkRol" v-model="Usuarios.fkRol">
				  <option v-for="rol in Roles" :value="rol.pkRol" :key="rol.pkRol">{{rol.nombre}}</option>
				  </select>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div id="botoncerrar" style="display: none;">|<router-link :to="{name:'listar'}" type="button" class="btn btn-outline-primary">Finalizar</router-link>|</div>
                    <div id="botones" class="row" style="display: none;">
                        <div class="btn-group" role="group">
                            |<button type="submit" class="btn btn-outline-primary">Actualizar</button>|
                            |<router-link :to="{ name: 'listar' }" class="btn btn-outline-danger">Cancelar</router-link>|
                        </div>

                    </div>
                    <br>
                    <div class="row">
                        <div id="alert" style="display:none;" class="alert alert-success" role="alert">
                            {{ smg }}
                        </div>
                        <div id="alert2" class="alert alert-warning" role="alert" style="display:none;">{{ bad }}</div>
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
import axios from 'axios'
export default {
    name: 'Editar',
    components: {

    },

    data() {
        return {
            Usuarios: [],
            smg: "",
            pkUsuario: 0,
            bad: "",
			Empleados:[],
			Rol:[]
        };
    },
	created:function(){
		this.Consultas();
	},
    methods: {
        formulario() {
            const tiempoTranscurrido = Date.now();
            const hoy = new Date(tiempoTranscurrido);
            var cuerpo = {
                pkUsuario: this.pkUsuario,
                user: document.getElementById('user').value,
                password: document.getElementById('password').value,
                fechaRegistro: hoy.toISOString(),
                fkEmpleado: document.getElementById('fkEmpleado').value,
                fkRol: document.getElementById('fkRol').value,


            };
            axios.put('https://localhost:7051/Usuario/' + this.pkUsuario, cuerpo).then((resutl) => {
                console.log(resutl.data);
                document.getElementById('botones').style.display = "none";
                document.getElementById("alert").style.display = "block";
                this.smg = "Registro actualizado exitosamente :D/";
                document.getElementById('botoncerrar').style.display="block";
            })
        },
        Buscar(id) {
            if (id > 0) {
                axios.get('https://localhost:7051/Usuario/' + id).then((response) => {

                    this.Usuarios = response.data.result
                    if (this.Usuarios == null) {
                        document.getElementById('alert2').style.display = "block";
                        this.bad = "No hay ningun registro de ese ID"
                    } else {
                        document.getElementById('botonbusca').style.display = "none";
                        document.getElementById('peticion').style.display = "none";
                        document.getElementById('user-password', 'fk-empleado-rol').style.display = "block";
                        document.getElementById('fk-empleado-rol').style.display = "block";
                        document.getElementById('botones').style.display = "block";
                        document.getElementById('alert2').style.display = "none";


                        document.getElementById('user').value = this.Usuarios.user;
                        document.getElementById('password').value = this.Usuarios.password;
                        document.getElementById('fkEmpleado').value = this.Usuarios.fkEmpleado;
                        document.getElementById('fkRol').value = this.Usuarios.fkRol;

                    }
                })
            } else {
                document.getElementById('alert2').style.display = "block";
                this.bad = "No hay valor de ID"
            }


        },
		Consultas (){
		axios.get("https://localhost:7051/Empleado").then((result) => {
				console.log(result.data.result);
				this.Empleados = result.data.result;
			});
			axios.get("https://localhost:7051/Rol").then((result) => {
				console.log(result.data.result);
				this.Roles = result.data.result;
			});
	}

    },

}

</script>

<style lang="scss" scoped>
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