<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
<style>
  ion-modal ion-toolbar {
    --background: #6a64ff;
    --color: white;
  }
  ion-searchbar .searchbar-input-container input:focus{
    box-shadow: 0 0 10px 5px var(--ion-color-primary);
  }
  .h1{
    line-height: 2.5;
    padding-left: 10px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }
  .action-sheet-group .sc-ion-action-sheet-md {
    background: var(--ion-color-primary-shade);
    color:#000000
  }
  .action-sheet-button:hover{
    opacity: 0.8;
    color:#000000
  }
  .action-sheet-title.sc-ion-action-sheet-md {
    text-align: center;
    font-size: 30px;
  }
  .action-sheet-sub-title.sc-ion-action-sheet-md{
    text-align: start;
    font-size: 20px;
  }
  .alert-wrapper.sc-ion-alert-md{
    box-shadow: 0 0 10px 5px var(--ion-color-danger);
  }
  .sc-ion-alert-md{
    color: var(--ion-color-danger)
  }
</style>