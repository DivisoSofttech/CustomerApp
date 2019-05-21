/* tslint:disable */
import { Product } from './product';
import { Stock } from './stock';
export interface Status {
  description?: string;
  id?: number;
  name: string;
  products?: Array<Product>;
  reference?: string;
  stocks?: Array<Stock>;
}
