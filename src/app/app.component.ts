import { Component } from '@angular/core';
/* importation de firebase injecté dans le constructeur de l'application afin de pouvoir
utiliser tous les services de firebase */
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my Angular Book Application';

  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyC6fShb30PFw2DCpLMh0jS8yVvtpnDpYns',
      authDomain: 'angularbooks-346fa.firebaseapp.com',
      databaseURL: 'https://angularbooks-346fa.firebaseio.com',
      projectId: 'angularbooks-346fa',
      storageBucket: 'angularbooks-346fa.appspot.com',
      messagingSenderId: '346678050682'
    };
    firebase.initializeApp(config);
  }

}
