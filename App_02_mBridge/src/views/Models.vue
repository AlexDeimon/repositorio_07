<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Modelos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size-lg="6" size-xs="12">
            <p>El artículo presenta dos modelos diferentes de implementación de los CBDC para mejorar los pagos internacionales y fomentar la inclusión financiera.</p>
            <p>El primer modelo es un sistema de pago directo entre bancos centrales, que permitiría que los pagos internacionales se procesen de manera más rápida y económica al eliminar la necesidad de intermediarios y sistemas de pago adicionales. En este modelo, los bancos centrales establecerían una red para el intercambio directo de CBDC, lo que permitiría que los pagos se realicen en tiempo real y a un costo menor. Además, este modelo también podría ayudar a reducir los riesgos de liquidez al permitir que los bancos centrales proporcionen liquidez a otros bancos centrales en momentos de crisis financiera.</p>
            <p>El segundo modelo es un sistema de pago minorista, que permitiría que las personas y las empresas realicen transacciones y pagos utilizando CBDC sin necesidad de una cuenta bancaria tradicional. En este modelo, los bancos centrales emitirían CBDC que las personas y las empresas podrían utilizar para realizar pagos directos entre sí, sin la necesidad de intermediarios. Esto podría fomentar la inclusión financiera al permitir que las personas sin acceso a servicios bancarios tradicionales realicen transacciones y pagos utilizando CBDC.</p>
            <p>En ambos modelos, los bancos centrales serían los encargados de emitir y gestionar los CBDC, lo que garantizaría la estabilidad financiera y la integridad del sistema. Además, los CBDC podrían estar respaldados por activos como oro o divisas extranjeras, lo que aumentaría su estabilidad y confiabilidad.</p>
          </ion-col>
          <ion-col size-lg="6" size-xs="12">
            <img src="https://x2u3s3r4.stackpathcdn.com/wp-content/uploads/2021/04/Making-Central-Bank-Digital-Currency-Systems-Interoperable-for-Cross-Border-Fund-Transfers.jpg?x30842" alt="model1">
            <img src="https://flow.db.com/contentAsset/image/859ffd4b-8328-4c95-8ea2-3b38ee7814a9/fileAsset/filter/Resize,Jpeg/resize_w/1280/390d9cb2-6e6a-464b-90f3-b21672728553.jpg" alt="model2">
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol}
})
</script>
