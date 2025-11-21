export interface Producto {
  id?: number,
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number,
  categoria: string,
  descuento: number,
  estado: string,
  imagen: Imagen
}

interface Imagen{
  id: number,
  nombre: string,
  imagenUrl: string,
  imagenId: string
}

export interface ProductoDto {
  id?: number,
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number,
  categoria: string,
  descuento: number,
  urlImagen: string,
  imagen: Imagen
}
