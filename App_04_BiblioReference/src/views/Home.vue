<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-grid>
                    <ion-row>
                        <ion-col size-md="6">
                            <ion-title class="header1">Biblioteca</ion-title>
                        </ion-col>
                        <ion-col size-md="6">
                            <ion-button color="primary" class="button" @click="exitUser" v-if="!auth">Cerrar sesion</ion-button>
                            
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <Home v-if="showHome" :username="username"/>
            <Auth v-if="auth" @authUser ="authUser"/>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonGrid, IonRow, IonCol} from '@ionic/vue';
import Home from "../components/Home.vue";
import Auth from "../components/Auth.vue";
//import Pay from "../components/Pay.vue"
import { defineComponent } from 'vue';
export default defineComponent({
    components: {IonPage, IonHeader, IonTitle, IonContent, Home, Auth, IonToolbar, IonGrid, IonRow, IonCol },
    data() {
        return {
            showHome: false,
            auth: true,
            username: String
        };
    },
    methods: {
        authUser(username){
            this.showHome = true;
            this.auth = false;
            this.username = username
        },
        exitUser(){
            this.auth = true;
            this.showHome = false;
        }
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
</style>