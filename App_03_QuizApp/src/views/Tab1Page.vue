<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Quiz</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <Home @startTheGame="startTheGame" v-if="showHome" />
      <Question v-if="gameStarted && quizData && !gameFinished" :quizData="this.quizData" @endGame="endGame"/>
      <Final v-if="gameFinished" :correctAnswers="correctAnswers" :numberOfQuestions="numberOfQuestions" @resetGame="resetGame"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Home from "../components/Home.vue";
import Question from "../components/Question.vue";
import Final from "../components/Final.vue";
import { defineComponent } from 'vue';
export default defineComponent({
  components: {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, Home, Question, Final},
  data() {
    return {
      showHome: true,
      gameStarted: false,
      gameFinished: false,
      quizData: [],
      numberOfQuestions: 0,
    };
  },
  methods: {
    startTheGame({ questions }) {
      this.quizData = questions;
      this.numberOfQuestions = this.quizData.length;
      this.showHome = false;
      this.gameStarted = true;
    },
    endGame({ correctAnswers }) {
      this.correctAnswers = correctAnswers;
      this.gameFinished = true;
    },
    resetGame() {
      this.showHome = true;
      this.gameStarted = false;
      this.gameFinished = false;
      this.quizData = [];
    },
  },
})
</script>
