/* tslint:disable */
import { OrderAddress } from './order-address';
export interface OrderDeliveryInfo {
  deliveryAddress?: OrderAddress;
  deliveryCharge?: number;
  deliveryType?: string;
  expectedDelivery?: string;
  id?: number;
}
