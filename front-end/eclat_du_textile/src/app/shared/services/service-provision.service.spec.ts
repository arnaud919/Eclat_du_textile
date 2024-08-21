import { TestBed } from '@angular/core/testing';

import { ServiceProvisionResponseService } from './service-provision.service';

describe('ServiceProvisionResponseService', () => {
  let service: ServiceProvisionResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProvisionResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
