import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtituloDashboard } from './subtitulo-dashboard';

describe('SubtituloDashboard', () => {
  let component: SubtituloDashboard;
  let fixture: ComponentFixture<SubtituloDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtituloDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtituloDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
