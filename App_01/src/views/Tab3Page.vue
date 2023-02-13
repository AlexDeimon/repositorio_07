<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Algo más bonito</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 3 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, ExploreContainer},
  });
</script>
