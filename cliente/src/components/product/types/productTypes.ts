export interface Product {
    _id: string,
    descripcion: string,
    idGestion: {
        rubro: string,
        subRubro: string,
        codigo: number
    },
    categoriaId: string,
    ccategoria: string,
    precio: number,
    porDescEfec: number,
    oferta: boolean,
    precioOferta: number,
    financiadoEntrega: number,
    financiadoCuotas: number,
    financiadoImpcuotas: number,
    stock:number,
    urlImagen: string,
    destacado: boolean,
    nuevo: boolean,
    masVendido: boolean,
    marca: string,
    tabsData: string[],
    caracDestacados: string[],
    porcDtoEfectivo: number, 
    viewInLine: boolean,
};

export interface ProductCardProps {
    _id: string;
    descripcion: string;
    precio: number;
    urlImagen: string;
    category: string;
    quantity: number
    itemsDestacados: string[];
    viewInLine: boolean;
  };
  
