export interface ProductCardProps {
    _id: string;
    descripcion: string;
    precio: number;
    urlImagen: string;
    category: string;
    itemsDestacados: string[];
    viewInLine: boolean;
  }