import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataServiceService } from '../shared/services/form-data-service.service'; // Import du service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CartShopComponent implements OnInit {
  currentStep: number = 1;  // Étape actuelle : 1 - Panier, 2 - Coordonnées, 3 - Paiement, 4 - Validation

  coordinatesForm!: FormGroup;  // Formulaire pour les coordonnées
  paymentForm!: FormGroup;      // Formulaire pour le paiement

  panier: any[] = [];  // Articles du panier
  totalPrice: number = 0;  // Prix total du panier

  storedCoordinates: any = null;  // Coordonnées stockées
  storedPayment: any = null;      // Informations de paiement stockées

  constructor(private router: Router, private formDataService: FormDataServiceService) {}

  ngOnInit(): void {
    this.initializeForms();  // Initialiser les formulaires
    this.loadCartData();     // Charger les données du panier
    this.loadStoredData();   // Charger les données des coordonnées et du paiement
    this.calculateTotalPrice();  // Calculer le prix total du panier
  }

  // Initialiser les formulaires de coordonnées et de paiement
  initializeForms(): void {

    const today = new Date().toISOString().split('T')[0]; 
    
    this.coordinatesForm = new FormGroup({
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      depositDate: new FormControl(today, Validators.required)
    });

    this.paymentForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),  // Faux numéro de carte
      expirationDate: new FormControl('', Validators.required),
      cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')])  // CVV factice
    });
  }

  // Charger les données du panier depuis le sessionStorage
  loadCartData(): void {
    const storedData = sessionStorage.getItem('serviceProvisionData');
    
    if (storedData) {
      this.panier = JSON.parse(storedData);
      
      if (Array.isArray(this.panier)) {
        this.panier.forEach(item => {
          item.servicePrice = item.servicePrice ?? 0;
          item.totalPrice = item.totalPrice ?? 0;
        });

        console.log('Données du panier récupérées :', this.panier);
        this.calculateTotalPrice();
      } else {
        console.error('Les données récupérées ne sont pas un tableau.');
        this.panier = [];
      }
    } else {
      console.error('Aucune donnée du panier trouvée dans le sessionStorage.');
      this.panier = [];
    }
  }

  // Charger les données stockées (coordonnées et paiement) depuis formDataService
  loadStoredData(): void {
    const storedData = this.formDataService.getFormData();
    
    if (storedData) {
      this.storedCoordinates = storedData.coordinates || null;
      this.storedPayment = storedData.payment || null;

      console.log('Coordonnées chargées :', this.storedCoordinates);
      console.log('Paiement chargé :', this.storedPayment);

      // Pré-remplir les formulaires si les données existent
      if (this.storedCoordinates) {
        this.coordinatesForm.patchValue(this.storedCoordinates);
      }
      if (this.storedPayment) {
        this.paymentForm.patchValue(this.storedPayment);
      }
    } else {
      console.log('Aucune donnée de coordonnées ou de paiement trouvée.');
    }
  }

  // Calculer le prix total du panier
  calculateTotalPrice(): void {
    this.totalPrice = this.panier.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    console.log('Prix total calculé :', this.totalPrice);
  }

  // Passer à l'étape suivante
  nextStep(): void {
    this.currentStep += 1;
  }

  // Revenir à l'étape précédente
  previousStep(): void {
    this.currentStep -= 1;
  }

  // Sauvegarder les coordonnées et passer à l'étape suivante
  saveCoordinates(): void {
    if (this.coordinatesForm.valid) {
      this.storedCoordinates = this.coordinatesForm.value;
      console.log('Coordonnées sauvegardées :', this.storedCoordinates);

      const storedData = { items: this.panier, coordinates: this.storedCoordinates, payment: this.storedPayment };
      this.formDataService.setFormData(storedData);  // Sauvegarder le panier, les coordonnées et le paiement
      
      this.nextStep();
    } else {
      console.error('Formulaire de coordonnées invalide');
      this.coordinatesForm.markAllAsTouched();  // Afficher les erreurs de validation
    }
  }

  // Sauvegarder les informations de paiement et passer à l'étape suivante
  savePayment(): void {
    if (this.paymentForm.valid) {
      this.storedPayment = this.paymentForm.value;
      console.log('Informations de paiement sauvegardées :', this.storedPayment);

      const storedData = { items: this.panier, coordinates: this.storedCoordinates, payment: this.storedPayment };
      this.formDataService.setFormData(storedData);  // Sauvegarder le panier, les coordonnées et le paiement
      
      this.nextStep();
    } else {
      console.error('Formulaire de paiement invalide');
      this.paymentForm.markAllAsTouched();  // Afficher les erreurs de validation
    }
  }

  // Confirmation de la commande
  confirmOrder(): void {
    const orderHistory = JSON.parse(sessionStorage.getItem('orderHistory') || '[]');
    orderHistory.push({ items: this.panier, totalPrice: this.totalPrice, date: new Date() });
    sessionStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    this.formDataService.clearFormData();  // Vider les données après la confirmation de la commande
    sessionStorage.removeItem('serviceProvisionData');  // Supprimer les données du panier

    this.panier = [];  // Vider le panier
    this.totalPrice = 0;  // Réinitialiser le prix total

    this.router.navigate(['/profil']).then(() => {
      window.location.reload();  // Rafraîchir la page pour mettre à jour les informations
    });
  }

  // Retour au profil
  goToProfile(): void {
    this.router.navigate(['/profil']);
  }
}
