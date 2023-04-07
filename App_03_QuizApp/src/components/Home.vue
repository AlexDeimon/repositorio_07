<template>
    <ion-page>
        <ion-content>
            <section class="home contenedor1">
                <form v-on:submit.prevent=submitQuiz() id="submitquiz" v-if="auth">
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
                <div class="contenedor2">
                    <ion-card v-for="quiz in quizList" v-bind:key="quiz" class="quiz">
                        <ion-card-header>
                            <ion-card-title>{{ quiz.nombre }}</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-button @click="quiz.isModalOpen = true">¡Inicia!</ion-button>
                            <ion-button @click="setOpen2(quiz.isModal2Open = true, quiz.nombre)" color="warning">Ranking</ion-button>
                            <ion-button color="danger" @click="deleteQuiz(quiz.nombre)" v-if="auth && quizList.length > 1"><ion-icon :icon="trashOutline" size="large"/></ion-button>
                        </ion-card-content>
                        <ion-modal :is-open="quiz.isModalOpen" @close="quiz.isModalOpen = false">
                            <ion-header>
                                <ion-toolbar color="primary">
                                    <ion-title>{{ quiz.nombre }}</ion-title>
                                    <ion-buttons slot="end">
                                    <ion-button @click="quiz.isModalOpen = false">X</ion-button>
                                    </ion-buttons>
                                </ion-toolbar>
                            </ion-header>
                            <ion-content class="ion-padding">
                                <ion-item>
                                    <ion-label position="floating">Digita un username: </ion-label>
                                    <ion-input v-model='usuario'></ion-input>    
                                </ion-item>
                                <ion-button @click="start(quiz.isModalOpen=false, quiz.preguntas, quiz.nombre, usuario)">¡Inicia!</ion-button>
                            </ion-content>
                        </ion-modal>
                        <ion-modal :is-open="quiz.isModal2Open" @close="quiz.isModal2Open = false">
                            <ion-header>
                                <ion-toolbar color="warning">
                                    <ion-title>Ranking de {{ quiz.nombre }}</ion-title>
                                    <ion-buttons slot="end">
                                    <ion-button @click="setOpen2(quiz.isModal2Open = false)">X</ion-button>
                                    </ion-buttons>
                                </ion-toolbar>
                            </ion-header>
                            <ion-content class="ion-padding">
                                <ion-item color="warning">
                                    <ion-label>Puesto</ion-label>
                                    <ion-label>Usuario</ion-label>
                                    <ion-label>Puntuación</ion-label>
                                </ion-item>
                                <ion-item v-for="(user, index) in usersList" v-bind:key="user">
                                    <ion-label v-if="index == 0"><ion-badge color="primary"><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/25/external-gold-medal-achievements-flaticons-lineal-color-flat-icons-2.png" alt="oro"></ion-badge></ion-label>
                                    <ion-label v-if="index == 1"><ion-badge color="primary"><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/25/external-medals-achievements-flaticons-lineal-color-flat-icons-2.png" alt="plata"></ion-badge></ion-label>
                                    <ion-label v-if="index == 2"><ion-badge color="primary"><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/25/external-bronze-medal-achievements-flaticons-lineal-color-flat-icons-2.png" alt="bronze"></ion-badge></ion-label>
                                    <ion-label v-if="index > 2"><ion-badge color="primary"><ion-label>{{ index+1 }}</ion-label></ion-badge></ion-label> 
                                    <ion-label>{{ user.nombre }}</ion-label>
                                    <ion-label>{{ user.puntos }}</ion-label>
                                </ion-item>
                            </ion-content>
                        </ion-modal>
                    </ion-card>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>
<script>
import {IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonBadge, alertController} from "@ionic/vue";
import { trashOutline } from 'ionicons/icons';
import { read, utils} from 'xlsx';
import axios  from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components: { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonBadge },
    props: {
        auth: Boolean
    },
    data() {
        return {
            selectedFile: null,
            usuario: "",
            quiz: {
                nombre: "",
                preguntas: [],
            },
            quizList: [],
            usersList: [],
        };
    },
    methods: {
        setOpen2(isOpen2, quiz) { 
            this.loadUsersList(quiz);
            this.usersList = []
        },
        async loadQuizList(){
            try {
                const response = await axios.get("https://pwa-movil-default-rtdb.firebaseio.com/quizes.json");
                this.quizList = Object.values(response.data).map(quiz => ({ ...quiz, isModalOpen: false, isModal2Open: false, }));
            } catch (error) { console.log(error); }
        },
        async loadUsersList(quiz){
            try {
                const response = await axios.get(`https://pwa-movil-default-rtdb.firebaseio.com/quizes/${quiz}/usuarios.json`);
                this.usersList = Object.values(response.data).sort((a, b) => b.puntos - a.puntos);
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
                preguntas: quiz,
            });
            await this.loadQuizList();
        },
        async submitQuiz(){
            if(!this.validateForm()){ return; }
            try {
                const newJson = await this.convertFileToJson();
                if(Object.values(this.quizList).some(quiz => quiz.nombre == this.quiz.nombre)){
                    document.getElementById('submitquiz').reset();
                    this.showAlert('ERROR', 'EL QUIZ YA EXISTE');
                    this.quiz.nombre = null;
                    this.selectedFile = false;
                } else if (!Object.prototype.hasOwnProperty.call(newJson[0], 'pregunta') || !Object.prototype.hasOwnProperty.call(newJson[0], 'respuestaCorrecta') || !Object.prototype.hasOwnProperty.call(newJson[0], 'respuestaIncorrecta1') || !Object.prototype.hasOwnProperty.call(newJson[0], 'respuestaIncorrecta2') || !Object.prototype.hasOwnProperty.call(newJson[0], 'respuestaIncorrecta3')) {
                    document.getElementById('submitquiz').reset();
                    this.showAlert('ERROR', 'LA PRIMER FILA DEL DOCUMENTO DEBE TENER EL FORMATO: pregunta,respuestaCorrecta,respuestaIncorrecta1,respuestaIncorrecta2,respuestaIncorrecta3');
                    this.quiz.nombre = null;
                    this.selectedFile = false;
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
        start(isModalOpen, jsonData, name, user){
            if(user==""){
                this.showAlert('ERROR', 'Debes ingresar un username');
            } else {
                const newRandomArray = [];
                const transformedData = [];
                jsonData.forEach((item) => {
                    const answers = [item["respuestaCorrecta"], item["respuestaIncorrecta1"], item["respuestaIncorrecta2"], item["respuestaIncorrecta3"]];
                    const correctAnswer = answers[0];
                    const incorrectAnswers = answers.slice(1);
                    transformedData.push({
                        "correct_answer": correctAnswer,
                        "incorrect_answers": incorrectAnswers,
                        "question": item["pregunta"],
                    });
                });
                for (let i = 0; i < 10; i++) {
                    const randomIndex = Math.floor(Math.random() * transformedData.length);
                    newRandomArray.push(transformedData[randomIndex]);
                    transformedData.splice(randomIndex, 1);
                }    
                setTimeout(() => {
                    this.$emit("startTheGame", {
                        quizName: name,
                        questions: newRandomArray,
                        user: user,
                    }); 
                }, 500);    
            }
        },
        async deleteQuiz(quiz){
            await axios.delete(`https://pwa-movil-default-rtdb.firebaseio.com/quizes/${quiz}.json`);
            await this.loadQuizList();
            this.showAlert('HECHO', 'Se ha borrado el quiz');
        }
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
        return{showAlert, trashOutline}
    },
    async created() {
        await this.loadQuizList();
        console.log(this.quizList)
    }
});
</script>
<style>
.contenedor2 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.quiz{
    width: 300px;
}
</style>