/* tslint:disable */
import { OrderDeliveryInfo } from './order-delivery-info';
import { OrderLine } from './order-line';
import { OrderPayment } from './order-payment';
export interface Order {
  customerId?: string;
  date?: string;
  deliveryInfo?: OrderDeliveryInfo;
  grandTotal?: number;
  id?: number;
  orderId?: string;
  orderLines?: Array<OrderLine>;
  payment?: OrderPayment;
  storeId?: string;
}
