import { Component, OnInit } from '@angular/core';
import { ServiceProvision } from '../shared/interfaces/entities';

@Component({
  selector: 'app-service-provision',
  standalone: true,
  imports: [],
  templateUrl: './service-provision.component.html',
  styleUrl: './service-provision.component.css'
})
export class ServiceProvisionComponent /* implements OnInit */ {
/*   constructor(private entityservice: EntityService<CategoryArticleService>){}

  service_provision : ServiceProvision[] = [];

  ngOnInit(): void {
    this.entityservice.fetchAll().subcribe((data) => {
      this.service_provision = data["hydra:member"];
      console.log(this.service_provision);
    })
  } */
}
