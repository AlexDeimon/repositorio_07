<template>
    <ion-page>
        <section class="final">
            <h2>{{ message }}</h2>
            <p v-html="result"></p>
            <div>
                <p class="answers-result">{{ correctAnswers }}/{{ numberOfQuestions }}</p>
                <div class="bar">
                    <div :style="{ width: `${correctAnswersPercentage}%` }" class="correct"></div>
                    <div :style="{ width: `${wrongAnswersPercentage}%` }" class="wrong"></div>
                </div>
            </div>
            <button @click="resetGame">Play again</button>
        </section>
    </ion-page>
</template>
<script>
import { IonPage } from "@ionic/vue";
import anime from "animejs/lib/anime.es.js";
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Final",
    components: {IonPage},
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
        anime({
        targets: ".correct",
        width: `${this.correctAnswersPercentage}%`,
        easing: "linear",
        loop: false,
        duration: 900,
        });
        anime({
        targets: ".wrong",
        width: `${this.wrongAnswersPercentage}%`,
        easing: "linear",
        loop: false,
        duration: 900,
        });
    },
    methods: {
        calculatePercentages() {
        this.correctAnswersPercentage =
            (this.correctAnswers / this.numberOfQuestions) * 100;
        this.wrongAnswersPercentage = 100 - this.correctAnswersPercentage;
        },
        changeResultText() {
        if (
            this.correctAnswersPercentage >= 0 &&
            this.correctAnswersPercentage <= 30
        ) {
            this.message = "Was it too hard?";
            this.result = `You only got ${this.correctAnswersPercentage}% of the questions right. You should try again...`;
        } else if (
            this.correctAnswersPercentage > 30 &&
            this.correctAnswersPercentage < 60
        ) {
            this.message = "Not so good...";
            this.result = `You got ${this.correctAnswersPercentage}% of the questions right. Maybe you can get a better score playing again!`;
        } else if (
            this.correctAnswersPercentage >= 60 &&
            this.correctAnswersPercentage < 80
        ) {
            this.message = "Well done!";
            this.result = `You got ${this.correctAnswersPercentage}% of the questions right. That's a good score! 🐢`;
        } else if (
            this.correctAnswersPercentage >= 80 &&
            this.correctAnswersPercentage < 95
        ) {
            this.message = "Very good!";
            this.result = `You got ${this.correctAnswersPercentage}% of the questions right! Congrats! 🐢`;
        } else if (this.correctAnswersPercentage >= 95) {
            this.message = "You're incredible!";
            this.result = `Exceptional! You got ${this.correctAnswersPercentage}% of the questions right! Congratulations! 🐢`;
        }
        },
        resetGame() {
        this.$emit("resetGame");
        },
    },
});
</script>
