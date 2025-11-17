import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoNoticia } from './contenido-noticia';

describe('ContenidoNoticia', () => {
  let component: ContenidoNoticia;
  let fixture: ComponentFixture<ContenidoNoticia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoNoticia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoNoticia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
