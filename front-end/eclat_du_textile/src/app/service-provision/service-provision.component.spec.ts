import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvisionComponent } from './service-provision.component';

describe('ServiceProvisionComponent', () => {
  let component: ServiceProvisionComponent;
  let fixture: ComponentFixture<ServiceProvisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProvisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
