/* tslint:disable */
import { Product } from './product';
import { Tax } from './tax';
export interface TaxCategory {
  description?: string;
  id?: number;
  name: string;
  products?: Array<Product>;
  taxes?: Array<Tax>;
}
