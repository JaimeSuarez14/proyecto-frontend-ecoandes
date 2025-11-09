import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaInput } from './busqueda-input';

describe('BusquedaInput', () => {
  let component: BusquedaInput;
  let fixture: ComponentFixture<BusquedaInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
