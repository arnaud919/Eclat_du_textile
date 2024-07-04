import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  service = inject(RegisterService)
  public loginForm:FormGroup = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl('')
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.register(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          console.log(this.loginForm.value);
        },
        error: (error) => {
          console.error('Erreur inscription', error);
          console.log(this.loginForm.value);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

}