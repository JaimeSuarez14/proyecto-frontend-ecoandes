import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mensaje } from '../../../core/model/mensaje.model';

@Component({
  selector: 'app-mensajes-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './mensajes-admin.html',
  styleUrl: './mensajes-admin.css',
})
export class MensajesAdmin {
  mensaje = {
    id: 0,
    nombre: '',
    correo: '',
    edad: 0,
    telefono: '',
    tipoConsulta: '',
    asunto: '',
    mensaje: '',
  }
  mensajes = signal<Mensaje[]>([]);
  mensajeAEditar = signal<Mensaje>(this.mensaje);

  // Datos de ejemplo para simular una API
  private readonly mockMensajes: Mensaje[] = [
    {
      id: 1,
      nombre: 'Ana Torres',
      correo: 'ana.torres@gmail.com',
      edad: 32,
      telefono: '993007485',
      tipoConsulta: 'Información de productos',
      asunto: 'Pregunta sobre café de especialidad',
      mensaje:
        'Hola, me gustaría saber más sobre sus granos de café de origen único.',
    },
    {
      id: 2,
      nombre: 'Carlos Ruiz',
      correo: 'carlos.ruiz@gmail.com',
      edad: 45,
      telefono: '945012540',
      tipoConsulta: 'Sugerencia',
      asunto: 'Nueva variedad de café',
      mensaje: '¿Han considerado vender café orgánico de la región de Junín?',
    },
    {
      id: 3,
      nombre: 'Maria Lopez',
      correo: 'maria.lopez@gmail.com',
      edad: 28,
      telefono: '942561250',
      tipoConsulta: 'Queja',
      asunto: 'Problema con mi último pedido',
      mensaje: 'Mi paquete llegó abierto y la mitad del café se derramó.',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // En un caso real, aquí harías una llamada a un servicio para obtener los mensajes.
    // Por ahora, usamos los datos de ejemplo.
    this.mensajes.set(this.mockMensajes);
  }

  editarMensaje(mensaje: Mensaje): void {
    this.mensajeAEditar.set({ ...mensaje }); // Clonamos el objeto para evitar mutación directa
  }

  guardarCambios(): void {
    const mensajeActualizado = this.mensajeAEditar();
    if (mensajeActualizado) {
      this.mensajes.update((mensajes) =>
        mensajes.map((m) =>
          m.id === mensajeActualizado.id ? mensajeActualizado : m
        )
      );
      this.cancelarEdicion();
    }
  }

  eliminarMensaje(id: number): void {
    if (confirm('¿Estás seguro de eliminar este mensaje?')) {
      this.mensajes.update((mensajes) => mensajes.filter((m) => m.id !== id));
    }
  }

  cancelarEdicion(): void {
    this.mensajeAEditar.set(this.mensaje);
  }
}
