/* tslint:disable */
import { Status } from './status';
import { StockLine } from './stock-line';
export interface Stock {
  dateOfStockUpdated?: string;
  deliveryNoteRef?: number;
  id?: number;
  reference: string;
  status?: Status;
  stockLines?: Array<StockLine>;
  storageCost?: number;
}
