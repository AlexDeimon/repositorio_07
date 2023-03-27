<template>
    <ion-page>
        <section class="question">
            <h1><span>{{ index + 1 }}</span>. <span v-html="questionText"></span></h1>
            <div class="timer">
                <span class="clock"></span>
                <p>0:{{ secondsLeft }}</p>
            </div>
            <div class="answers">
                <div class="answer" @click="checkAnswer($event)" :style="[roundEnded ? '' : { background: '#1a1a1a' }]" v-html="question1"></div>
                <div class="answer" @click="checkAnswer($event)" :style="[roundEnded ? '' : { background: '#1a1a1a' }]" v-html="question2"></div>
                <div class="answer" @click="checkAnswer($event)" :style="[roundEnded ? '' : { background: '#1a1a1a' }]" v-html="question3"></div>
                <div class="answer" @click="checkAnswer($event)" :style="[roundEnded ? '' : { background: '#1a1a1a' }]" v-html="question4"></div>
            </div>
            <div class="post-answer" :style="[roundEnded ? { display: 'block' } : { display: 'none' }]">
                <p class="message">{{ message }}</p>
                <ion-button @click="goToNextQuestion"><label v-html="[index == numberOfQuestions - 1 ? 'Resultados' : 'Siguiente pregunta',]"></label></ion-button>
            </div>
        </section>
    </ion-page>
</template>
<script>
import { IonPage, IonButton } from "@ionic/vue";
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Question",
    components: {IonPage, IonButton},
    props: {
    quizData: Object,
  },
  data() {
    return {
      gameFinished: false,
      correctAnswers: 0,
      secondsLeft: 0,
      index: 0,
      numberOfQuestions: 0,
      answers: [],
      questionText: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      userAnswered: false,
      roundEnded: false,
      isUserAnswerCorrect: undefined,
      message: "",
    };
  },
  mounted() {
    this.prepareQuestion();
  },
  methods: {
    prepareQuestion() {
      const questions = this.quizData;
      const index = this.index;
      this.numberOfQuestions = questions.length;
      // Put all the answers in an array to shuffle them later
      this.answers.push(questions[index].correct_answer);
      questions[index].incorrect_answers.forEach((answer) => { this.answers.push(answer); });
      this.correctAnswer = questions[index].correct_answer;
      this.questionText = questions[index].question;
      this.question1 = this.getRandomAnswer();
      this.question2 = this.getRandomAnswer();
      this.question3 = this.getRandomAnswer();
      this.question4 = this.getRandomAnswer();
      this.countdown();
    },
    getRandomAnswer() {
      const randomNumber = Math.floor(Math.random() * this.answers.length);
      const answer = this.answers.splice(randomNumber, 1)[0];
      return answer;
    },
    countdown() {
      this.secondsLeft = 30;
      this.timer = setInterval(() => {
        if (!this.userAnswered) {
          if (this.secondsLeft > 0) this.secondsLeft--;
          else if (this.secondsLeft <= 0 || this.roundEnded) this.stopTimer();
          if (this.secondsLeft.toString().length < 2) this.secondsLeft = `0${this.secondsLeft}`;
        }
        if (this.secondsLeft <= 0 && !this.userAnswered) {
          this.message = "¡SE ACABÓ EL TIEMPO!";
          this.roundEnded = true;
        }
      }, 1000);
    },
    stopTimer() { clearInterval(this.timer); },
    checkAnswer(event) {
      if (!this.roundEnded) {
        this.userAnswered = true;
        this.roundEnded = true;
        this.isUserAnswerCorrect = event.target.innerText == this.correctAnswer ? true : false;
        this.message = this.isUserAnswerCorrect ? "¡CORRECTO!" : "¡INCORRECTO¡";
        if (this.isUserAnswerCorrect) this.correctAnswers++;
        setTimeout(() => { event.target.style.background = this.isUserAnswerCorrect ? "#00e900" : "#ff4a4a"; }, 200);
      }
    },
    goToNextQuestion() {
      this.checkIfItIsTheLastRound();
      if (!this.gameFinished) {
        this.index++;
        this.roundEnded = false;
        this.userAnswered = false;
        this.isUserAnswerCorrect = undefined;
        this.answers = [];
        this.stopTimer();
        this.prepareQuestion();
      }
    },
    checkIfItIsTheLastRound() {
      if (this.index == this.numberOfQuestions - 1) {
        this.gameFinished = true;
        this.$emit("endGame", {
          numberOfQuestions: this.numberOfQuestions,
          correctAnswers: this.correctAnswers,
        });
      }
    },
  },
});
</script>