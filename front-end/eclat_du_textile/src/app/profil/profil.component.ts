import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { CustomerInfo, ServiceProvision } from '../shared/interfaces/entities';
import { FormDataServiceService } from '../shared/services/form-data-service.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [CommonModule, RouterLink]
})
export class ProfileComponent implements OnInit {
  formDataArray: any[] = [];  // Tableau pour stocker toutes les soumissions du formulaire
  userProfile: CustomerInfo | null = null;  // Stocker les données utilisateur
  isLoading: boolean = true;  // Pour gérer l'état de chargement
  isAdmin: boolean = false;
  errorMessage: string | null = null;
  panier: any[] = [];

  ServiceProvisionResponseItemData: ServiceProvision | null = null;
  totalPrice: number = 0;
  serviceData: any[] = [];  // Tableau pour stocker les données récupérées du sessionStorage

  constructor(private authService: AuthService) { }

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

    // Charger les données de formulaire et de service
    this.loadProfileData();
    this.loadServiceData();
  }

  // Récupérer les données du profil utilisateur et les données de formulaire
  loadProfileData(): void {
    // Charger les données du profil utilisateur depuis le sessionStorage
    const storedUserProfile = sessionStorage.getItem('userProfile');
    
    if (storedUserProfile) {
      this.userProfile = JSON.parse(storedUserProfile);  // Charger les données du profil
    } else {
      this.errorMessage = 'Aucune donnée de profil trouvée.';
    }
  
    // Charger le panier ou autre service si nécessaire
    const storedData = sessionStorage.getItem('serviceProvisionData');
    if (storedData) {
      this.formDataArray = JSON.parse(storedData);
      this.calculateTotalPrice();  // Calculer le total des prix après avoir chargé les données
    } else {
      console.log('Aucune donnée de panier trouvée.');
      this.formDataArray = [];
      this.totalPrice = 0;  // Réinitialiser le prix total si le panier est vide
    }
  }
  


  private loadServiceData(): void {
    const storedData = sessionStorage.getItem('serviceProvisionData');
    
    if (storedData) {
      this.serviceData = JSON.parse(storedData);
      
      // Assurer que serviceData est bien un tableau
      if (Array.isArray(this.serviceData)) {
        // Si c'est un tableau, on peut utiliser forEach
        this.serviceData.forEach(entry => {
          entry.servicePrice = entry.servicePrice ?? 0;  // Définit servicePrice à 0 s'il est null
          entry.totalPrice = entry.totalPrice ?? 0;  // Définit totalPrice à 0 s'il est null
        });
  
        console.log('Données récupérées du sessionStorage :', this.serviceData);
        this.calculateTotalPrice();  // Calculer le prix total
      } else {
        console.error('Les données récupérées ne sont pas un tableau.');
        this.serviceData = [];  // Si ce n'est pas un tableau, on réinitialise à un tableau vide
      }
    } else {
      console.error('Aucune donnée trouvée dans le sessionStorage.');
      this.serviceData = [];  // Réinitialiser à un tableau vide si aucune donnée
    }
  }
  

  // Calculer le prix total des services ajoutés
  calculateTotalPrice(): void {
    this.totalPrice = this.serviceData.reduce((sum, item) => sum + item.totalPrice, 0);
    console.log('Prix total recalculé :', this.totalPrice);
  }



  // Effacer les données du sessionStorage
  clearData(): void {
    sessionStorage.removeItem('serviceProvisionData');
    this.serviceData = [];
    this.totalPrice = 0;
    console.log('Données et prix total effacés.');
  }

  removeItem(index: number): void {
    // Vérifie que l'index est valide
    if (index >= 0 && index < this.serviceData.length) {
      // Supprime l'article à l'index donné
      this.serviceData.splice(index, 1);

      // Met à jour le sessionStorage avec les articles restants
      sessionStorage.setItem('serviceProvisionData', JSON.stringify(this.serviceData));

      // Recalcule le prix total après suppression
      this.calculateTotalPrice();

      console.log(`Article à l'index ${index} supprimé du profil.`);
    } else {
      console.error('Index invalide pour la suppression de l\'article.');
    }
  }
}
