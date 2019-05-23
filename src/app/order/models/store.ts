/* tslint:disable */
import { DeliveryInfo } from './delivery-info';
import { Propreitor } from './propreitor';
import { Review } from './review';
import { UserRating } from './user-rating';
export interface Store {
  location?: string;
  closingTime?: string;
  deliveryInfo?: DeliveryInfo;
  email?: string;
  id?: number;
  image?: string;
  imageContentType?: string;
  info?: string;
  contactNo?: number;
  name?: string;
  openingTime?: string;
  propreitor?: Propreitor;
  regNo?: string;
  reviews?: Array<Review>;
  totalRating?: number;
  userRatings?: Array<UserRating>;
}
