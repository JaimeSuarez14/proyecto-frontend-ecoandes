import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGenerico } from './formulario-generico';

describe('FormularioGenerico', () => {
  let component: FormularioGenerico;
  let fixture: ComponentFixture<FormularioGenerico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioGenerico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioGenerico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
