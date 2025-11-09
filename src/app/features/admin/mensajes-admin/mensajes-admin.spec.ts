import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesAdmin } from './mensajes-admin';

describe('MensajesAdmin', () => {
  let component: MensajesAdmin;
  let fixture: ComponentFixture<MensajesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensajesAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensajesAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
