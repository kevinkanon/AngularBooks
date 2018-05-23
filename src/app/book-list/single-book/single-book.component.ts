/* CE COMPONENT GERE LA VUE D'UN SEUL LIVRE */
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) {}

  /**
   * crée un book vide au cas ou le server met du temps à retourner les données
   * puis récupère le book depuis la database grace à son id capturé dans l'url et passé en argument au service
   * .then() car méthode asynchrone
   */
  ngOnInit() {
    /*crée un book vide au cas ou le server met du temps à retourner les données*/
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then( /*+id cast l'id recupéré de l'url de strig à number */
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
