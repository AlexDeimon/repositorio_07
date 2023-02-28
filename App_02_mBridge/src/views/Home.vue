<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Project mBridge Connecting economies through CBDC</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size-lg="6" size-xs="12">
            <p>El artículo habla sobre el potencial de las monedas digitales de los bancos centrales (CBDC) para conectar economías de diferentes países y mejorar la eficiencia de los pagos internacionales.</p>
            <p>El artículo describe el proyecto mBridge, una iniciativa de colaboración entre la Autoridad Monetaria de Singapur y el Banco de Tailandia para explorar el uso de CBDC en la conexión de las economías de ambos países. El proyecto involucra la creación de un corredor de pagos transfronterizos utilizando CBDC, que podría reducir significativamente los costos y el tiempo de procesamiento de los pagos internacionales.</p>
            <p>El artículo también destaca algunos de los desafíos que deben superarse para que los CBDC se conviertan en una realidad, como la necesidad de estándares globales y la necesidad de garantizar la privacidad y la seguridad de las transacciones.</p>
          </ion-col>
          <ion-col size-lg="6" size-xs="12">
            <img src="https://f9p9c7p7.stackpathcdn.com/wp-content/uploads/2022/10/HKMA-BIS-and-Three-Central-Banks-Complete-the-First-Multi-CBDC-Pilot-Project-817x404_c.png?x28597" alt="proyect mBridge">
          </ion-col>
        </ion-row>
      </ion-grid>
      <iframe src="https://www.youtube.com/embed/58_lJ-9oblc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent,  IonGrid, IonRow, IonCol}
})
</script>
