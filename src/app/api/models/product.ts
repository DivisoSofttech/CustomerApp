/* tslint:disable */
import { Barcode } from './barcode';
import { Category } from './category';
import { Label } from './label';
import { Note } from './note';
import { Status } from './status';
import { StockDiary } from './stock-diary';
import { StockLine } from './stock-line';
import { TaxCategory } from './tax-category';
export interface Product {
  barcode?: Barcode;
  categories?: Array<Category>;
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
  notes?: Array<Note>;
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
