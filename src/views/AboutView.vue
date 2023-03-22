<template>
    <div class="container">
      <div class="card">
        <div class="card-header">Agregar Articulo</div>
        <div class="card-body">
          <form v-on:submit.prevent="agregarRegistro">
            <div class="form-group">
              <label for="">Nombre:</label>
              <input
                type="text"
                class="form-control"
                name="nombre"
                v-model="usuario.user"
                aria-describedby="helpId"
                id="nombre"
                placeholder="Nombre"
              />
              <small id="helpId" class="form-text" text-muted
                >Ingresa el nombre del articulo</small
              >
            </div>
            <div class="form-group">
              <label for="">fechaRegistro:</label>
              <input
                type="text"
                class="form-control"
                name="precio"
                id="precio"
                v-model="usuario.fechaRegistro"
                aria-describedby="helpId"
                placeholder="Precio"
              />
              <small id="helpId" class="form-text" text-muted
                >Ingresa el precio del articulo</small
              >
            </div>
            <div class="form-group">
              <label for="">fkEmpleado:</label>
              <input
                type="text"
                class="form-control"
                name="precio"
                id="precio"
                v-model="usuario.fkEmpleado"
                aria-describedby="helpId"
                placeholder="Precio"
              />
              <small id="helpId" class="form-text" text-muted
                >Ingresa el precio del articulo</small
              >
            </div>
            <div class="form-group">
              <label for="">fkRol:</label>
              <input
                type="text"
                class="form-control"
                name="precio"
                id="precio"
                v-model="usuario.fkRol"
                aria-describedby="helpId"
                placeholder="Precio"
              />
              <small id="helpId" class="form-text" text-muted
                >Ingresa el precio del articulo</small
              >
            </div>
  
            <br />
  
            <div class="btn-group" role="group">
              |<button type="submit" class="btn btn-success">Agregar</button>|
              |<router-link :to="{ name: 'Listar' }" class="btn btn-danger"
                >Cancelar</router-link
              >|
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        usuario: {},
      };
    },
  
    methods: {
      agregarRegistro() {
        console.log(this.usuario);
  
        var datosEnviar = {
          user: this.usuario.user,
          password: this.usuario.password,
          fechaRegistro: this.usuario.fechaRegistro,
          fkEmpleado: this.usuario.fkEmpleado,
          fkRol: this.usuario.fkRol,
        };
  
        axios
          .post("https://localhost:7051/Usuario", datosEnviar)
          .then((result) => {
            console.log(result);
            window.location.href = "Listar";
          });
      },
    },
  };
  </script>