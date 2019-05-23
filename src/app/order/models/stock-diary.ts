/* tslint:disable */
import { Product } from './product';
export interface StockDiary {
  dateOfCreation?: string;
  id?: number;
  isBuy?: boolean;
  price?: number;
  product?: Product;
  units?: number;
}
