import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Token } from '../shared/interfaces/entities';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({}); // Initialisation

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      credentials: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(5)])
      })
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value.credentials;
      this.authService.login({ email, password }).subscribe(
        (token) => {
          console.log('Token received:', token); // Pour déboguer
          this.authService.saveToken(token.token);
          this.router.navigate(['/dashboard']); // Redirection après connexion réussie
        },
        error => {
          console.error('Login failed', error);
          // Gérer les erreurs de connexion ici (par exemple, afficher un message d'erreur)
        }
      );
    }
  }
}
