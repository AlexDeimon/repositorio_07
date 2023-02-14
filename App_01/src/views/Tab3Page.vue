<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col size-md="6" size-xs="12">
              <ion-title class="h1">Algo mejor</ion-title>
            </ion-col>
            <ion-col size-md="6" size-xs="12">
              <ion-searchbar placeholder="Search"></ion-searchbar>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size-lg="4" size-xs="12">
            <ion-list>
              <ion-reorder-group :disabled="isDisabled" @ionItemReorder="handleReorder($event)">
                <ion-item>
                  <ion-label><ion-button @click="presentActionSheet">Hoja de acción</ion-button></ion-label>
                  <ion-badge color="primary"><ion-icon :icon="help" size="large"/></ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label><ion-button color="danger" @click="presentAlert">Click Me</ion-button></ion-label>
                  <ion-badge color="danger"><ion-icon :icon="alertCircle" size="large"/></ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label><ion-button color="tertiary" @click="setOpen(true)">Modal</ion-button></ion-label>
                  <ion-badge color="tertiary"><ion-icon :icon="copy" size="large"/></ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label><ion-button color="success" @click="presentToast()">Notificación</ion-button></ion-label>
                  <ion-badge color="success"><ion-icon :icon="notifications" size="large"/></ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label><ion-button color="warning" @click="bandera1true()">Tarjeta</ion-button></ion-label>
                  <ion-badge color="warning"><ion-icon :icon="imagesOutline" size="large"/></ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label><ion-button color="secondary" @click="bandera2true()">Calendario</ion-button></ion-label>
                  <ion-badge color="secondary"><ion-icon :icon="calendar" size="large"/></ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
              </ion-reorder-group>
            </ion-list>
            <ion-button @click="toggleReorder()">Cambiar orden</ion-button>
          </ion-col>
          <ion-col size-lg="8" size-xs="12" class="container">
            <h2 class="tituloAnimado">HOLA MUNDO... </h2>
            <h2>{{ result }} </h2>
            <div v-if="bandera1">
              <ion-card color="warning">
                <img alt="Silhouette of mountains" src="https://ionicframework.com/img/meta/ionic-vue-og.png?v1" />
                <ion-card-header>
                  <ion-card-title>Ionic + Vue</ion-card-title>
                  <ion-card-subtitle>Mi primer app con Ionic</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quas, minus quis nihil consequatur recusandae sit itaque animi corrupti, soluta at? Consequatur repellendus corporis quisquam exercitationem aliquid labore veritatis aliquam?</ion-card-content>
              </ion-card>  
            </div>
            <div v-if="bandera2">
              <ion-datetime></ion-datetime>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">X</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="floating">Nombre</ion-label>
            <ion-input></ion-input>
          </ion-item>
          <ion-item>
            <label>¿Cual enfoque te gusta más?</label>
          </ion-item>
          <div>
            <ion-item>
              <ion-checkbox slot="start"></ion-checkbox>
              <ion-label>Backend</ion-label>
            </ion-item>
            <ion-item>
              <ion-checkbox slot="start"></ion-checkbox>
              <ion-label>Frontend</ion-label>
            </ion-item>     
          </div>
          <ion-item>
            <label>¿Cual Framework prefieres?</label>
          </ion-item>
          <div>
            <ion-radio-group :allow-empty-selection="true">
              <ion-item>
                <ion-label>React</ion-label>
                <ion-radio slot="end" value="React" color="success"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Vue</ion-label>
                <ion-radio slot="end" value="Vue"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Angular</ion-label>
                <ion-radio slot="end" value="Angular" color="danger"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </div>
          <ion-item>
            <ion-select placeholder="Select language">
              <ion-select-option value="Python">Python</ion-select-option>
              <ion-select-option value="Java">Java</ion-select-option>
              <ion-select-option value="JavaScript">JavaScript</ion-select-option>
            </ion-select>
          </ion-item>
          <br><br><br>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonTitle, IonSearchbar, IonContent, IonIcon, IonButton, IonModal, IonButtons, IonItem, IonCheckbox, IonLabel, IonRadioGroup, IonRadio, IonInput, IonSelect, IonSelectOption, IonDatetime, IonList, IonReorderGroup, IonReorder,  IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, actionSheetController, alertController, toastController } from '@ionic/vue';
import { ref, defineComponent } from 'vue';
import { alertCircle, help, copy, notifications, imagesOutline, calendar} from 'ionicons/icons';
export default defineComponent({
    components: { IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonTitle, IonSearchbar, IonContent, IonIcon, IonButton, IonModal, IonButtons, IonItem, IonCheckbox, IonLabel, IonRadioGroup, IonRadio, IonInput, IonSelect, IonSelectOption, IonDatetime, IonList, IonReorderGroup, IonReorder,  IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle},
    data() {
      return {
        bandera1: false,
        bandera2: false,
        isOpen: false,
      };
    },
    methods: {
      setOpen(isOpen: boolean) { 
        this.isOpen = isOpen;
      },
      async presentToast() {
        const hora = new Date();
        const toast = await toastController.create({
          message: `son las ${(hora.getHours())}:${hora.getMinutes()}`,
          duration: 2000,
          position: 'middle',
          color: "success"
        });
        await toast.present();
      },
      bandera1true(){
        this.bandera2 = false;
        this.bandera1 = true;
      },
      bandera2true(){
        this.bandera1 = false;
        this.bandera2 = true;
      }
    },
    setup() {
      const isDisabled = ref(true);
      const handleReorder = (event: CustomEvent) => {
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
        event.detail.complete();
      }
      const toggleReorder = () => {
        isDisabled.value = !isDisabled.value;
      }
      const result = ref('');
      const presentActionSheet = async () => {
        const actionSheet = await actionSheetController.create({
          header: 'Bienvenido',
          subHeader: 'Responde, ¿Conoces Vue?',
          buttons: [
            {
              text: 'Si. Es mi Framework de preferencia',
              data: { respuesta: 'Me caes bien'},
            },
            {
              text: 'Lo conozco pero no lo uso',
              data: {respuesta: 'Deberias darle una oportunidad'},
            },
            {
              text: '¿Qué es eso?',
              data: {respuesta: 'Entra aqui y conocelo: https://vuejs.org/'},
            },
          ],
        });
        await actionSheet.present();
        const res = await actionSheet.onDidDismiss();
        result.value = JSON.stringify(res.data.respuesta, null, 2);
      };
      const presentAlert = async () => {
        const alert = await alertController.create({
          header: 'ALERTA',
          message: 'TE HAN HACKEADO... ok no, igual cuidate.',
          buttons: ['OK'],
        });
        await alert.present();
      };
      return {isDisabled, handleReorder, toggleReorder, presentActionSheet, result, presentAlert, alertCircle, help, copy, notifications, imagesOutline, calendar};
    },
  });
</script>
<style>
.tituloAnimado {
  border-right: 4px solid;
  width: 14ch;
  font-family: monospace;
  font-size: xx-large;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 2s steps(15) infinite alternate, blin .5s infinite step-end alternate;
}
@keyframes typing{
  from{ width: 0ch;}
  to{ width: 14ch;}
}
@keyframes blin{
  50%{ border-color: transparent;}
}
</style>