/* CE SERVICE GERE L'AUTHENTIFICATION D'UN UTILISATEUR */
/* par les méthodes de création de nouvel utilisateur, connexion et déconnexion de l'utilisateur
ces méthodes "tant asynchrones, on crée des Promeses */
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  /*Toutes les méthodes liées à l'authentification Firebase se trouvent dans  firebase.auth()*/
  /**
   * Méthode asynchrone prend en paramètre email, password définit depuis le projet sur le site firebase
   * Création d'un nouvel utilisateur grâce aux méthodes de firebase
   * @param email: string
   * @param password: string
   */
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  /**
   * Connexion de l'utilisateur
   *
   * @param email: string
   * @param password: string
   */
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  /**
   * Déconnexion de l'utilisateur
   */
  signOutUser() {
    firebase.auth().signOut();
  }


}
