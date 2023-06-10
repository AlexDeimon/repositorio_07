<template>
    <ion-page>
      <ion-content>
        <div id="paypal-button-container"></div>
      </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent} from '@ionic/vue';
import { PayPalButton } from "@paypal/checkout-server-sdk";
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Pay",
    components: {IonPage, IonContent},
    mounted() {
        this.setupPayPal();
    },
    methods: {
        async setupPayPal() {
        // Configura el entorno de Sandbox de PayPal
        PayPalButton.setup("", {
            environment: "sandbox",
            clientId: "X28XTAJCE8CL6",
        });

        // Crea el botón de pago de PayPal
        PayPalButton.render({
            createOrder: (data, actions) => {
            // Define la lógica para crear la orden de pago
            // y devuelve el ID de la orden generada
            return actions.order.create({
                purchase_units: [
                {
                    amount: {
                    value: "10.00", // Monto del pago
                    },
                },
                ],
            });
            },
            onApprove: (data, actions) => {
            // Define la lógica cuando el pago es aprobado
            return actions.order.capture().then((details) => {
                // Realiza las acciones necesarias con los detalles del pago
                console.log(details);
            });
            },
        }).render("#paypal-button-container");
        },
    },
})
</script>