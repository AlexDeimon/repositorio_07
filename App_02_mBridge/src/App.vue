<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
<style>
  p{
    margin: 2% 3%;
  }
  img, iframe{
    width: 94%;
    display: block;
    margin: 2% auto;
  }
  iframe {
    height: 300px;
  }
</style>