/* tslint:disable */
import { Product } from './product';
import { Uom } from './uom';
export interface StockLine {
  product?: Product;
  buyPrice?: number;
  id?: number;
  infrastructureId?: number;
  locationId?: string;
  margin?: number;
  grossProfit?: number;
  reference: string;
  sellPriceExclusive?: number;
  sellPriceInclusive?: number;
  supplierRef?: number;
  units: number;
  uom?: Uom;
}
