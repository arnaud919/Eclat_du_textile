import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvisionResponseItemComponent } from './service-provision-item.component';

describe('ServiceProvisionResponseItemComponent', () => {
  let component: ServiceProvisionResponseItemComponent;
  let fixture: ComponentFixture<ServiceProvisionResponseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProvisionResponseItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProvisionResponseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
