import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { CategoryDTO, StoreDTO } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services';
import { Filter , FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() enableCloseButton = true;
  distance = 4;

  price = {
    lower: 20,
    upper: 300
  };

  deliveryType = 'Both';

  filterObject: Filter = {};

  categories: CategoryDTO[] = [];

  constructor(
    private modalController: ModalController,
    private queryResourceService: QueryResourceService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterService.getFilter()
    .subscribe(data => {
      this.filterObject = data;
      if(data.deliveryTypeFilter === undefined) {
        this.deliveryType = 'Both';
      } else {
        this.deliveryType = data.deliveryTypeFilter;
      }
    })
    this.getCategories();
  }

  getCategories() {
    this.queryResourceService.findAllCategoriesUsingGET({}).subscribe(data => {
      if (data != undefined) {
        this.categories = data;
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  filter(type) {
    try {
      switch (type) {

        case 'rating':
            this.filterObject.deliveryTypeFilter = undefined;
            this.filterObject.sortFilter = 'rating';
            this.filterService.setFilter(this.filterObject);
            this.dismiss();
          break;

        case 'time':
            this.filterObject.deliveryTypeFilter = undefined;
            this.filterObject.sortFilter = 'time';
            this.filterService.setFilter(this.filterObject);
          this.dismiss();
          break;

        case 'ltoh':
            this.filterObject.deliveryTypeFilter = undefined;
            this.filterObject.sortFilter = 'ltoh';
            this.filterService.setFilter(this.filterObject);
            this.dismiss();
          break;

        case 'htol':
            this.filterObject.deliveryTypeFilter = undefined;
            this.filterObject.sortFilter = 'htol';
            this.filterService.setFilter(this.filterObject);
            this.dismiss();
          break;
        case 'deliveryType':
              this.filterObject.sortFilter = undefined;       
              this.filterObject.deliveryTypeFilter = this.deliveryType;
              this.filterService.setFilter(this.filterObject);
              this.dismiss();
          break;
        case 'reset':
          this.filterObject = {};
          this.filterService.setFilter(this.filterObject);
          this.dismiss();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
