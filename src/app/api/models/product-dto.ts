/* tslint:disable */
import { CategoryDTO } from './category-dto';
import { LabelDTO } from './label-dto';
export interface ProductDTO {
  barcodeId?: number;
  categories?: Array<CategoryDTO>;
  dateOfExpiry?: string;
  dateOfMfd?: string;
  description?: string;
  id?: number;
  image?: string;
  imageContentType?: string;
  labels?: Array<LabelDTO>;
  maximumStockLevel?: number;
  mpn?: string;
  name: string;
  outOfStock?: boolean;
  reOrderLevel?: number;
  reference: string;
  searchkey: string;
  sku?: string;
  statusId?: number;
  taxCategoryId?: number;
  userId?: string;
  visible?: boolean;
}
