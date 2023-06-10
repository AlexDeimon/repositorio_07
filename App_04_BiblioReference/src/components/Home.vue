<template>
  <ion-page>
    <ion-content>
      <ion-searchbar placeholder="Escriba el titulo del libro" v-model="book.title"></ion-searchbar>
      <ion-searchbar placeholder="Escriba el autor del libro" v-model="book.author"></ion-searchbar>
      <ion-item v-if="searchDate">
        <ion-label>Filtrar por fecha: </ion-label>
        <ion-input type="number" placeholder="Año de publicación" min="1900" max="2023" pattern="\d{4}" v-model="book.year"></ion-input>
      </ion-item>
      <ion-button @click="searchBook">Buscar</ion-button>
      <ion-button @click="searchFavorites" color="warning">Favoritos</ion-button>
      <ion-card v-for="book in books" v-bind:key="book">
        <ion-card-header>
          <ion-toolbar>
            <ion-grid>
              <ion-row>
                <ion-col size-md="10">
                  <ion-card-title>{{ book.volumeInfo.title }}</ion-card-title>
                </ion-col>
                <ion-col size-md="2">
                  <ion-button @click="favorite(book)" color="transparent"><ion-icon :icon="star" color="warning"></ion-icon></ion-button>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-toolbar>
        </ion-card-header>
        <ion-card-content>
          <img v-bind:src="book.volumeInfo.imageLinks.thumbnail" alt="Imagen de portada del libro">
          <h2>{{ book.volumeInfo.authors[0]}}</h2>
          <h2><span v-if="book.volumeInfo.publisher">{{ book.volumeInfo.publisher }},</span> {{ book.volumeInfo.publishedDate}} <span v-if="book.volumeInfo.pageCount">- {{ book.volumeInfo.pageCount }} páginas</span></h2>
          <h2>idioma: {{ book.volumeInfo.language }}</h2>
          <h2>Calificación: <ion-badge color="success">{{ book.volumeInfo.averageRating }}</ion-badge></h2>
          <ion-badge color="primary">{{ book.volumeInfo.categories[0] }}</ion-badge>
          <p>{{ book.volumeInfo.description }}</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonSearchbar, IonButton, alertController, IonItem, IonLabel, IonInput, IonIcon, IonToolbar, IonGrid, IonRow, IonCol, toastController} from '@ionic/vue';
import axios  from 'axios';
import { defineComponent } from 'vue';
import { star } from 'ionicons/icons';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {IonPage, IonContent,IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonSearchbar, IonButton, IonItem, IonLabel, IonInput, IonIcon, IonToolbar, IonGrid, IonRow, IonCol},
  props: {
    username: String,
  },
  data() {
    return {
      book: {
        title:"",
        author:"",
        year: ""
      },
      books: [],
      searchDate: false
    };
  },
  methods: {
    search(query){
      axios.get(`${query}`)
      .then(response => {
        console.log(response.data.items);
        if(response.data.items!=undefined){
          this.books = response.data.items.filter(book => book.volumeInfo.imageLinks && book.volumeInfo.authors && book.volumeInfo.publishedDate && book.volumeInfo.language && book.volumeInfo.averageRating && book.volumeInfo.categories&& book.volumeInfo.description );
          this.books.sort((book1, book2) => book2.volumeInfo.averageRating - book1.volumeInfo.averageRating);
          this.books = this.books.filter((book, index, self) => index === self.findIndex((b) => (b.id === book.id)));
          if(this.book.year !=""){
            (this.book.year.length == 4) ? this.books = this.books.filter(book => book.volumeInfo.publishedDate.startsWith(this.book.year)) : this.showAlert('Error', 'Digite un año valido');
          }
          this.searchDate = true;  
        }
        if(this.books.length == 0 ){
          this.showAlert('Sin resultados', 'No hay libros segun tu criterio de busqueda');
          this.book.year ="";
          this.searchDate = false; 
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    searchBook(){
      this.books = [];
      if(this.book.title!="" && this.book.author!=""){
        this.search(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.book.title}+inauthor:${this.book.author}&maxResults=40&key=AIzaSyAkOdviRYSezG1KGhGqKaSs7CFt1mYc-Kk`);
      } else if(this.book.title!="" && this.book.author==""){
        this.search(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.book.title}&maxResults=40&key=AIzaSyAkOdviRYSezG1KGhGqKaSs7CFt1mYc-Kk`);
      } else if(this.book.title=="" && this.book.author!=""){
        this.search(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${this.book.author}&maxResults=40&key=AIzaSyAkOdviRYSezG1KGhGqKaSs7CFt1mYc-Kk`);
      } else {
        this.showAlert('Error', 'Debes ingresar el titulo o el autor del libro');
        this.searchDate = false;
      }
    },
    async favorite(book){
      const id = book.id;
      const response = await axios.get(`https://pwa-movil-default-rtdb.firebaseio.com/BiblioReference/${id}.json`);
      const booksData = response.data;
      let favoriteUsers = [];
      if (booksData && booksData.favoriteUsers) { favoriteUsers = booksData.favoriteUsers; }
      const userIndex = favoriteUsers.indexOf(this.username);
      if (userIndex !== -1) { 
        favoriteUsers.splice(userIndex, 1);
        const newData = {
          book: book,
          favoriteUsers: favoriteUsers
        };
        await axios.put(`https://pwa-movil-default-rtdb.firebaseio.com/BiblioReference/${id}.json`, newData);
        await this.presentToast('Se ha eliminado el libro de tus favoritos');
        await this.searchFavorites(); 
      } else { 
        favoriteUsers.push(this.username);
        const newData = {
          book: book,
          favoriteUsers: favoriteUsers
        };
        await this.presentToast('Se ha agregado el libro a tus favoritos');
        await axios.put(`https://pwa-movil-default-rtdb.firebaseio.com/BiblioReference/${id}.json`, newData);
      }
    },
    async searchFavorites(){
      const response = await axios.get('https://pwa-movil-default-rtdb.firebaseio.com/BiblioReference.json');
      const booksData = response.data;
      const filteredBooks = Object.values(booksData).filter(book => book.favoriteUsers && book.favoriteUsers.includes(this.username));
      this.books = filteredBooks.map(book => book.book);
    },
    async presentToast(message) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
        position: 'middle',
        color: "warning"
      });
      await toast.present();
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
        return{showAlert, star}
    },
});
</script>
<style>
img {
  float: left;
  margin: 0 16px 16px 0;
}
ion-card-header{
  padding: 0;
}
ion-card-header ion-col{
  display: flex;
  align-items: center;
}
ion-card-header .button {
  position: absolute;
  right: 0;
}
.button{
  background: transparent;
}
</style>