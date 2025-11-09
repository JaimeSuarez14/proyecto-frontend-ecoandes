import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPageClient } from './producto-page-client';

describe('ProductoPageClient', () => {
  let component: ProductoPageClient;
  let fixture: ComponentFixture<ProductoPageClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoPageClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoPageClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
