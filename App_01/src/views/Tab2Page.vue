<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Componentes porque si</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size-md="6" size-xs="12" class="container">
            <ion-fab>
              <ion-fab-button>
                <ion-icon :icon="add"></ion-icon>
              </ion-fab-button>
            </ion-fab>  
            <ion-row>
              <ion-col size-md="6" size-xs="12" class="container">
                <ion-button @click="presentActionSheet">Open</ion-button>
                <code>{{ result }}</code>
                <ion-button @click="presentAlert">Click Me</ion-button> 
                 
              </ion-col>
              <ion-col size-md="6" size-xs="12" class="container">
                <div>
                  <ion-item>
                    <ion-checkbox slot="start"></ion-checkbox>
                    <ion-label>React</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-checkbox slot="start"></ion-checkbox>
                    <ion-label>Vue</ion-label>
                  </ion-item>     
                </div>
              </ion-col>
            </ion-row>
            <ion-datetime></ion-datetime>
          </ion-col>
          <ion-col size-md="6" size-xs="12">
            <ion-list>
              <ion-item>
                <ion-label>Followers</ion-label>
                <ion-badge color="primary">22k</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Likes</ion-label>
                <ion-badge color="secondary">118k</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Stars</ion-label>
                <ion-badge color="tertiary">34k</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Completed</ion-label>
                <ion-badge color="success">80</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Warnings</ion-label>
                <ion-badge color="warning">70</ion-badge>
              </ion-item>
              <ion-item>
                <ion-label>Notifications</ion-label>
                <ion-badge color="danger">1000</ion-badge>
              </ion-item>
            </ion-list>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>Here's a small text description for the card content. Nothing more, nothing less.</ion-card-content>
            </ion-card>   
          </ion-col>
        </ion-row>
      </ion-grid> 
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, actionSheetController,  alertController, IonItem, IonLabel, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonDatetime, IonFab, IonFabButton} from '@ionic/vue';
import { add } from 'ionicons/icons';
export default {
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonDatetime, IonFab, IonFabButton},
    setup() {
      const result = ref('');
      const presentActionSheet = async () => {
        const actionSheet = await actionSheetController.create({
          header: 'Example header',
          subHeader: 'Example subheader',
          buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              data: {
                action: 'delete',
              },
            },
            {
              text: 'Share',
              data: {
                action: 'share',
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
              data: {
                action: 'cancel',
              },
            },
          ],
        });
        await actionSheet.present();

        const res = await actionSheet.onDidDismiss();
        result.value = JSON.stringify(res, null, 2);
      };

      const presentAlert = async () => {
        const alert = await alertController.create({
          header: 'Alert',
          subHeader: 'Important message',
          message: 'This is an alert!',
          buttons: ['OK'],
        });

        await alert.present();
      };

      return { result, presentActionSheet, presentAlert, add };
    },
  };
</script>
<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }
  code {
    white-space: pre-wrap;
  }
  ion-checkbox {
    --size: 32px;
    --background-checked: #15ec6f;
  }
  
  ion-checkbox::part(container) {
    border-radius: 6px;
    border: 2px solid #15ec6f;
  }
  ion-fab{
    top: 0;
    left: 0;
  }
</style>
