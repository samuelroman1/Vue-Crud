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
            <div class="card-header">Actualizar Cliente</div>
            <small id="helpId" class="form-text" text-muted>Mofique los apartados que desea cambiar</small>
            <div class="card-body">
                <form v-on:submit.prevent="formulario">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="user">ID:</label>
                                <input type="number" class="form-control" name="user" aria-describedby="helpId"
                                    id="pkCliente" placeholder="ID" v-model="pkCliente" />
                                <small id="peticion" class="form-text" text-muted>Ingresa id del registro que desea
                                    actualizar</small>
                                <br>
                                <br>
                                <div id="botonbusca">
                                    <button type="button" class="btn btn-outline-primary"
                                        v-on:click="Buscar(pkCliente)">Buscar</button>
                                    &#160
                                    <router-link :to="{ name: 'listarCliente' }"
                                        class="btn btn-outline-danger">Cancelar</router-link>
                                </div>
                            </div>
                        </div>
                        <div id="user-apellidos" style="display: none;">
                            <div class="col">

                                <div class="form-group">
                                    <label for="nombre">Nombre:</label>
                                    <input type="text" class="form-control" name="nombre" aria-describedby="helpId"
                                        id="nombre" placeholder="nombre" value="" />



                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="apellidos">Apellidos:</label>
                                    <input type="text" class="form-control" name="apellidos" id="apellidos"
                                        aria-describedby="helpId" placeholder="apellidos" value="" />

                                </div>
                            </div>
                        </div>

                    </div>
                    <br>
                    <div id="datos-cliente" class="row" style="display: none;">
                        <div class="col">

                            <div class="form-group">
                                <label for="telefono">Telefono:</label>
                                <input type="text" class="form-control" name="telefono" id="telefono"
                                    aria-describedby="helpId" placeholder="telefono" value="" />
                            </div>
                        </div>
                        <div class="col">

                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" class="form-control" name="email" id="email" aria-describedby="helpId"
                                    placeholder="email" value="" />
                            </div>
                        </div>
                        <div class="col">

                            <div class="form-group">
                                <label for="direccion">Direccion:</label>
                                <input type="text" class="form-control" name="direccion" id="direccion" aria-describedby="helpId"
                                    placeholder="direccion" value="" />
                            </div>
                        </div>
                    </div>
                    <br>
                    <div id="botoncerrar" style="display: none;">|<router-link :to="{ name: 'listarCliente' }" type="button"
                            class="btn btn-outline-primary">Finalizar</router-link>|</div>
                    <div id="botones" class="row" style="display: none;">
                        <div class="btn-group" role="group">
                            |<button type="submit" class="btn btn-outline-primary">Actualizar</button>|
                            |<router-link :to="{ name: 'listarCliente' }" class="btn btn-outline-danger">Cancelar</router-link>|
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
            Clientes: [],
            smg: "",
            pkCliente: 0,
            bad: "",
        };
    },
    methods: {
        formulario() {
            var cuerpo = {
                pkCliente: this.pkCliente,
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value,
                direccion: document.getElementById('direccion').value,


            };
            axios.put('https://localhost:7051/Cliente/' + this.pkCliente, cuerpo).then((resutl) => {
                console.log(resutl.data);
                document.getElementById("alert").style.display = "block";
                document.getElementById('botones').style.display = "none";
                this.smg = "Registro actualizado exitosamente :D/";
                document.getElementById('botoncerrar').style.display="block";
            })
        },
        Buscar(id) {
            if (id > 0) {
                axios.get('https://localhost:7051/Cliente/' + id).then((response) => {

                    this.Clientes = response.data.result
                    if (this.Clientes == null) {
                        document.getElementById('alert2').style.display = "block";
                        this.bad = "No hay ningun registro de ese ID"
                    } else {
                        document.getElementById('botonbusca').style.display = "none";
                        document.getElementById('peticion').style.display = "none";
                        document.getElementById('user-apellidos', 'datos-cliente').style.display = "block";
                        document.getElementById('datos-cliente').style.display = "block";
                        document.getElementById('botones').style.display = "block";
                        document.getElementById('alert2').style.display = "none";


                        document.getElementById('nombre').value = this.Clientes.nombre;
                        document.getElementById('apellidos').value = this.Clientes.apellidos;
                        document.getElementById('telefono').value = this.Clientes.telefono;
                        document.getElementById('email').value = this.Clientes.email;
                        document.getElementById('direccion').value = this.Clientes.direccion;

                    }
                })
            } else {
                document.getElementById('alert2').style.display = "block";
                this.bad = "No hay valor de ID"
            }


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
}</style>