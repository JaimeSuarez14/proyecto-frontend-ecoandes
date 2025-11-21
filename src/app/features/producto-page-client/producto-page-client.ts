import { Component, inject, OnInit, signal } from '@angular/core';
import { Producto } from '@models/entidad/producto.model';
import { ProductoService } from '@shared/services/producto-service';
import { tap } from 'rxjs';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-producto-page-client',
  imports: [RouterLink],
  templateUrl: './producto-page-client.html',
  styleUrl: './producto-page-client.css',
})
export class ProductoPageClient implements OnInit {
  productoService = inject(ProductoService);
  productos = signal<Producto[]>([])
  isOpenCart = signal(false)
  carrito = signal<Producto[]>([])

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

  toggleVentanaCart(){
    this.isOpenCart.update( o => !o)
  }

  agregarProducCarrito(produc :Producto){
    this.carrito.update( p => ([...p, produc ]))
    console.log(this.carrito());

  }
}
