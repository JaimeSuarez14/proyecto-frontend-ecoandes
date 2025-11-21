import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Producto } from "@models/entidad/producto.model";

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/productos';

  registrarProducto (){
    return this.http.post<Producto>(this.apiUrl, "")
  }

  obtenerProductos(){
    return this.http.get<Producto[]>(this.apiUrl+"/todos")
  }
}

