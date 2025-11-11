import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionLinkedsignal } from './paginacion-linkedsignal';

describe('PaginacionLinkedsignal', () => {
  let component: PaginacionLinkedsignal<any>;
  let fixture: ComponentFixture<PaginacionLinkedsignal<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginacionLinkedsignal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginacionLinkedsignal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
