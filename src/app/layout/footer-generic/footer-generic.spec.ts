import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterGeneric } from './footer-generic';

describe('FooterGeneric', () => {
  let component: FooterGeneric;
  let fixture: ComponentFixture<FooterGeneric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterGeneric]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterGeneric);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
