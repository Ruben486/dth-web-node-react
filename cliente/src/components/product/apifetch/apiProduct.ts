import type {Product} from '../types/productTypes';
import { SERVER_URL } from '@/config/server';

export const getProductFromDatabase = async ():Promise<Product[]> => {
  const res = await fetch(`${SERVER_URL}/product`)
  const data = await res.json()
  return data
};
