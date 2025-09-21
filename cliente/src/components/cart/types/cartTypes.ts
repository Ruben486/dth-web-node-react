import {Product} from '../../product/types/productTypes';

export type ProductCartProps = Product & {
  quantity?: number;
  viewInLine?: boolean;
};