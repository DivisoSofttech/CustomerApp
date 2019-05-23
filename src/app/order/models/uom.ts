/* tslint:disable */
import { StockLine } from './stock-line';
export interface Uom {
  description?: string;
  id?: number;
  name: string;
  stockLines?: Array<StockLine>;
}
