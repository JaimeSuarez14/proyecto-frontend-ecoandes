import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spiner-cargando',
  imports: [],
  template: `
    <div class="button-container">
        <div class="loader"></div>
        <span [class]="isColor() ? 'inColor' : ''">{{mensaje() ? mensaje()+'...' : ''}}</span>
      </div>
  `,
  styles: `
  .button-container {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  border-radius: 5px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  justify-content: center;
}

.loader {
  border: 4px solid rgba(237, 6, 6, 0.3);
  border-top: 4px solid brown;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.inColor{
  color: brown;
}
  `
})
export class SpinerCargando {
  mensaje = input<string>("");
  isColor = input<boolean>(false)
}
