

export interface TabContent {
  nombre?: string;
  valor?: string;
}

export interface TabData {
  label?: string;
  content?: TabContent[];
}

export interface Producto {
  _id?: string; // Mongoose lo añade automáticamente
  descripcion: string;
  codigo: string;
  categoriaId: string;
  category: string; // Se asume que será el ID de la categoría
  subCategory: string;
  detalle: string;
  porcDtoEfectivo?: number;
  itemsDestacados: string[];
  tabsData: TabData[];
  precio: number;
  precioOferta?: number;
  stock: number;
  urlImagen?: string;
  destacado: boolean;
  oferta: boolean;
  nuevo: boolean;
  masVendido: boolean;
  marca?: string | null;
  createdAt?: string; // Añadido por { timestamps: true }
  updatedAt?: string; // Añadido por { timestamps: true }
}
