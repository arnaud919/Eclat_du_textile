import { Component, OnInit, OnDestroy, input, Input } from '@angular/core';
import { ServiceProvisionResponseService } from '../shared/services/service-provision.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiListResponse, ServiceProvision, CategoryArticle, TypeMaterial, Color, SubCategoryArticle } from '../shared/interfaces/entities';
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

  // ID extrait et validé
  pageId!: number;

  // Interfaces
  serviceProvisionResponseItemData: ServiceProvision | null = null; // Donnée du service choisi
  apiData: ApiListResponse | undefined;
  categoryArticleMembers: CategoryArticle[] = [];
  typeMaterialMembers: TypeMaterial[] = [];
  colorMembers: Color[] = [];

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

  //Filtrer les catégories
  categoryIds: number[] = [10, 11, 12, 13, 14, 15, 16, 18]; // IDs à inclure dans les résultats
  specificServiceIds: number[] = [3];

  constructor(
    private serviceProvisionResponseService: ServiceProvisionResponseService,
    private categoryArticleResponseService: CategoryArticleService,
    private typeMaterialResponseService: TypeMaterialService,
    private colorResponseService: ColorService,
    private route: ActivatedRoute,
    private formDataService: FormDataServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializePageId();
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
    this.loadCategoryArticles();
  }

  private initializePageId(): void {
    const id = +this.route.snapshot.params['id']; // Extraction de l'ID via snapshot
    if (isNaN(id)) {
      console.error('ID invalide dans l\'URL. Redirection en cours...');
      this.router.navigate(['/']); // Redirection si l'ID est invalide
      return;
    }

    this.pageId = id; // Stocker l'ID validé
    console.log('ID validé extrait :', this.pageId);

  }

  addItem(): void {
    if (this.itemForm.valid && this.selectedArticle && this.serviceProvisionResponseItemData) {
      const formData = this.itemForm.value;

      const basePrice = this.serviceProvisionResponseItemData.price_service;
      const multiplier = this.selectedArticle.multiplier_price || 1;
      const totalPrice = basePrice * multiplier;

      const newItem = {
        serviceName: this.serviceProvisionResponseItemData.name_service,
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

  selectedServiceProvisionResponse(): void {
    // Extraire et valider l'ID depuis l'URL
    const serviceId = this.pageId;

    if (serviceId === null) {
      // ID invalide, rediriger immédiatement
      console.error('ID invalide dans l\'URL. Redirection en cours...');
      this.router.navigate(['/']);
      return;
    }

    // Charger les données du service
    const subscription = this.serviceProvisionResponseService.fetchOneServiceProvisionResponse(serviceId).subscribe({
      next: (data) => {
        if (data) {
          // L'ID est valide, charger les données
          this.serviceProvisionResponseItemData = data;
          console.log('Données du service chargées :', data);
        } else {
          // L'ID est valide mais aucune donnée n'est retournée
          console.warn('Aucune donnée trouvée pour cet ID. Redirection en cours...');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        // Erreur lors de l'appel API, rediriger
        console.error('Erreur lors de la récupération des données :', err);
        this.router.navigate(['/']);
      },
    });

    this.subscriptions.push(subscription);
  }

  // Charger les catégories et appliquer un filtre temporaire pour l'affichage
  private loadCategoryArticles(): void {
    this.categoryArticleResponseService.fetchAllCategoryArticle().subscribe({
      next: (response: ApiListResponse) => {
        // Stocker les données sans filtrer
        this.categoryArticleMembers = response['hydra:member']; // Récupérer tous les articles
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories :', err);
      },
    });
  }

  getFilteredArticles(): CategoryArticle[] {
    // Vérifier si l'ID de la page correspond à un service spécifique
    if (this.specificServiceIds.includes(this.pageId)) {
      // Appliquer le filtre sur categoryArticleMembers
      return this.categoryArticleMembers.filter((article) => {

        // Vérifier que subcategory_article n'est pas null ou undefined
        if (!article.subcategory_article) {
          return false; // Ignorer cet article
        }

        // Normaliser subcategory_article pour gérer les cas où ce n'est pas un tableau
        const subcategories = Array.isArray(article.subcategory_article)
          ? article.subcategory_article
          : article.subcategory_article
            ? [article.subcategory_article]
            : [];

        // Vérifier si au moins une sous-catégorie correspond à un ID valide
        return subcategories.some((subcategory) =>
          this.categoryIds.includes(subcategory.id)
        );
      });
    }

    // Si pageId ne correspond pas à un service spécifique, afficher toutes les catégories
    return this.categoryArticleMembers.filter((article) => article.subcategory_article);
  }

  allCategoryArticle() {
    const subscription = this.categoryArticleResponseService.fetchAllCategoryArticle().subscribe((response: ApiListResponse) => {
      this.apiData = response;
      this.categoryArticleMembers = response['hydra:member'];
    });
    this.subscriptions.push(subscription);
  }

  allTypeMaterial() {
    const subscription = this.typeMaterialResponseService.fetchAllTypeMaterials().subscribe((response: ApiListResponse) => {
      this.apiData = response;
      this.typeMaterialMembers = response['hydra:member'];
    });
    this.subscriptions.push(subscription);
  }

  allColor() {
    const subscription = this.colorResponseService.fetchAllColor().subscribe((response: ApiListResponse) => {
      this.apiData = response;
      this.colorMembers = response['hydra:member'];
    });
    this.subscriptions.push(subscription);
  }

  // Gestion de la sélection d'un vêtement
  onArticleSelect(event: Event) {
    const selectedArticleId = +(event.target as HTMLSelectElement).value;
    this.selectedArticle = this.categoryArticleMembers.find((article) => article.id === selectedArticleId) || null;
    this.calculatePrice(); // Met à jour le prix total
  }

  // Calcul du prix total basé sur le multiplicateur du vêtement
  private calculatePrice(): void {
    if (this.selectedArticle && this.serviceProvisionResponseItemData) {
      this.totalPrice = this.serviceProvisionResponseItemData.price_service * this.selectedArticle.multiplier_price;
    }
  }

  private saveToSessionStorage(): void {
    const formData = this.itemForm.value;  // Récupérer les données du formulaire

    // Récupérer l'article sélectionné (vêtement) en fonction de l'ID
    const selectedClothId = formData.cloth;
    const selectedCloth = this.categoryArticleMembers.find(article => article.id === selectedClothId);

    if (selectedCloth && this.serviceProvisionResponseItemData) {
      // Récupérer les données existantes dans le sessionStorage
      let existingData = JSON.parse(sessionStorage.getItem('serviceProvisionData') || '[]');

      if (!Array.isArray(existingData)) {
        existingData = [];  // Initialiser un tableau vide si nécessaire
      }

      // Créer une nouvelle entrée avec les données du formulaire, le nom du service et le prix total
      const newEntry = {
        serviceName: this.serviceProvisionResponseItemData.name_service,  // Nom du service
        clothId: selectedCloth.id,  // ID du vêtement
        clothName: selectedCloth.name_category_article,  // Nom du vêtement
        totalPrice: this.serviceProvisionResponseItemData.price_service * selectedCloth.multiplier_price,  // Prix total calculé
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
