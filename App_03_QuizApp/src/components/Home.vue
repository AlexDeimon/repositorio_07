<template>
    <ion-page>
        <ion-content>
            <section class="home">
                <form v-on:submit.prevent=submitQuiz() id="submitquiz">
                    <ion-item>
                        <ion-label>Subir excel</ion-label>
                        <ion-input type="file" id="fileUpload" accept=".xls,.xlsx, .csv" @:change="readFile"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Quiz: </ion-label>
                        <ion-input v-model='quiz.nombre'></ion-input>    
                    </ion-item>
                    <ion-button type="submit">Subir</ion-button>    
                </form>
                <h2>Lista de Quizes</h2>
                <ion-card v-for="quiz in quizList" v-bind:key="quiz">
                    <ion-card-header>
                        <ion-card-title>{{ quiz.nombre }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content><ion-button @click="start(quiz.preguntas)">¡Inicia!</ion-button></ion-card-content>
                    </ion-card>
            </section>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, alertController} from "@ionic/vue";
import { read, utils} from 'xlsx';
import axios  from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components: {IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton},
    data() {
        return {
            selectedFile: null,
            quiz: {
                nombre: "",
                preguntas: [],
            },
            quizList: []
        };
    },
    methods: {
        async loadQuizList(){
            this.quizList = [];
            try {
                const response = await axios.get("https://pwa-movil-default-rtdb.firebaseio.com/quizes.json");
                this.quizList = response.data;
            } catch (error) { console.log(error); }
        },
        readFile(){ this.selectedFile = event.target.files[0]; },
        validateForm() {
            if (!this.quiz.nombre) {
                this.showAlert('Error', 'El Quiz debe tener un nombre');
                return false;
            }
            if (!this.selectedFile) {
                this.showAlert('Error', 'Debes subir un archivo');
                return false;
            }
            return true;
        },
        async convertFileToJson() {
            const fileReader = new FileReader();
            return new Promise((resolve, reject) => {
                fileReader.onload = (event) => {
                    const data = event.target.result;
                    const { SheetNames, Sheets } = read(data, { type: 'binary' });
                    const rows = utils.sheet_to_json(Sheets[SheetNames[0]]);
                    resolve(rows);
                };
                fileReader.onerror = reject;
                fileReader.readAsBinaryString(this.selectedFile);
            });
        },
        async saveQuiz(quiz){
            await axios.put(`https://pwa-movil-default-rtdb.firebaseio.com/quizes/${this.quiz.nombre}.json`, {
                nombre: this.quiz.nombre,
                preguntas: quiz
            });
            await this.loadQuizList();
        },
        async submitQuiz(){
            if(!this.validateForm()){ return; }
            try {
                const newJson = await this.convertFileToJson();
                if(Object.values(this.quizList).some(quiz => quiz.nombre === this.quiz.nombre)){
                    this.showAlert('ERROR', 'EL QUIZ YA EXISTE');
                    document.getElementById('submitquiz').reset();  
                    this.quiz.nombre = null;
                    this.selectedFile = null;
                } else if(newJson.length < 10) {
                    document.getElementById('submitquiz').reset();
                    this.showAlert('ERROR', 'VERIFICA QUE EL QUIZ TENGA AL MENOS 10 PREGUNTAS');
                    this.quiz.nombre = null;
                    this.selectedFile = false;
                } else {
                    await this.saveQuiz(newJson);
                    this.showAlert('NUEVO QUIZ', 'Se ha creado el Quiz');
                    this.quiz.nombre = null;
                    this.selectedFile = null;
                }
            } catch (error) {this.showAlert('ERROR', `OCURRIÓ UN ERROR AL CREAR EL QUIZ: ${error}`); }
        },
        start(jsonData){
            const newRandomArray = [];
            const transformedData = [];
            jsonData.forEach((item) => {
                const answers = [item["opcion a"], item["opcion b"], item["opcion c"], item["opcion d"]];
                const correctAnswer = answers[0];
                const incorrectAnswers = answers.slice(1);
                transformedData.push({
                    "correct_answer": correctAnswer,
                    "incorrect_answers": incorrectAnswers,
                    "question": item["preguntas"],
                });
            });
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * transformedData.length);
                newRandomArray.push(transformedData[randomIndex]);
                transformedData.splice(randomIndex, 1);
            }    
            this.$emit("startTheGame", {
                questions: newRandomArray,
            });
        },
    },
    setup(){
        const showAlert = async (header, message) => {
            const alert = await alertController.create({
            header: header,
            message: message,
            buttons: ['OK'],
            });
            await alert.present();
        };
        return{showAlert}
    },
    async created() {
        await this.loadQuizList();
    }
});
</script>