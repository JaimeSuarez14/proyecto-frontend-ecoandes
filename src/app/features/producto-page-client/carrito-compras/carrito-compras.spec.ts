import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoCompras } from './carrito-compras';

describe('CarritoCompras', () => {
  let component: CarritoCompras;
  let fixture: ComponentFixture<CarritoCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
