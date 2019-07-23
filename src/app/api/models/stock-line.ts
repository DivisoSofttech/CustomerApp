/* tslint:disable */
import { Product } from './product';
import { Uom } from './uom';
export interface StockLine {
  buyPrice?: number;
  grossProfit?: number;
  id?: number;
  infrastructureId?: number;
  locationId?: string;
  margin?: number;
  product?: Product;
  reference: string;
  sellPriceExclusive?: number;
  sellPriceInclusive?: number;
  supplierRef?: number;
  units: number;
  uom?: Uom;
}
