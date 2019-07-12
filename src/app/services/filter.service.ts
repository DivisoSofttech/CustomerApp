import { Injectable } from '@angular/core';
import { QueryResourceService } from '../api/services';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../api/models';

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

  pageNum = 1;
  maxPageNum = 1;

  constructor(
    private queryResourceService: QueryResourceService
  ) { }

  setFilter(pfilter) {
    this.filter = pfilter;
    this.filterSubjcet.next(pfilter);
  }

  getFilter() {
    return this.filterSubjcet;
  }

  resetFilter() {
    this.filterSubjcet.next(this.filter);
    this.pageNum = 1;
    this.maxPageNum = 1;
  }
}
