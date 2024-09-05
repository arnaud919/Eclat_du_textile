import { Component } from '@angular/core';
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
import { CartShopService } from '../shared/services/cart-shop.service';

@Component({
  selector: 'app-service-provision-item',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FilterArticlePipe],
  templateUrl: './service-provision-item.component.html',
  styleUrl: './service-provision-item.component.css'
})
export class ServiceProvisionResponseItemComponent {

  //Interfaces
  //Donnée du service choisi
  ServiceProvisionResponseItemData: ServiceProvision | null = null
  ApiData: ApiListResponse | undefined
  CategoryArticleMembers: CategoryArticle[] = []
  TypeMaterialMembers: TypeMaterial[] = []
  ColorMembers: Color[] = []

  //Subscriptions
  articleSubscription: Subscription | null = null;
  formControlSubscription: Subscription | null = null;

  
  //find particular article
  selectedArticle: CategoryArticle | null = null


  /**
   * Form of the service prestation
   */
  itemForm: FormGroup = new FormGroup({
    cloth: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  });

  constructor(private ServiceProvisionResponseService: ServiceProvisionResponseService,
    private CategoryArticleResponseService: CategoryArticleService,
    private TypeMaterialResponseService: TypeMaterialService,
    private ColorResponseService: ColorService,
    private route: ActivatedRoute,
    private cartShop: CartShopService) { }



  ngOnInit(): void {
    this.selectedServiceProvisionResponse();
    this.allCategoryArticle();
    this.allTypeMaterial();
    this.allColor();
  }


  addItem() {
    if(this.itemForm.valid){

    }
  }

  selectedServiceProvisionResponse() {
    this.route.params.subscribe(params => {
      this.ServiceProvisionResponseService.fetchOneServiceProvisionResponse(params['id']).subscribe(data => {
        this.ServiceProvisionResponseItemData = data;
      })
    })
  }

  allCategoryArticle() {
    this.CategoryArticleResponseService.fetchAllCategoryArticle().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.CategoryArticleMembers = response["hydra:member"];
    })
  }

  allTypeMaterial() {
    this.TypeMaterialResponseService.fetchAllTypeMaterials().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.TypeMaterialMembers = response["hydra:member"];
    })
  }

  allColor() {
    this.ColorResponseService.fetchAllColor().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.ColorMembers = response["hydra:member"];
    })
  }

  onArticleSelect(event: Event) {
    const selectedArticleId = +(event.target as HTMLSelectElement).value; // Convertit la valeur en nombre
    this.selectedArticle = this.CategoryArticleMembers.find(product => product.id === selectedArticleId) || null;
  }

  ngOnDestroy(): void {

  }
}
