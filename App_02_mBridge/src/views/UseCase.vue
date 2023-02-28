<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Casos de Uso</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size-lg="6" size-xs="12">
            <img src="https://nayaone.com/wp-content/uploads/2022/03/image3.png" alt="uses cases">
          </ion-col>
          <ion-col size-lg="6" size-xs="12">
            <p>En primer lugar, el artículo destaca el potencial de los CBDC para mejorar los pagos internacionales. Actualmente, los pagos internacionales suelen ser costosos y lentos debido a la necesidad de pasar por varios intermediarios y sistemas de pago. Los CBDC pueden reducir significativamente los costos y el tiempo de procesamiento de los pagos internacionales al permitir que los pagos se realicen directamente entre los bancos centrales de los países implicados, eliminando la necesidad de intermediarios y reduciendo los costos de transacción. Esto puede tener un gran impacto en el comercio internacional, ya que los pagos internacionales más rápidos y económicos pueden fomentar la inversión y el comercio entre países.</p>
            <p>Otro caso de uso potencial para los CBDC es mejorar la eficiencia del comercio internacional. Actualmente, el comercio internacional suele implicar la conversión de moneda, lo que puede generar costos y riesgos de cambio. Los CBDC pueden reducir estos costos y riesgos al permitir que los pagos y las transacciones se realicen en tiempo real y en una moneda común. Esto podría reducir los riesgos de cambio y los costos asociados a la conversión de moneda, lo que a su vez podría fomentar el comercio y la inversión internacionales.</p>
            <p>Otro caso de uso es aumentar la inclusión financiera. Las personas y las empresas sin acceso a servicios bancarios tradicionales pueden tener dificultades para realizar transacciones y pagos. Los CBDC pueden ayudar a resolver este problema al permitir que las personas y las empresas realicen transacciones y pagos utilizando CBDC sin necesidad de una cuenta bancaria tradicional. Esto podría reducir la brecha financiera entre los países desarrollados y los países en desarrollo y fomentar la inclusión financiera a nivel mundial.</p>
            <p>Por último, los CBDC también pueden ayudar a reducir el riesgo de liquidez. Los bancos centrales pueden proporcionar liquidez a otros bancos centrales y a instituciones financieras en momentos de crisis financiera utilizando CBDC. Esto podría reducir los riesgos sistémicos y mejorar la estabilidad financiera a nivel mundial.</p>
          </ion-col>
        </ion-row>
      </ion-grid>
      <iframe src="https://www.youtube.com/embed/J-JubAJEgxA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
