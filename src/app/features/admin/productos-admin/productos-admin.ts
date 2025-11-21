import { Producto } from '@models/entidad/producto.model';
import { Component, inject, signal } from '@angular/core';

import { SubtituloDashboard } from "@shared/components/subtitulo-dashboard/subtitulo-dashboard";
import { ProductoService } from '@shared/services/producto-service';
import { tap } from 'rxjs';
import { PaginacionLinkedsignal } from "@shared/components/paginacion-linkedsignal/paginacion-linkedsignal";
import { KeyColumns } from '@models/utils/columns.table';

@Component({
  selector: 'app-productos-admin',
  imports: [SubtituloDashboard, PaginacionLinkedsignal],
  templateUrl: './productos-admin.html',
  styleUrl: './productos-admin.css'
})
export class ProductosAdmin{
  productoService = inject(ProductoService);
  productos = signal<Producto[]>([])
  columnas:KeyColumns<Producto>[] =[
    {key:"nombre", label: "Nombre"},
    {key:"precio", label: "Precio"},
    {key:"stock",label:"stock"},
    {key:"categoria",label:"Categoría"},
    {key:"descuento",label:"Descuento"},
    {key:"estado",label:"Estado"},

  ]

  ngOnInit(): void {
    this.obtenerProductos()
  }

  obtenerProductos(){
    this.productoService.obtenerProductos().pipe(
      tap(
        p => {
          if(Array.isArray(p)){
            this.productos.set(p)
          }else{
            this.productos.set([p])
          }
        }
      )
    ).subscribe()
  }

}
