import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceProvisionResponseService } from '../shared/services/service-provision.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  });

  constructor(
    private ServiceProvisionResponseService: ServiceProvisionResponseService,
    private CategoryArticleResponseService: CategoryArticleService,
    private TypeMaterialResponseService: TypeMaterialService,
    private ColorResponseService: ColorService,
    private route: ActivatedRoute,
    private formDataService: FormDataServiceService
  ) {}

  ngOnInit(): void {
    this.selectedServiceProvisionResponse(); // Récupérer les données du service
    this.loadCategoryData(); // Charger toutes les catégories, types et couleurs
    this.loadFormData();

    // Sauvegarder dans le localStorage chaque fois que le formulaire change
    this.itemForm.valueChanges.subscribe(() => {
      this.saveToLocalStorage();
    });
  }

  loadCategoryData(): void {
    this.allCategoryArticle();
    this.allTypeMaterial();
    this.allColor();
  }

  addItem() {
    if (this.itemForm.valid && this.selectedArticle) {
      // Débogage : Afficher toutes les données à sauvegarder avant l'appel de saveFormData
      console.log('Formulaire soumis avec succès');
      console.log('Vêtement sélectionné :', this.selectedArticle.name_category_article);
  
      // Sauvegarder les données dans le localStorage
      this.saveFormData(); 
  
      // Afficher un message de confirmation
      console.log('Données sauvegardées avec succès.');
    } else {
      console.error('Le formulaire est invalide ou aucun vêtement n\'est sélectionné.');
    }
  }
  

  private saveFormData(): void {
    const formData = this.itemForm.value;  // Récupérer les données du formulaire
  
    // Vérifier que selectedArticle est bien défini
    if (this.selectedArticle && this.ServiceProvisionResponseItemData) {
      // Récupérer les données existantes dans le localStorage ou initialiser un tableau vide
      let existingData = JSON.parse(localStorage.getItem('serviceProvisionData') || '[]');
  
      if (!Array.isArray(existingData)) {
        existingData = [];  // Initialiser un tableau vide si ce n'est pas un tableau
      }
  
      // Créer un nouvel objet avec les informations du formulaire, du service et du prix total
      const newEntry = {
        serviceName: this.ServiceProvisionResponseItemData.name_service,  // Nom du service
        clothId: this.selectedArticle.id,  // ID du vêtement
        clothName: this.selectedArticle.name_category_article,  // Nom du vêtement
        totalPrice: this.ServiceProvisionResponseItemData.price_service * this.selectedArticle.multiplier_price,  // Prix total
        ...formData  // Ajouter les autres données du formulaire (matériau, couleur, etc.)
      };
  
      // Ajouter la nouvelle entrée au tableau
      existingData.push(newEntry);
  
      // Sauvegarder les données mises à jour dans le localStorage
      localStorage.setItem('serviceProvisionData', JSON.stringify(existingData));
  
      // Débogage : Vérifier que toutes les données sont bien sauvegardées
      console.log('Données sauvegardées dans le localStorage :', existingData);
    } else {
      console.error('Erreur : Vêtement ou service manquant.');
    }
  }
  

  // Charger les valeurs depuis le localStorage
  private loadFormData(): void {
    const savedData = this.formDataService.getFormData();
    if (savedData) {
      this.itemForm.patchValue(savedData); // Injecter les valeurs récupérées dans le FormGroup
      console.log('Données récupérées du localStorage et injectées dans le formulaire:', savedData);
    }
  }

  // Charger le service à partir de l'ID dans l'URL
  selectedServiceProvisionResponse() {
    const subscription = this.route.params.subscribe((params) => {
      this.ServiceProvisionResponseService.fetchOneServiceProvisionResponse(params['id']).subscribe((data) => {
        this.ServiceProvisionResponseItemData = data;
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

  private saveToLocalStorage(): void {
    const formData = this.itemForm.value;  // Récupérer les données du formulaire
  
    // Récupérer l'article sélectionné (vêtement) en fonction de l'ID
    const selectedClothId = formData.cloth;
    const selectedCloth = this.CategoryArticleMembers.find(article => article.id === selectedClothId);
  
    if (selectedCloth && this.ServiceProvisionResponseItemData) {
      // Récupérer les données existantes dans le localStorage
      let existingData = JSON.parse(localStorage.getItem('serviceProvisionData') || '[]');
  
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
  
      // Sauvegarder les données mises à jour dans le localStorage
      localStorage.setItem('serviceProvisionData', JSON.stringify(existingData));
  
      console.log('Données sauvegardées dans le localStorage :', existingData);  // Débogage
    } else {
      console.error('Erreur : Vêtement sélectionné ou service manquant.');
    }
  }
  
  

  ngOnDestroy(): void {
    // Nettoyage des abonnements
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
