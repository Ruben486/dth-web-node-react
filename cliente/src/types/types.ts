export interface Product {
    _id: string,
    descripcion: string,
    precio: number,
    urlImagen: string,
    category: string,
    itemsDestacados: string[],
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
  
  export interface User {
     username: string, 
      email: string,
      password: string ,
      isAdmin: boolean, 
      authProvider: string,
      googleId: string, 
      
  }