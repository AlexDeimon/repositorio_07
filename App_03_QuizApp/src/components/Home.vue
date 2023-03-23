<template>
    <ion-page>
        <ion-content>
            <section class="home">
                <ion-item>
                    <ion-label>Subir excel</ion-label>
                    <ion-input type="file" id="fileUpload" accept=".xls,.xlsx, .csv" v-on:change="readFile"></ion-input>
                </ion-item>
                <ion-button @click="convert()">Convertir</ion-button><br>
                <ion-button @click="passEvent()" v-if="startGame">Start!</ion-button><br>
            </section>
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, alertController} from "@ionic/vue";
import { read, utils} from 'xlsx';
import { defineComponent } from 'vue';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Home",
    components: {IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton},
    data() {
        return {
            selectedFile: null,
            newJson: [],
            startGame: false,
            message: String,
        };
    },
    methods: {
        readFile(){
            this.selectedFile = event.target.files[0];
        },
        convert() {
            if (this.selectedFile) {
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                    const data = event.target.result;
                    const workbook = read(data, {
                        type: "binary"
                    });
                    workbook.SheetNames.forEach(sheet => {
                        const rowObject = utils.sheet_to_row_object_array(
                            workbook.Sheets[sheet]
                        );
                        this.newJson = rowObject;
                    });
                };
                fileReader.readAsBinaryString(this.selectedFile);
                this.startGame = true;
            }
        },
        passEvent(){
            const jsonData = this.newJson;
            const newRandomArray = [];
            const transformedData = jsonData.map((data) => {
                const entries = Object.entries(data);
                const question = entries[0][1];
                const correctAnswer = entries[1][1];
                const incorrectAnswers = entries.slice(2).map(entry => entry[1]);
                return {
                    "question": question,
                    "correct_answer": correctAnswer,
                    "incorrect_answers": incorrectAnswers.filter(answer => answer !== correctAnswer)
                };
            });
            if(transformedData.length >= 10){
                for (let i = 0; i < 10; i++) {
                    const randomIndex = Math.floor(Math.random() * transformedData.length);
                    newRandomArray.push(transformedData[randomIndex]);
                    transformedData.splice(randomIndex, 1);
                }    
                this.newJson = newRandomArray;
                console.log(this.newJson);
                this.$emit("startTheGame", {
                    questions: this.newJson,
                });
            } else {
                this.selectedFile = null,
                this.newJson = []
                this.presentAlert();
            }
        },
    },
    setup(){
        const presentAlert = async () => {
            const alert = await alertController.create({
            header: 'ERROR',
            message: 'Verifica que el excel tenga al menos 10 preguntas',
            buttons: ['OK'],
            });
            await alert.present();
            };
        return{presentAlert}
    }
});
</script>