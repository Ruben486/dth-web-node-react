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


export interface SearchCategoryProps {
  searchCategory: string;
  setSearchCategory: (value: string) => void;
}
export interface SearchStringProps {
  searchString: string,
  setSearchString: (value: string) => void,
}
export interface SearchProps {
  searchString: string,
  setSearchString: (value: string) => void,
  searchCategory: string;
  setSearchCategory: (value: string) => void;
};
