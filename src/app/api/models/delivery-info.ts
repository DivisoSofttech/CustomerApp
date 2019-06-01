/* tslint:disable */
import { Store } from './store';
import { Type } from './type';
export interface DeliveryInfo {
  endTime?: string;
  id?: number;
  startingTime?: string;
  store?: Store;
  type?: Type;
}
