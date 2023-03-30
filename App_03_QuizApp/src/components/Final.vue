<template>
    <ion-page>
        <section class="final contenedor1">
            <p v-html="result"></p>
            <div>
                <p class="answers-result">Obtuviste: {{ points }} puntos</p>
            </div>
            <ion-button @click="resetGame">VOLVER A INICIO</ion-button>
        </section>
    </ion-page>
</template>
<script>
import { IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from 'vue';
import axios  from 'axios';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Final",
    components: {IonPage, IonButton},
    props: {
        points: Number,
        user: String,
        quizName: String
    },
    methods: {
        userPoints(){
            const name = this.quizName;
            const user = this.user;
            axios.put(`https://pwa-movil-default-rtdb.firebaseio.com/quizes/${name}/usuarios/${user}.json`, {
                nombre: user,
                puntos: this.points
            });   
        },
        resetGame() {
            this.userPoints();
            this.$emit("resetGame");
        },
    },
});
</script>
<style>
.answers-result{
    font-family: 'VT323', monospace;
    font-size: 50px;
}
</style>
