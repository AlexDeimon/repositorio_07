<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon :icon="earth" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/useCase">
          <ion-icon :icon="logoUsd" />
          <ion-label>Casos de Uso</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/models">
          <ion-icon :icon="bulb" />
          <ion-label>Modelos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/challenges">
          <ion-icon :icon="rocket" />
          <ion-label>Desafios</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { logoUsd, rocket, bulb, earth } from 'ionicons/icons';
export default {
    name: 'TabsPage',
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet},
    setup() {
      return { logoUsd, rocket, bulb, earth};
    },
  };
</script>
