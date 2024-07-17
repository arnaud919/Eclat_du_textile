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
  public RegisterForm:FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    first_name: new FormControl(''),
    last_name: new FormControl('')
  })

  onSubmit() {
    if (this.RegisterForm.valid) {
      this.service.register(this.RegisterForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          console.log(this.RegisterForm.value);
        },
        error: (error) => {
          console.error('Erreur inscription', error);
          console.log(this.RegisterForm.value);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

}