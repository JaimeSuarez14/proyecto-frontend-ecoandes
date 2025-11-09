import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmacion } from './alert-confirmacion';

describe('AlertConfirmacion', () => {
  let component: AlertConfirmacion;
  let fixture: ComponentFixture<AlertConfirmacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertConfirmacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertConfirmacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
