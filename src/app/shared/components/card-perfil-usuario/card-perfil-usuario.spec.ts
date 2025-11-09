import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPerfilUsuario } from './card-perfil-usuario';

describe('CardPerfilUsuario', () => {
  let component: CardPerfilUsuario;
  let fixture: ComponentFixture<CardPerfilUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPerfilUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPerfilUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
