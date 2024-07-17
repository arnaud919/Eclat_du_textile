import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryArticleService } from '../shared/services/category-article.service';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiListResponse, ServiceProvision } from '../shared/interfaces/entities';
import { ServiceProvisionService } from '../shared/services/service-provision.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  data: ApiListResponse | undefined;
  members: ServiceProvision[] = [];

  constructor(private serviceProvisionservice: ServiceProvisionService) {}
/*   categoryArticle$ = inject(CategoryArticleService).fetchAllCategoryArticle(); */

article: any;

ngOnInit(): void {
  this.serviceProvisionservice.getJsonLdData().subscribe((response: ApiListResponse) => {
    this.data = response
    this.members = response["hydra:member"]
    console.log(this.members);
  })
}

  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
