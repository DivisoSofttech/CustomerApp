/* tslint:disable */
import { Customer } from './customer';
import { Product } from './product';
export interface Note {
  createdDate?: string;
  customer?: Customer;
  dateOfCreation?: string;
  id?: number;
  matter?: string;
  product?: Product;
}
