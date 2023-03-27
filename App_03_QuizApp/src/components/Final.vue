<template>
    <ion-page>
        <section class="final">
            <h2>{{ message }}</h2>
            <p v-html="result"></p>
            <div>
                <p class="answers-result">{{ correctAnswers }}/{{ numberOfQuestions }}</p>
            </div>
            <ion-button @click="resetGame">VOLVER A INICIO</ion-button>
        </section>
    </ion-page>
</template>
<script>
import { IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Final",
    components: {IonPage, IonButton},
    props: {
        correctAnswers: Number,
        numberOfQuestions: Number,
    },
    data() {
        return {
        message: "",
        result: "",
        correctAnswersPercentage: 0,
        wrongAnswersPercentage: 0,
        };
    },
    mounted() {
        this.calculatePercentages();
        this.changeResultText();
    },
    methods: {
        calculatePercentages() {
            this.correctAnswersPercentage = (this.correctAnswers / this.numberOfQuestions) * 100;
            this.wrongAnswersPercentage = 100 - this.correctAnswersPercentage;
        },
        changeResultText() {
            if (this.correctAnswersPercentage >= 0 && this.correctAnswersPercentage <= 30) {
                this.message = "Muy dificil";
                this.result = `Solo tuviste ${this.correctAnswersPercentage}% de las respuestas correctas. Intentalo de nuevo...`;
            } else if (this.correctAnswersPercentage > 30 && this.correctAnswersPercentage < 60) {
                this.message = "No estuvo tan mal";
                this.result = `Tuviste ${this.correctAnswersPercentage}% de las respuestas correctas.. Puedes mejorar si intentas de nuevo!`;
            } else if (this.correctAnswersPercentage >= 60 && this.correctAnswersPercentage < 80) {
                this.message = "¡Bien hecho!";
                this.result = `Tuviste ${this.correctAnswersPercentage}% de las respuestas correctas. ¡Muy buen puntaje!`;
            } else if ( this.correctAnswersPercentage >= 80 && this.correctAnswersPercentage < 90) {
                this.message = "¡Muy bien!";
                this.result = `¡Tuviste ${this.correctAnswersPercentage}% de las respuestas correctas!`;
            } else if (this.correctAnswersPercentage >= 90) {
                this.message = "Perfecto!";
                this.result = `!Lograste contestar el ${this.correctAnswersPercentage}% de las preguntas!`;
            }
        },
        resetGame() {
            this.$emit("resetGame");
        },
    },
});
</script>
