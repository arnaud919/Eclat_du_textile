import { Component, inject, OnInit } from '@angular/core';
import { ApiListResponse, ServiceProvision } from '../shared/interfaces/entities';
import { ServiceProvisionResponseService } from '../shared/services/service-provision.service';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-provision',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './service-provision.component.html',
  styleUrl: './service-provision.component.css'
})
export class ServiceProvisionResponseComponent implements OnInit {

  ServiceProvisionResponseItemData: ServiceProvision | undefined;
  data: ApiListResponse | undefined;
  members: ServiceProvision[] = [];

  constructor(private ServiceProvisionResponseservice:ServiceProvisionResponseService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.allServiceProvisionResponse();
  }

  allServiceProvisionResponse(){
    this.ServiceProvisionResponseservice.fetchAllServicesProvision().subscribe((response: ApiListResponse) => {
      this.data = response
      this.members = response["hydra:member"]
    })
  };

  selectedServiceProvisionResponse(){
    this.route.params.subscribe(params => {
      this.ServiceProvisionResponseservice.fetchOneServiceProvisionResponse(params['name_service']).subscribe( data => {
        this.ServiceProvisionResponseItemData = data;
      })
    })
  }

  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
