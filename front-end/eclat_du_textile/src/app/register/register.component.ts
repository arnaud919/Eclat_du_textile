import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
        [Validators.required,
         Validators.minLength(12),
         Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.RegisterForm.valid) {
      const userData = {
        ...this.RegisterForm.value,
        user_type: 'customer'
      };

      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
