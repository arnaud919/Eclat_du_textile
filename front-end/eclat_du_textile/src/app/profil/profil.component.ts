import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { CustomerInfo, ServiceProvision } from '../shared/interfaces/entities';
import { FormDataServiceService } from '../shared/services/form-data-service.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  formDataArray: any[] = [];  // Tableau pour stocker toutes les soumissions du formulaire
  userProfile: CustomerInfo | null = null;  // Stocker les données utilisateur
  isLoading: boolean = true;  // Pour gérer l'état de chargement
  isAdmin: boolean = false;
  errorMessage: string | null = null;

  ServiceProvisionResponseItemData: ServiceProvision | null = null
  serviceName: string | null = '';
  totalPrice: number = 0;
  cloth: string | null = '';
  material: string | null = '';
  color: string | null = '';
  serviceData: any[] = [];  // Tableau pour stocker les données récupérées du localStorage


  constructor(private authService: AuthService, private formDataService: FormDataServiceService) { }
  formData: any = {};

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

    // Récupérer les données de formulaire stockées
    this.formData = this.formDataService.getFormData();
    console.log('Données récupérées pour le profil:', this.formData);

    this.loadProfileData();
    this.loadServiceData();
  }

  // Récupérer les données du profil utilisateur
  private loadProfileData(): void {
    try {
      const storedUserProfile = localStorage.getItem('userProfile');
      if (storedUserProfile) {
        this.userProfile = JSON.parse(storedUserProfile) as CustomerInfo;
      } else {
        this.errorMessage = 'Aucune donnée de profil trouvée.';
      }

      const storedData = localStorage.getItem('serviceProvisionData');
      if (storedData) {
        this.formDataArray = JSON.parse(storedData);
        this.calculateTotalPrice();  // Calculer le total des prix après avoir chargé les données
      }
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue lors de la récupération des données.';
      console.error('Erreur de chargement du profil:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Méthode pour récupérer les données depuis le localStorage
  private loadServiceData(): void {
    const storedData = localStorage.getItem('serviceProvisionData');
    
    // Vérifier si les données existent dans le localStorage
    if (storedData) {
      this.serviceData = JSON.parse(storedData);  // Charger les données depuis le localStorage
  
      // Débogage : Afficher les données récupérées
      console.log('Données récupérées du localStorage :', this.serviceData);
  
      this.calculateTotalPrice();  // Calculer le prix total basé sur les données récupérées
    } else {
      console.error('Aucune donnée trouvée dans le localStorage.');
    }
  }

  // Méthode pour calculer le prix total
  private calculateTotalPrice(): void {
    this.totalPrice = this.serviceData.reduce((acc: number, entry: any) => acc + (entry.totalPrice || 0), 0);
    console.log('Prix total calculé :', this.totalPrice);  // Débogage
  }

  // Méthode pour effacer les données du localStorage et le prix total
  clearData(): void {
    localStorage.removeItem('serviceProvisionData');  // Supprimer les données du localStorage
    this.serviceData = [];  // Vider le tableau local
    this.totalPrice = 0;    // Réinitialiser le prix total
    console.log('Données et prix total effacés du localStorage.');
  }
}
