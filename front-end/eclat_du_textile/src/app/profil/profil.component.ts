import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  userProfile: any = null;  // Stocker les données utilisateur
  isAdmin: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est admin
    this.isAdmin = this.authService.isAdmin();

    // Récupérer les informations de l'utilisateur à partir du token JWT décodé
    const decodedToken = this.authService.getDecodedToken();
    
    if (decodedToken) {
      this.userProfile = decodedToken;  // Mettre à jour les données du profil utilisateur
    } else {
      this.errorMessage = 'Erreur lors du chargement du profil utilisateur.';
    }
  }
}
