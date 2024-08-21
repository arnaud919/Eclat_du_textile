import { TestBed } from '@angular/core/testing';

import { TypeMaterialService } from './type-material.service';

describe('TypeMaterialService', () => {
  let service: TypeMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
