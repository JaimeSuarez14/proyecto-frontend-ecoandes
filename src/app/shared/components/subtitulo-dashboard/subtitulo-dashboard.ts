import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subtitulo-dashboard',
  imports: [],
  templateUrl: './subtitulo-dashboard.html',
  styleUrl: './subtitulo-dashboard.css'
})
export class SubtituloDashboard {
  titulo = input<string>()
  icon = input<string>()
}
