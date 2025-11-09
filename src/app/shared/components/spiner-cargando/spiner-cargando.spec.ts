import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerCargando } from './spiner-cargando';

describe('SpinerCargando', () => {
  let component: SpinerCargando;
  let fixture: ComponentFixture<SpinerCargando>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinerCargando]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinerCargando);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
