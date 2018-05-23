/* CE COMPONENT GERE LA LISTE VIEW DES LIVRES
view 1 seul livre / view pour supprimer / view pour créer un livre */
import { Component, OnDestroy, OnInit } from '@angular/core';
/* service qui gere les données, propriétés des books */
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
/* permet de souscrire .subscribe() au subject du service */
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy  {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) {}

  /**
   * ngOninit() sexécute tjrs apres le constructeur et mettra a jour l'array local depuis le service
   * ABSTRACTION On souscrit au Subject du service afin de faire la liaison avec le service et
   * mettre à jour la propriété array local books du component à celle du service
   * puis emitBooks() emmet le subjet pour la 1re fois
   */
  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }
  /**
   * Redirection depuis le template a click vers pour créer un nouveau livre
   */
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }
  /**
   * suppression du livre via méthode du service en donnant en argument le livre
   * @param book
   */
  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }
  /**
   * Redirection depuis le template a click vers visualiser un seul livre id passé en paramètre depuis le template
   * @param id
   */
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  /**
   * pour resilier la souscription a Subject
   */
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
