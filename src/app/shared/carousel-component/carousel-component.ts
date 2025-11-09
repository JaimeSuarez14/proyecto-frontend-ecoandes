import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-carousel-component',
  imports: [CommonModule],
  templateUrl: './carousel-component.html',
  styleUrl: './carousel-component.css'
})
export class CarouselComponent {
  images = [
    'assets/img/cafe_cusco_montaña.jpg',
    'assets/img/cafetera_artesanal.jpeg',
    'assets/img/granos_cafe_tostado.avif',
    
  ];

  currentIndex = signal(0);

  constructor() {
    effect(() => {
      const timer = setTimeout(() => {
        this.next();
      }, 4000);

      return () => clearTimeout(timer); // limpieza automática
    });
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
  }

}
