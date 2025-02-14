import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryArticleService } from '../shared/services/category-article.service';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiListResponse, ServiceProvision } from '../shared/interfaces/entities';
import { ServiceProvisionResponseService } from '../shared/services/service-provision.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  data: ApiListResponse | undefined;
  serviceMembers: ServiceProvision[] = [];

  constructor(private ServiceProvisionResponseservice: ServiceProvisionResponseService) { }

  article: any;

  ngOnInit(): void {
    this.SelectedServiceProvisionResponse();
  }

  SelectedServiceProvisionResponse(){
    this.ServiceProvisionResponseservice.fetchAllServicesProvision().subscribe({
      next: (response: ApiListResponse) => {
        // Limiter le nombre de résultats à 3 articles
        this.serviceMembers = response['hydra:member'].slice(0, 3);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories :', err);
      },
    });
  };

  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
