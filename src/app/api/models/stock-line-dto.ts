/* tslint:disable */
export interface StockLineDTO {
  productId?: number;
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
  uomId?: number;
}
