/* tslint:disable */
import { Link } from './link';
export interface CommandResource {
  _links?: Array<Link>;
  nextTaskId?: string;
  selfId?: number;
  status?: string;
}
