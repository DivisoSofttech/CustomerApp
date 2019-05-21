/* tslint:disable */
import { BarcodeType } from './barcode-type';
export interface Barcode {
  barcodeTypes?: Array<BarcodeType>;
  code: string;
  description?: string;
  id?: number;
}
