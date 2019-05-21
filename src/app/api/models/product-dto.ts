/* tslint:disable */
import { LabelDTO } from './label-dto';
import { CategoryDTO } from './category-dto';
export interface ProductDTO {
  mpn?: string;
  barcodeId?: number;
  dateOfExpiry?: string;
  dateOfMfd?: string;
  description?: string;
  id?: number;
  image?: string;
  imageContentType?: string;
  labels?: Array<LabelDTO>;
  maximumStockLevel?: number;
  categories?: Array<CategoryDTO>;
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
