/* tslint:disable */
import { StockDiary } from './stock-diary';
import { Sort } from './sort';
export interface PageOfStockDiary {
  content?: Array<StockDiary>;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
