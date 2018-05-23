/* CE COMPONENT GERE LE FORMULAIRE D'AJOUT|MODIFICATIOND'UN LIVRE REACTIVE METHOD*/
import { Component, OnInit } from '@angular/core';
/* FormGroup represente le form en typescript et formBuilder ajoute des méthode de gestion à FormGroup */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  /* represente le form en typescript */
  bookForm: FormGroup;
  /* savoir si un fichier est en cours de chargement par défaut = false */
  fileIsUploading = false;
  /* url qui va récupérer */
  fileUrl: string;
  /* signaler la fin du chargement du fichier défault = false */
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  /**
   * ngOnInit() s'exécute toujours apres le controller et initialise un form à la création du component
   */
  ngOnInit() {
    this.initForm();
  }
  /**
   * Creation du formulaire en typescript group() est une méthode du FormBuilder
   */
  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  /**
   * récupère les données du form suite à la soumission du formulaire depuis le template,
   * et fait appel au service pour sauvegarder me book dans la base de données.
   * et redirige vers la liste d'affichage de tous les books
   */
  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;
    /*si l'url exsite et n'est pas vide on enregistre la photo*/
    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }

    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }
  /**
   * Enregistre un fihier sur le server via le service
   * MAIS AVANT définit fileIsUploading = true car fichier réellement en cours de chargement
   * @param file
   */
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  /**
   * méthode qui permettra de lier le <input type="file"> du template à la méthode onUploadFile()
   * @param event
   */
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
