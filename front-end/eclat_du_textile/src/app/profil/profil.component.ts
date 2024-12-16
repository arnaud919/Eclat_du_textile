import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { CustomerInfo, ServiceProvision } from '../shared/interfaces/entities';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateUserService } from '../shared/services/update-user.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [CommonModule, RouterLink, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  // variables utilisateur
  profileForm!: FormGroup; // formulaire de mise à jour
  formDataArray: any[] = [];  // Tableau pour stocker toutes les soumissions du formulaire
  userProfile: CustomerInfo | null = null;  // Stocker les données utilisateur
  isLoading: boolean = true;  // Pour gérer l'état de chargement
  isAdmin: boolean = false;
  errorMessage: string | null = null;
  panier: any[] = [];
  userId: number | null = null;

  //variables services
  ServiceProvisionResponseItemData: ServiceProvision | null = null;
  totalPrice: number = 0;
  serviceData: any[] = [];  // Tableau pour stocker les données récupérées du sessionStorage

  constructor(
    public authService: AuthService,
    private userService: UpdateUserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // Initialiser le formulaire AVANT de charger les données
    this.profileForm = new FormGroup({
      username: new FormControl({ value: '', disabled: true }),
      first_name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });


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
    this.loadServiceData();
    this.loadProfileData();
  }

  // Récupérer les données du profil utilisateur et les données de formulaire
  private loadProfileData(): void {
    try {
      // Charger les données utilisateur depuis le sessionStorage
      const storedUserProfile = sessionStorage.getItem('userProfile');

      if (storedUserProfile) {

        this.userProfile = JSON.parse(storedUserProfile) as CustomerInfo;

        console.log('Données récupérées du sessionStorage:', this.userProfile);

        // Injecter les données dans le formulaire, uniquement si userProfile existe
        if (this.userProfile) {
          this.profileForm.patchValue({
            first_name: this.userProfile.first_name || '', // Utiliser une valeur par défaut
            last_name: this.userProfile.last_name || '',   // Utiliser une valeur par défaut
            username: this.userProfile.username || '',
          });

          console.log('Formulaire pré-rempli avec les données utilisateur:', this.profileForm.value);

          this.cdr.detectChanges();
        }
      } else {
        console.error('Aucune donnée utilisateur trouvée dans le sessionStorage.');
      }


      // Charger d'autres données si nécessaire
      const storedData = sessionStorage.getItem('serviceProvisionData');
      if (storedData) {
        this.formDataArray = JSON.parse(storedData);
        this.calculateTotalPrice(); // Calculer le prix total des services
      } else {
        console.log('Aucune donnée de panier trouvée.');
        this.formDataArray = [];
        this.totalPrice = 0;
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    } finally {
      this.isLoading = false;
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

  // Envoyer les modifications via le service
  updateUser(): void {
    if (this.profileForm.valid) {
      const updatedData: any = {}; // Objet pour stocker les champs modifiés

      // Comparez les valeurs initiales et actuelles
      if (this.profileForm.value.first_name !== this.userProfile?.first_name) {
        updatedData.first_name = this.profileForm.value.first_name;
      }

      if (this.profileForm.value.last_name !== this.userProfile?.last_name) {
        updatedData.last_name = this.profileForm.value.last_name;
      }

      if (Object.keys(updatedData).length > 0) {
        // Si au moins un champ a changé, envoyer une requête de mise à jour
        this.userService.updateUser(this.userProfile!.id, updatedData).subscribe({
          next: (response) => {

            console.log('Mise à jour réussie :', response);

            // Mettre à jour uniquement les données utilisateur dans le sessionStorage
            const currentSessionData = JSON.parse(sessionStorage.getItem('userProfile') || '{}');
            const updatedSessionData = {
              ...currentSessionData, // Conserver les autres données existantes
              ...updatedData, // Mettre à jour uniquement les données modifiées
            };
            sessionStorage.setItem('userProfile', JSON.stringify(updatedSessionData));
            console.log('SessionStorage mis à jour :', updatedSessionData);

            // Recharger les données dans le formulaire
            this.userProfile = updatedSessionData; // Mettre à jour le profil utilisateur localement
            this.profileForm.patchValue(updatedSessionData); // Mettre à jour le formulaire


            alert('Vos informations ont été mises à jour avec succès.');
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour :', err);
            alert('Une erreur est survenue lors de la mise à jour.');
          },
        });
      } else {
        alert('Aucune modification détectée.');
      }
    } else {
      console.error('Formulaire invalide.');
      this.profileForm.markAllAsTouched();
    }
  }

  logout(): void {
    this.authService.logout(); // Appelle la méthode de déconnexion du service
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
