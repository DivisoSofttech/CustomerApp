import { Injectable } from '@angular/core';
import { QueryResourceService } from '../api/services';
import { BehaviorSubject } from 'rxjs';

export class Filter {

  sortFilter?: string;

  deliveryTypeFilter?: string;

  categoryTypeFilter?: string[];
};


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter: Filter = {}

  private filterSubjcet: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.filter);

  constructor(
    private queryResourceService: QueryResourceService
  ) { }

  setFilter(pfilter) {
    this.filterSubjcet.next(pfilter);
  }

  getFilter() {
    return this.filterSubjcet;
  }

  resetFilter() {
    this.filterSubjcet.next(this.filter);
  }

  getByDeliveryType() {
    console.log('DeliveryType' , this.filter.deliveryTypeFilter);
  }

  getByCommonFilter() {
    this.filterSubjcet.subscribe(data => {

    });
  }


}
