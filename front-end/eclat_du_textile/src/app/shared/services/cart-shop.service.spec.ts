import { TestBed } from '@angular/core/testing';

import { CartShopService } from './cart-shop.service';

describe('CartShopService', () => {
  let service: CartShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
