/* tslint:disable */
import { Note } from './note';
import { Barcode } from './barcode';
import { Label } from './label';
import { Category } from './category';
import { Status } from './status';
import { StockDiary } from './stock-diary';
import { StockLine } from './stock-line';
import { TaxCategory } from './tax-category';
export interface Product {
  notes?: Array<Note>;
  barcode?: Barcode;
  dateOfExpiry?: string;
  dateOfMfd?: string;
  description?: string;
  id?: number;
  image?: string;
  imageContentType?: string;
  labels?: Array<Label>;
  maximumStockLevel?: number;
  mpn?: string;
  name: string;
  categories?: Array<Category>;
  outOfStock?: boolean;
  reOrderLevel?: number;
  reference: string;
  searchkey: string;
  sku?: string;
  status?: Status;
  stockDiaries?: Array<StockDiary>;
  stockLines?: Array<StockLine>;
  taxCategory?: TaxCategory;
  userId?: string;
  visible?: boolean;
}
