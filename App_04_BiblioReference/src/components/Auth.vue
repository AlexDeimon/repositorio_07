<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="container contenedor1">
        <div class=" bg-transparent">
          <div>
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
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton,  IonInput, IonLabel, IonItem, alertController} from '@ionic/vue';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { defineComponent } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Auth",
  components: {IonPage, IonContent, IonButton,  IonInput, IonLabel, IonItem},
  data() {
    return{
      auth: false,
      singIn: {
        email: "",
        password: ""
      },
      singUp: {
        email: "",
        password: ""
      }
    }
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
        }).catch(() => {
          this.showAlert('Error', 'El correo que intentas registrar ya existe!');
          document.getElementById('singUp').reset();
        });
      }
    },
    singInForm(){
      signInWithEmailAndPassword(auth, this.singIn.email, this.singIn.password).then(() => {
        this.showAlert('Exito', 'Autenticación exitosa!');
        this.$emit("authUser", this.singIn.email); 
      }).catch((error) => {
        console.log(error)
        this.showAlert('Error', 'Parece que tu correo no está registrado o te has equivocado en tu contraseña!');
        document.getElementById('singIn').reset();
      });
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
});
</script>
<style>
.contenedor1{
  text-align: center;
  margin: 0 auto;
  max-height: 100%;
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