import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes  } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent }, /* se conecter */
  { path: 'auth/signin',  component: SigninComponent }, /* s'enregistrer */
  { path: 'books', canActivate: [AuthGuardService], component: BookListComponent },  /* visualiser tous les livres */
  { path: 'books/new', canActivate: [AuthGuardService], component: BookFormComponent }, /* ajouter|modifier un livre */
  { path: 'books/view/:id', canActivate: [AuthGuardService], component: SingleBookComponent }, /* visualiser un seul livre id paramètre */
  { path: '', redirectTo: 'books', pathMatch: 'full' }, /* si url pas définie pathMatch pr eviter bug*/
  { path: '**', redirectTo: 'books' } /* n'importe quelle autre route */
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
