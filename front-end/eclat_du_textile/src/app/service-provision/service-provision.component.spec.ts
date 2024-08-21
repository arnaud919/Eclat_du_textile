import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvisionResponseComponent } from './service-provision.component';

describe('ServiceProvisionResponseComponent', () => {
  let component: ServiceProvisionResponseComponent;
  let fixture: ComponentFixture<ServiceProvisionResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProvisionResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProvisionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
