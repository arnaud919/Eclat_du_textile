import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      credentials: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(12)])
      })
    });
  }

  ngOnInit(): void {}

  // Gestion de la soumission du formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.get('credentials')?.value;
      this.loginUser(email, password);
    }
  }

  // Méthode pour appeler le service de login
  private loginUser(email: string, password: string): void {
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.handleLoginSuccess(response.token);
      },
      error: (error) => {
        this.handleLoginError(error);
      }
    });
  }

  // Méthode pour gérer une connexion réussie
  private handleLoginSuccess(token: string): void {
    
    // Décoder le token avec jwtDecode
    const decodedToken = jwtDecode(token);

    this.authService.saveToken(token);  // Sauvegarder le token reçu
    this.navigateToHome();  // Rediriger vers la page d'accueil
  }

  // Méthode pour gérer les erreurs de connexion
  private handleLoginError(error: any): void {
    console.error('Erreur lors de la connexion', error);
    // Tu peux ajouter ici d'autres actions comme afficher un message d'erreur
  }

  // Méthode pour rediriger vers la page d'accueil après connexion réussie
  private navigateToHome(): void {
    this.router.navigate(['/']);  // Rediriger vers la page d'accueil
  }
}
