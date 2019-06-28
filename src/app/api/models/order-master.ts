/* tslint:disable */
import { OrderAddress } from './order-address';
import { Order } from './order';
import { OrderLine } from './order-line';
export interface OrderMaster {
  address?: OrderAddress;
  order?: Order;
  orderLines?: Array<OrderLine>;
}
