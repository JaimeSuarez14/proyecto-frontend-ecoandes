import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosTablas } from './filtros-tablas';

describe('FiltrosTablas', () => {
  let component: FiltrosTablas;
  let fixture: ComponentFixture<FiltrosTablas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosTablas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosTablas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
