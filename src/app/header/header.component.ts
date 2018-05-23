/* CE COMPONENT GERE LE HEADER GENERAL DE L'APPLI CONTENANT LES PRINCIPALES ROUTES ET LE MENU */
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /* Etat d'authentification */
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  /**
   * ngOnInit() Méthode tjrs exécutée après le constructeur
   * onAuthStateChanged est déclenché à chaque changement d'état d'authentification
   * si l'utilisateur est authentifié un Object user est retourné par le server ensuite condition...
   */
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }
  /**
   * déconnexion qui appelle la méthode du service
   */
 onSignOut() {
    this.authService.signOutUser();
  }

}
