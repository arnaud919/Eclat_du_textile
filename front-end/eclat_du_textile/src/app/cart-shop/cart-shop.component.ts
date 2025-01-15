import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormDataServiceService } from '../shared/services/form-data-service.service'; // Import du service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.component.html',
  styleUrls: ['./cart-shop.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class CartShopComponent implements OnInit {
  currentStep: number = 1;  // Étape actuelle : 1 - Panier, 2 - Coordonnées, 3 - Paiement, 4 - Validation

  coordinatesForm!: FormGroup;  // Formulaire pour les coordonnées
  paymentForm!: FormGroup;      // Formulaire pour le paiement

  panier: any[] = [];  // Articles du panier
  totalPrice: number = 0;  // Prix total du panier

  storedCoordinates: any = null;  // Coordonnées stockées
  storedPayment: any = null;      // Informations de paiement stockées

  minDate: string = "";

  constructor(private router: Router, private formDataService: FormDataServiceService) { }

  ngOnInit(): void {
    this.loadCartData();     // Charger les données du panier
    this.initializeForms();  // Initialiser les formulaires
    this.loadStoredData();   // Charger les données des coordonnées et du paiement
    this.calculateTotalPrice();  // Calculer le prix total du panier
    this.initializeCardNumberForm(); // Initialisation de l'écouteur sur le champ "cardNumber"
    this.initializeExpirationDateForm(); // Ajouter un écouteur pour formater la date d'expiration
  }

  // Initialiser les formulaires de coordonnées et de paiement
  initializeForms(): void {

    const today = new Date().toISOString().split('T')[0];

    this.coordinatesForm = new FormGroup({
      address: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required, // Champ obligatoire
        Validators.pattern('^\\+?[0-9]{7,15}$'), // Format international (exemple)
        Validators.minLength(7), // Minimum de chiffres
        Validators.maxLength(15), // Maximum de chiffres
      ],),
      depositDate: new FormControl(today, Validators.required)
    });

    this.paymentForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required, this.validateCardNumber]),  // Faux numéro de carte
      expirationDate: new FormControl('', Validators.required),
      cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')])  // CVV factice
    });
  }

  initializeCardNumberForm(): void {
    this.paymentForm.get('cardNumber')?.valueChanges.subscribe((value: string) => {
      const formattedValue = this.formatCardNumber(value || '');
      this.paymentForm.get('cardNumber')?.setValue(formattedValue, { emitEvent: false });
    });
  }

  initializeExpirationDateForm(): void {
    this.paymentForm.get('expirationDate')?.valueChanges.subscribe((value: string) => {
      const formattedValue = this.formatExpiryDate(value || '');
      this.paymentForm.get('expirationDate')?.setValue(formattedValue, { emitEvent: false });
    });
  }

  // Charger les données du panier depuis le sessionStorage
  loadCartData(): void {
    const storedData = sessionStorage.getItem('serviceProvisionData');

    if (storedData) {
      this.panier = JSON.parse(storedData);
      console.log(this.panier);

      if (Array.isArray(this.panier)) {
        this.panier.forEach(item => {
          item.servicePrice = item.servicePrice ?? 0;
          item.totalPrice = item.totalPrice ?? 0;
        });
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

      // Pré-remplir les formulaires si les données existent
      if (this.storedCoordinates) {
        this.coordinatesForm.patchValue(this.storedCoordinates);
      }
      if (this.storedPayment) {
        this.paymentForm.patchValue(this.storedPayment);
      }
    } else {
    }
  }

  // Calculer le prix total du panier
  calculateTotalPrice(): void {
    this.totalPrice = this.panier.reduce((sum, item) => sum + (item.totalPrice*item.quantity || 0), 0);
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

  formatCardNumber(value: string): string {
    // Supprimez tous les espaces existants
    const noSpaces = value.replace(/\s+/g, '');

    // Ajoutez un espace tous les 4 caractères
    return noSpaces.replace(/(.{4})/g, '$1 ').trim();
  }

  validateCardNumber(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value.replace(/\s+/g, ''); // Supprimer les espaces
    const regex = /^\d{16}$/; // 16 chiffres uniquement

    if (!regex.test(value)) {
      return { invalidFormat: true }; // Retourne une erreur si le format est incorrect
    }

    return null; // Pas d'erreur
  }

  formatExpiryDate(value: string): string {
    // Supprimer tous les caractères non numériques
    const numericValue = value.replace(/[^0-9]/g, '');

    // Ajouter un "/" après 2 caractères
    if (numericValue.length > 2) {
      return numericValue.substring(0, 2) + '/' + numericValue.substring(2, 4);
    }

    return numericValue;
  }

  // Validation pour vérifier si la date d'expiration est correcte
  validateExpiryDate(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;

    // Vérifier que le format est valide (par exemple, MM/YY)
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY
    if (!regex.test(value)) {
      return { invalidFormat: true };
    }

    // Extraire le mois et l'année
    const [month, year] = value.split('/').map((part: string) => parseInt(part, 10));
    

    // Obtenir la date actuelle
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Année sur 2 chiffres
    const currentMonth = now.getMonth() + 1; // Mois courant

    // Vérifier que la date n'est pas expirée
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expiredDate: true };
    }

    return null; // Pas d'erreur
  }

  // Sauvegarder les informations de paiement et passer à l'étape suivante
  savePayment(): void {
    if (this.paymentForm.valid) {
      this.storedPayment = this.paymentForm.value;

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
