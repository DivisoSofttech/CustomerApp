/* tslint:disable */
import { OrderAddress } from './order-address';
import { Sort } from './sort';
export interface PageOfOrderAddress {
  content?: Array<OrderAddress>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
