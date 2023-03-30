<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col size-md="6">
              <ion-title class="header1">Quiz</ion-title>
            </ion-col>
            <ion-col size-md="6">
              <ion-button color="primary" class="button" @click="setOpen(true)" v-if="!auth">Administrador</ion-button>
              <ion-button color="primary" class="button" @click="auth=false" v-if="auth">Cerrar sesion</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <Home @startTheGame="startTheGame" v-if="showHome" :auth="auth"/>
      <Question v-if="gameStarted && quizData && !gameFinished" :quizData="this.quizData" @endGame="endGame"/>
      <Final v-if="gameFinished" :points="points" :quizName="quizName" :user="user" @resetGame="resetGame"/>
    </ion-content>
    <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Administrador</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">X</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <div class="container contenedor1">
            <div class="card bg-transparent">
              <div class="card-body">
                <ul class="nav nav-tabs">
                  <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#signIn">Inicia sesión</a></li>
                  <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#signup">Regístrate</a></li>
                </ul>
                <div class="tab-content">
                  <div id="signIn" class="container tab-pane active">
                    <h2>Bienvenido</h2>
                    <form v-on:submit.prevent="singInForm" id="singIn">
                      <ion-item>
                        <ion-label position="floating">Ingrese un email: </ion-label>
                        <ion-input v-model="singIn.email" autocomplete="off" type="email"></ion-input>  
                      </ion-item>
                      <ion-item>
                        <ion-label position="floating">Ingrese un password: </ion-label>
                        <ion-input v-model="singIn.password" type="password"></ion-input>  
                      </ion-item>
                      <ion-button type="submit">Ingresar</ion-button>
                    </form>
                  </div>
                  <div id="signup" class="container tab-pane">
                    <h2>Regístrate</h2>
                    <form v-on:submit.prevent="singUpForm" id="singUp">
                      <ion-item>
                        <ion-label position="floating">Ingrese un email: </ion-label>
                        <ion-input v-model="singUp.email" autocomplete="off" type="email"></ion-input>  
                      </ion-item>
                      <ion-item>
                        <ion-label position="floating">Ingrese un password: </ion-label>
                        <ion-input v-model="singUp.password" type="password"></ion-input>  
                      </ion-item>
                      <ion-button type="submit">Registrar</ion-button>
                    </form>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </ion-content>
      </ion-modal>
  </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonModal,  IonInput, IonLabel, IonItem, alertController} from '@ionic/vue';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Home from "../components/Home.vue";
import Question from "../components/Question.vue";
import Final from "../components/Final.vue";
import { defineComponent } from 'vue';
export default defineComponent({
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, Home, Question, Final, IonGrid, IonRow, IonCol, IonButton, IonModal,  IonInput, IonLabel, IonItem},
  data() {
    return {
      showHome: true,
      gameStarted: false,
      gameFinished: false,
      quizData: [],
      points: 0,
      quizName: "",
      user: "",
      auth: false,
      isOpen: false,
      singIn: {
        email: "",
        password: ""
      },
      singUp: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
    singUpForm(){
      if(this.singUp.email.length == 0 || !this.singUp.email.includes('@') || !this.singUp.email.includes('mail') || !this.singUp.email.includes('.co')){ 
        this.showAlert('Error','El correo que intentas registrar es invalido' ); 
        document.getElementById('singUp').reset();
      } else if(this.singUp.password.length < 8 || (!this.singUp.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/))) { 
        this.showAlert('Error', 'Tu contraseña debe tener al menos una letra mayúscula y mínimo 8 caracteres alfanuméricos'); 
        this.singUp.password = "";
      } else {
        //* Authenticate the User
        createUserWithEmailAndPassword(auth, this.singUp.email, this.singUp.password).then(() => {
          this.showAlert('Exito', 'Registro exitoso!');
          this.singUp.email = "";
          this.singUp.password =""
          this.setOpen(false);
        }).catch(() => {
          this.showAlert('Error', 'El correo que intentas registrar ya existe!');
          document.getElementById('singUp').reset();
        });
      }
    },
    singInForm(){
      signInWithEmailAndPassword(auth, this.singIn.email, this.singIn.password).then(() => {
        this.showAlert('Exito', 'Autenticación exitosa!');
        this.setOpen(false);
        this.auth = true;
        this.singIn.email = "";
        this.singIn.password = ""
      }).catch(() => {
        this.showAlert('Error', 'Parece que tu correo no está registrado o te has equivocado en tu contraseña!');
        document.getElementById('singIn').reset();
      });
    },
    startTheGame ({ quizName, questions, user }) {
      this.quizName = quizName;
      this.quizData = questions;
      this.user = user;
      this.showHome = false;
      this.gameStarted = true;
      this.points = 0;
    },
    endGame({ points }) {
      this.points = points;
      this.gameFinished = true;
    },
    resetGame() {
      this.showHome = true;
      this.gameStarted = false;
      this.gameFinished = false;
      this.quizData = [];
      this.points = 0;
    },
    setOpen(isOpen) { 
      this.isOpen = isOpen;
    },
  },
  setup(){
    const showAlert = async (header, message) => {
      const alert = await alertController.create({
        header: header,
        message: message,
        buttons: ['OK'],
      });
      await alert.present();
    };
    return{showAlert}
  }
})
</script>
<style>
ion-header ion-col{
  display: flex;
  justify-content: center;
  align-items: center;
}
ion-header .button {
  position: absolute;
  right: 0;
}
.header1{
  padding-left: 10px;
}
.contenedor1{
  text-align: center;
  margin: 0 auto;
}
.card{
  background-color: transparent;
}
.card-body {
  padding: 0 0 15px 0;
}
.alert-wrapper.sc-ion-alert-md{
  box-shadow: 0 0 10px 5px var(--ion-color-primary);
}
.sc-ion-alert-md{
  color: var(--ion-color-primary);
}
.nav-tabs .nav-item.show .nav-link, 
.nav-tabs .nav-link.active {
  color: cornflowerblue;
  background-color: transparent;
  border-bottom-color: #0d0d0d;
}
</style>