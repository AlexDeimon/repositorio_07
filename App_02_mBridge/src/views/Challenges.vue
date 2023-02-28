<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Desafios</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <p>Aunque los CBDC tienen el potencial de revolucionar los pagos internacionales y fomentar la inclusión financiera, hay varios desafíos que deben superarse para que se conviertan en una realidad. Los bancos centrales deberán trabajar en estrecha colaboración con los reguladores financieros, los gobiernos y otros actores relevantes para garantizar la estabilidad, la privacidad y la seguridad del sistema de CBDC.</p>
      <dl>
        <dt>Tecnología: </dt>
        <dd>Los CBDC requieren tecnología de vanguardia para su emisión y gestión, lo que podría requerir inversiones significativas en infraestructura y seguridad. Además, también será necesario desarrollar sistemas de pago que sean interoperables y compatibles con diferentes tipos de CBDC.</dd>
        <dt>Regulación: </dt>
        <dd>La regulación de los CBDC será un desafío importante, ya que los bancos centrales deberán trabajar en estrecha colaboración con los reguladores financieros y los gobiernos para garantizar la estabilidad financiera y la protección de los consumidores. También será necesario desarrollar marcos legales y regulatorios claros y coherentes para garantizar la interoperabilidad y la estabilidad del sistema.</dd>
        <dt>Privacidad y seguridad: </dt>
        <dd>La privacidad y la seguridad de los datos son esenciales para la adopción generalizada de los CBDC. Será necesario garantizar que los datos de los usuarios estén protegidos y que los sistemas de pago sean seguros y resistentes a los ataques cibernéticos.</dd>
        <dt>Adopción: </dt>
        <dd>La adopción de los CBDC dependerá en gran medida de la confianza de los consumidores en el sistema. Los bancos centrales deberán trabajar para garantizar la aceptación generalizada de los CBDC a través de campañas de concientización y educación pública.</dd>
        <dt>Cooperación internacional: </dt>
        <dd>La cooperación internacional será esencial para garantizar la interoperabilidad y la estabilidad del sistema de CBDC. Los bancos centrales deberán trabajar en estrecha colaboración con otros bancos centrales y organismos internacionales para garantizar que los CBDC sean compatibles y estables en todo el mundo.</dd>
      </dl>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent}
  })
</script>
<style>
dl{
  margin-left: 3%;
  margin-right: 3%;
  line-height: 1.5;
}
dt{ 
  color: var(--ion-color-primary);
  margin-top: 10px;
}
dt::before{ content: "◆ "; }
</style>