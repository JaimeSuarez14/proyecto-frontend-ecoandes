export interface CarritoItem {
  idProducto: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
  imagenUrl?: string;
  subtotal: number;
}

export interface Carrito {
  items: CarritoItem[];
  total: number;
}

