/* CE COMPONENT GERE LA CREATION L'INSCRIPTION D'UN NOUVEL UTILISATEUR
via PAR LE SERVICE AuthService et un formulaire d'inscription méthode Reactive*/
import { Component, OnInit } from '@angular/core';
/* FormBuilder permet de crée le form Reactive et FormGroup apporte des méthode de gestion a FormBuilder */
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  /* Represente le formulaire en typescript lié au form de la view */
  signUpForm: FormGroup;
  /* message d'erreur du formulaire s'il y en a */
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }
  /* ngOnInit() s'exécute tjrs après mle constructor et va ici initialiser le form */
  ngOnInit() {
    this.initForm();
  }
  /**
   * création du form typescript Validators du password requiers 6 caract alphanum
   */
  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    /* .then() car createNewUser est une méthode asynchrone */
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
