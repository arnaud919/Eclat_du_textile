import { TestBed } from '@angular/core/testing';

import { ServiceProvisionService } from './service-provision.service';

describe('ServiceProvisionService', () => {
  let service: ServiceProvisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProvisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
