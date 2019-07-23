/* tslint:disable */
import { ProductLine } from './product-line';
export interface OrderMaster {
  addressType?: string;
  alternatePhone?: number;
  city?: string;
  customerName?: string;
  deliveryCharge?: number;
  docketDate?: string;
  grandTotal?: number;
  houseNoOrBuildingName?: string;
  landmark?: string;
  methodOfOrder?: string;
  name?: string;
  orderId?: string;
  phone?: number;
  pincode?: number;
  productLine?: Array<ProductLine>;
  roadNameAreaOrStreet?: string;
  soldBy?: string;
  state?: string;
}
