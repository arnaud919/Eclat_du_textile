import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConditionsOfSaleComponent } from './general-conditions-of-sale.component';

describe('GeneralConditionsOfSaleComponent', () => {
  let component: GeneralConditionsOfSaleComponent;
  let fixture: ComponentFixture<GeneralConditionsOfSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralConditionsOfSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralConditionsOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
