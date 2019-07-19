/* tslint:disable */
export interface StockLineDTO {
  buyPrice?: number;
  grossProfit?: number;
  id?: number;
  infrastructureId?: number;
  locationId?: string;
  margin?: number;
  productId?: number;
  reference: string;
  sellPriceExclusive?: number;
  sellPriceInclusive?: number;
  supplierRef?: number;
  units: number;
  uomId?: number;
}
