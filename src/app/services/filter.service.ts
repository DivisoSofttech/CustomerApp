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

  getByDeliveryType(obj: any, complete: any) {
    let stores: Store[] = [];
    
    if (this.pageNum <= this.maxPageNum) {

      this.queryResourceService.findStoreByTypeNameUsingGET(
        {
          name: this.filter.deliveryTypeFilter.toLowerCase(),
        }).subscribe(data => {
          console.log('Getting By Delivery Type' , data , this.filter);
          this.maxPageNum = data.totalPages;
          this.pageNum++;
          obj(data.content);
      })
    } else {
      this.pageNum = 1;
      this.maxPageNum = 1;
      complete();
    }
  }

  getByCommonFilter(obj: any, complete: any) {

    console.log(this.filter);
    let stores: Store[] = [];

    if (this.pageNum <= this.maxPageNum) {

        switch (this.filter.sortFilter) {
          case 'rating':
            this.queryResourceService.findStoreByRatingUsingGET()
              .subscribe(data => {
                this.maxPageNum = data.totalPages;
                this.pageNum++;
                obj(data.content);
              });
            break;
        }
    } else {
      this.pageNum = 1;
      this.maxPageNum = 1;
      complete();
    }

  }
}
