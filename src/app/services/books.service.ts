/* CE SERVICE GERE LES données LIVRES QUI SERONT LIE A LA FIREBASE DATABASE */
import { Injectable } from '@angular/core';
/* Model de livre necessaire à l'enregistrement en datadase */
import { Book } from '../models/book.model';
/* Subject permettra de générer une instance d'object */
import { Subject } from 'rxjs';
/* import de firebase utilisant ses méthodes pr interagir avec la database */
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  /* de type model Books ki a title, author ds son constructeur */
  books: Book[] = [];
  /* represente une instance de l'objet Book importé représentant le model */
  booksSubject = new Subject<Book[]>();

  constructor() { }

  /**
   * ABSTRACTION DES DONNEES next() est une fonction de Subject
   * emmet le Subject en prenant en compte le contenu de l'array books
   * afin d'émettre a travers le Subject qui crée une instance de type Book
   */
  emitBooks() {
    this.booksSubject.next(this.books);
  }
  /**
   * enregistre dans la database
   * ref() retourne une référence au node demandé de la base de données, va créer le node /books et
   * set() comme le put en HTTP enregistre en mettant a jour s'il y a déjà des données à /books
   */
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }
  /**
   * retourne tous les livre de la database
   * on() réagit a des modifications de la database
   */
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
    }
  /**
   * retourne un seul livre
   * @param id
   */
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  /**
   * Ajoute un livre type Book reçu en argument à l'array des books
   * puis le sauvegarde dans la database avant d'émmettre le Subject
   * @param newBook
   */
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  /**
   * supprimer un livre et la photo liée si elle existe
   * @param book
   */
  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé!');
        },
        (error) => {
          console.log('impossible supprimer photo! : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  /**
   * upload de fichier image via Méthode asynchrone car upload prend du temps
   * .child() crée un enfant à la racine du storage en database
   * @param file
   */
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
  }

}
