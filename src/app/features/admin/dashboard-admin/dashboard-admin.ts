import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {
  // Datos de los cuadros de estadísticas
  stats = [
    { title: 'Document', value: '146.000', icon: 'file-text', change: 17, type: 'positive' },
    { title: 'Contact', value: '1400', icon: 'contact', change: 17, type: 'positive' },
    { title: 'Email', value: '150.700', icon: 'mail', change: 17, type: 'positive' },
  ];



  // Gráfico de Recent Marketing


  // Datos para la tabla de documentos
  documents = [
    { name: 'Annual Report', file: 'PDF', category: 'Property', author: 'Diana Matthews', status: 'Send' },
    { name: 'Business Plan', file: 'WORD', category: 'Cryptocurrency', author: 'Philip James', status: 'Send' },
    { name: 'Marketing Tool', file: 'PDF', category: 'Content Creator', author: 'Amanda Ross', status: 'Pending' },
  ];

  // Datos para la sección de productos populares
  popularProducts = [
    { name: 'Gadget Converter', price: 250 },
    { name: 'Lens Camera', price: 50 },
    { name: 'Airpods', price: 100 },
    { name: 'Macbook', price: 999 },
  ];

  // Datos para la sección de chat
  chatMessages = [
    { name: 'Debra Young', message: 'How\'s my product?' },
    { name: 'Dorothy Collins', message: 'How was the meeting' },
    { name: 'Chris Jordan', message: 'How employee performance' },
    { name: 'Denise Murphy', message: 'How was the meeting' },
  ];
}
