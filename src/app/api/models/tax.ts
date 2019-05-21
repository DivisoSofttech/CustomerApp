/* tslint:disable */
import { TaxCategory } from './tax-category';
import { TaxType } from './tax-type';
export interface Tax {
  description?: string;
  id?: number;
  name: string;
  rate: number;
  taxCategory?: TaxCategory;
  taxTypes?: Array<TaxType>;
}
