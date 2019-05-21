/* tslint:disable */
import { Country } from './country';
import { Customer } from './customer';
export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  country?: Country;
  customer?: Customer;
  id?: number;
  postCode?: string;
}
