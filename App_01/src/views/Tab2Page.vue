<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col size-md="6" size-xs="12">
              <ion-title class="h1">Componentes porque si</ion-title>
            </ion-col>
            <ion-col size-md="6" size-xs="12">
              <ion-searchbar placeholder="Search"></ion-searchbar>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size-lg="8" size-xs="12"> 
            <ion-row>
              <ion-col size-md="6" size-xs="12" class="container">
                <ion-fab>
                  <ion-fab-button>
                    <ion-icon :icon="add"></ion-icon>
                  </ion-fab-button>
                </ion-fab> 
                <ion-toggle :checked="true"></ion-toggle>
                <ion-button @click="presentActionSheet">Open</ion-button>
                <code>{{ result }}</code>
                <ion-button @click="presentAlert">Click Me</ion-button> 
                <ion-button @click="setOpen(true)">Open</ion-button>
                <ion-button @click="presentToast()">Present Toast</ion-button>
              </ion-col>
              <ion-modal :is-open="isOpen">
                <ion-header>
                  <ion-toolbar>
                    <ion-title>Modal</ion-title>
                    <ion-buttons slot="end">
                      <ion-button @click="setOpen(false)">Close</ion-button>
                    </ion-buttons>
                  </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
                    reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
                    dicta.
                  </p>
                </ion-content>
              </ion-modal>
              <ion-col size-md="6" size-xs="12" class="container">
                <ion-row>
                  <ion-col size-md="6" class="container">
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
                  </ion-col>
                  <ion-col size-md="6" class="container">
                    <div>
                      <ion-radio-group :allow-empty-selection="true" value="Vue">
                        <ion-item>
                          <ion-label>React</ion-label>
                          <ion-radio slot="end" value="React"></ion-radio>
                        </ion-item>
                        <ion-item>
                          <ion-label>Vue</ion-label>
                          <ion-radio slot="end" value="Vue"></ion-radio>
                        </ion-item>
                      </ion-radio-group>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size-md="6" size-xs="12" class="container">
                <div>
                  <ion-item>
                    <ion-label>Default label</ion-label>
                    <ion-input placeholder="Enter text"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="fixed">Fixed label</ion-label>
                    <ion-input placeholder="Enter text"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Stacked label</ion-label>
                    <ion-input placeholder="Enter text"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Floating label</ion-label>
                    <ion-input placeholder="Enter text"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-select placeholder="Select language">
                      <ion-select-option value="Python">Python</ion-select-option>
                      <ion-select-option value="Java">Java</ion-select-option>
                      <ion-select-option value="JavaScript">JavaScript</ion-select-option>
                    </ion-select>
                  </ion-item>
                </div>
              </ion-col>
              <ion-col size-md="6" size-xs="12" class="container">
                <ion-datetime></ion-datetime>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size-lg="4" size-xs="12">
            <ion-list>
              <ion-reorder-group :disabled="isDisabled" @ionItemReorder="handleReorder($event)">
                <ion-item>
                  <ion-label>Followers</ion-label>
                  <ion-badge color="primary">22k</ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label>Likes</ion-label>
                  <ion-badge color="secondary">118k</ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label>Stars</ion-label>
                  <ion-badge color="tertiary">34k</ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label>Completed</ion-label>
                  <ion-badge color="success">80</ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label>Warnings</ion-label>
                  <ion-badge color="warning">70</ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
                <ion-item>
                  <ion-label>Notifications</ion-label>
                  <ion-badge color="danger">1000</ion-badge>
                  <ion-reorder slot="end"></ion-reorder>
                </ion-item>
              </ion-reorder-group>
            </ion-list>
            <ion-button @click="toggleReorder()">Toggle Reorder</ion-button>
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
import { IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonTitle, IonSearchbar,IonProgressBar, IonContent, IonFab, IonFabButton, IonIcon, IonToggle, IonButton, IonModal, IonButtons, IonItem, IonCheckbox, IonLabel, IonRadioGroup, IonRadio, IonInput, IonSelect, IonSelectOption, IonDatetime, IonList, IonReorderGroup, IonReorder,  IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, actionSheetController, alertController, toastController } from '@ionic/vue';
import { ref, defineComponent } from 'vue';
import { add } from 'ionicons/icons';
export default defineComponent({
    components: { IonPage, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonTitle, IonSearchbar,IonProgressBar, IonContent, IonFab, IonFabButton, IonIcon, IonToggle, IonButton, IonModal, IonButtons, IonItem, IonCheckbox, IonLabel, IonRadioGroup, IonRadio, IonInput, IonSelect, IonSelectOption, IonDatetime, IonList, IonReorderGroup, IonReorder,  IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle},
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      setOpen(isOpen: boolean) {
        this.isOpen = isOpen;
      },
      async presentToast() {
        const toast = await toastController.create({
          message: 'Hello World!',
          duration: 1500,
          position: 'middle'
        });

        await toast.present();
      },
    },
    setup() {
      const result = ref('');
      const isDisabled = ref(true);
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

      const handleReorder = (event: CustomEvent) => {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        event.detail.complete();
      }

      const toggleReorder = () => {
        isDisabled.value = !isDisabled.value;
      }

      return { result, presentActionSheet, presentAlert, add, isDisabled, handleReorder, toggleReorder};
    },
  });
</script>
<style>
  code {
    white-space: pre-wrap;
  }
  ion-checkbox {
    --size: 30px;
  }
  
  ion-checkbox::part(container) {
    border-radius: 6px;
  }
  ion-fab{
    position: absolute;
    top: 10px;
    left: 10px;
  }
  ion-toggle{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  ion-radio {
    width: 30px;
    height: 30px;
    --border-radius: 4px;
    --inner-border-radius: 4px;

    --color: #ddd;
  }
</style>
