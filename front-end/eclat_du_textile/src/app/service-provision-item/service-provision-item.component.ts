import { Component } from '@angular/core';
import { ServiceProvisionResponseService } from '../shared/services/service-provision.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiListResponse, ServiceProvision, CategoryArticle, TypeMaterial, Color } from '../shared/interfaces/entities';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoryArticleService } from '../shared/services/category-article.service';
import { TypeMaterialService } from '../shared/services/type-material.service';
import { ColorService } from '../shared/services/color.service';

@Component({
  selector: 'app-service-provision-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-provision-item.component.html',
  styleUrl: './service-provision-item.component.css'
})
export class ServiceProvisionResponseItemComponent {

  ServiceProvisionResponseItemData: ServiceProvision | undefined
  ApiData: ApiListResponse | undefined
  CategoryArticleMembers: CategoryArticle[] = []
  TypeMaterialMembers: TypeMaterial[] = []
  ColorMembers: Color[] = []
  

  ServiceProvisionResponseData!: Subscription

  constructor(private ServiceProvisionResponseService:ServiceProvisionResponseService, private CategoryArticleResponseService:CategoryArticleService, private TypeMaterialResponseService:TypeMaterialService, private ColorResponseService:ColorService ,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedServiceProvisionResponse();
    this.allCategoryArticle();
    this.allTypeMaterial();
    this.allColor();
  }

  selectedServiceProvisionResponse(){
    this.route.params.subscribe(params => {
      this.ServiceProvisionResponseService.fetchOneServiceProvisionResponse(params['id']).subscribe( data => {
        this.ServiceProvisionResponseItemData = data;
      })
    })
  }

  allCategoryArticle(){
    this.CategoryArticleResponseService.fetchAllCategoryArticle().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.CategoryArticleMembers = response["hydra:member"];
    })
  }

  allTypeMaterial(){
    this.TypeMaterialResponseService.fetchAllTypeMaterials().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.TypeMaterialMembers = response["hydra:member"];
    } )
  }

  allColor(){
    this.ColorResponseService.fetchAllColor().subscribe((response: ApiListResponse) => {
      this.ApiData = response;
      this.ColorMembers = response["hydra:member"];
    } )
  }

  ngOnDestroy(): void {
    this.ServiceProvisionResponseData;
  }
}
