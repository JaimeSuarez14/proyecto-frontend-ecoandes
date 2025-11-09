import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasAdmin } from './consultas-admin';

describe('ConsultasAdmin', () => {
  let component: ConsultasAdmin;
  let fixture: ComponentFixture<ConsultasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
