import { Injectable } from '@angular/core';
import { QueryResourceService } from '../api/services';
import { BehaviorSubject } from 'rxjs';

export class Filter {

  sortFilter?: string;

  deliveryTypeFilter?: string;

  categoryTypeFilter?: string[];

  distance?: number;
};


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter: Filter = {}

  private filterSubject: BehaviorSubject<Filter> = new BehaviorSubject<Filter>(this.filter);

  pageNum = 1;
  maxPageNum = 1;

  constructor(
    private queryResourceService: QueryResourceService
  ) { }

  setFilter(pfilter) {
    this.filter = pfilter;
    this.filterSubject.next(pfilter);
  }

  getFilter() {
    return this.filterSubject;
  }

  resetFilter() {
    this.filterSubject.next(this.filter);
    this.pageNum = 1;
    this.maxPageNum = 1;
  }
}
