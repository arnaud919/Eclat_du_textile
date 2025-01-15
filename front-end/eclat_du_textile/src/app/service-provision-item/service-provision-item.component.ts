import { Component, OnInit, OnDestroy, input, Input } from '@angular/core';
import { ServiceProvisionResponseService } from '../shared/services/service-provision.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiListResponse, ServiceProvision, CategoryArticle, TypeMaterial, Color } from '../shared/interfaces/entities';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoryArticleService } from '../shared/services/category-article.service';
import { TypeMaterialService } from '../shared/services/type-material.service';
import { ColorService } from '../shared/services/color.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterArticlePipe } from '../shared/pipes/filter-article.pipe';
import { FormDataServiceService } from '../shared/services/form-data-service.service';

@Component({
  selector: 'app-service-provision-item',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FilterArticlePipe],
  templateUrl: './service-provision-item.component.html',
  styleUrls: ['./service-provision-item.component.css'],
})

export class ServiceProvisionResponseItemComponent implements OnInit, OnDestroy {

  // Interfaces
  ServiceProvisionResponseItemData: ServiceProvision | null = null; // Donnée du service choisi
  ApiData: ApiListResponse | undefined;
  CategoryArticleMembers: CategoryArticle[] = [];
  TypeMaterialMembers: TypeMaterial[] = [];
  ColorMembers: Color[] = [];

  // Subscriptions
  subscriptions: Subscription[] = [];
  selectedArticle: CategoryArticle | null = null; // Article sélectionné
  totalPrice!: number; // Prix total calculé

  // Formulaire
  itemForm: FormGroup = new FormGroup({
    cloth: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)])  // Ajout du champ quantité avec une validation minimale de 1
  });

  //input élément parent
  @Input() placeholder: string = 'Sélectionnez une catégorie'; // Placeholder
  @Input() HemsAlterationArticles: number[] = [];
  categories: any[] = []; // Stocke les catégories filtrées

  constructor(
    private ServiceProvisionResponseService: ServiceProvisionResponseService,
    private CategoryArticleResponseService: CategoryArticleService,
    private TypeMaterialResponseService: TypeMaterialService,
    private ColorResponseService: ColorService,
    private route: ActivatedRoute,
    private formDataService: FormDataServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedServiceProvisionResponse(); // Récupérer les données du service
    this.loadCategoryData(); // Charger toutes les catégories, types et couleurs
    this.loadFormData();

    // Sauvegarder dans le sessionStorage chaque fois que le formulaire change
    this.itemForm.valueChanges.subscribe(() => {
      this.saveToSessionStorage();
    });
  }

  loadCategoryData(): void {
    this.allCategoryArticle();
    this.allTypeMaterial();
    this.allColor();
  }

  addItem(): void {
    if (this.itemForm.valid && this.selectedArticle && this.ServiceProvisionResponseItemData) {
      const formData = this.itemForm.value;

      const basePrice = this.ServiceProvisionResponseItemData.price_service;
      const multiplier = this.selectedArticle.multiplier_price || 1;
      const totalPrice = basePrice * multiplier;

      const newItem = {
        serviceName: this.ServiceProvisionResponseItemData.name_service,
        clothName: this.selectedArticle.name_category_article,
        multiplier: multiplier,
        basePrice: basePrice,
        material: formData.material,
        color: formData.color,
        quantity: formData.quantity || 1,
        totalPrice: totalPrice,
      };

      // Charger les données existantes
      let existingData = this.formDataService.getFormData() || [];

      // S'assurer que les données existantes sont bien un tableau
      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      existingData.push(newItem);

      // Sauvegarder les articles mis à jour dans le sessionStorage via le service
      this.formDataService.setFormData(existingData);

      this.router.navigate(['/nos_prestations']);
    }
  }

  // Charger les valeurs depuis le sessionStorage
  private loadFormData(): void {
    const savedData = this.formDataService.getFormData();
    if (savedData) {
      this.itemForm.patchValue(savedData); // Injecter les valeurs récupérées dans le FormGroup
    }
  }

  // Charger le service à partir de l'ID dans l'URL
  selectedServiceProvisionResponse(): void {
    const subscription = this.route.params.subscribe((params) => {
      const serviceId = params['id'];
  
      this.ServiceProvisionResponseService.fetchOneServiceProvisionResponse(serviceId).subscribe({
        next: (data) => {
          if (data) {
            // L'ID est valide, charger les données
            this.ServiceProvisionResponseItemData = data;
          } else {
            // L'ID est invalide, rediriger vers la page d'accueil
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données :', err);
          // Rediriger également en cas d'erreur (par exemple, ID non trouvé)
          this.router.navigate(['/']);
        },
      });
    });
  
    this.subscriptions.push(subscription);
  }
  

  allCategoryArticle() {
    const subscription = this.CategoryArticleResponseService.fetchAllCategoryArticle().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.CategoryArticleMembers = response['hydra:member'];
    });
    this.subscriptions.push(subscription);
  }

  allTypeMaterial() {
    const subscription = this.TypeMaterialResponseService.fetchAllTypeMaterials().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.TypeMaterialMembers = response['hydra:member'];
    });
    this.subscriptions.push(subscription);
  }

  allColor() {
    const subscription = this.ColorResponseService.fetchAllColor().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.ColorMembers = response['hydra:member'];
    });
    this.subscriptions.push(subscription);
  }

  // Gestion de la sélection d'un vêtement
  onArticleSelect(event: Event) {
    const selectedArticleId = +(event.target as HTMLSelectElement).value;
    this.selectedArticle = this.CategoryArticleMembers.find((article) => article.id === selectedArticleId) || null;
    this.calculatePrice(); // Met à jour le prix total
  }

  // Calcul du prix total basé sur le multiplicateur du vêtement
  private calculatePrice(): void {
    if (this.selectedArticle && this.ServiceProvisionResponseItemData) {
      this.totalPrice = this.ServiceProvisionResponseItemData.price_service * this.selectedArticle.multiplier_price;
    }
  }

  private saveToSessionStorage(): void {
    const formData = this.itemForm.value;  // Récupérer les données du formulaire

    // Récupérer l'article sélectionné (vêtement) en fonction de l'ID
    const selectedClothId = formData.cloth;
    const selectedCloth = this.CategoryArticleMembers.find(article => article.id === selectedClothId);

    if (selectedCloth && this.ServiceProvisionResponseItemData) {
      // Récupérer les données existantes dans le sessionStorage
      let existingData = JSON.parse(sessionStorage.getItem('serviceProvisionData') || '[]');

      if (!Array.isArray(existingData)) {
        existingData = [];  // Initialiser un tableau vide si nécessaire
      }

      // Créer une nouvelle entrée avec les données du formulaire, le nom du service et le prix total
      const newEntry = {
        serviceName: this.ServiceProvisionResponseItemData.name_service,  // Nom du service
        clothId: selectedCloth.id,  // ID du vêtement
        clothName: selectedCloth.name_category_article,  // Nom du vêtement
        totalPrice: this.ServiceProvisionResponseItemData.price_service * selectedCloth.multiplier_price,  // Prix total calculé
        ...formData  // Ajouter les autres données du formulaire (matériau, couleur, etc.)
      };

      // Ajouter la nouvelle entrée au tableau existant
      existingData.push(newEntry);

      // Sauvegarder les données mises à jour dans le sessionStorage
      sessionStorage.setItem('serviceProvisionData', JSON.stringify(existingData));

    }
  }

  ngOnDestroy(): void {
    // Nettoyage des abonnements
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
