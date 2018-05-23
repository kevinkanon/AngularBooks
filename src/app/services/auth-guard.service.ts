/* CE SERVICE "GUARD" PROTEGE LES ROUTES SUR LESKEL IL SERA DEFINI PR EMPECHER NIMPORTE QUI
D'Y ACCEDER*/
/* VERIF AUTHENTIFICATION ASYNCHRONE => SERVIRE RETOURNERA PROMISE AU LIEU DE BOOLEN STANDARD */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  /**
   * canActivate retournera une Observable de boolean ou Promise de boolean ou une boolean
   * mais ici nous voulons une Promise
   * si onAuthStateChanged retourne un user du server resolve true
   * sinon false il n'a pas le droit dacceder a cette route et redirection
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              /* ['/auth', 'signin'] syntaxe pr intégrer plusieurs éléments ds une route */
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
