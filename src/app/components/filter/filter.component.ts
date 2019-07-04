import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CategoryDTO, StoreDTO } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  distance = 4;

  price = 24;

  deliveryType = 'both';

  categories: CategoryDTO[] = [];

  constructor(
    private modalController: ModalController,
    private queryResourceService: QueryResourceService
  ) {}

  ngOnInit() {
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
          this.queryResourceService
            .findStoreByTypeNameUsingGET({
              name: this.deliveryType
            })
            .subscribe(data => {
              console.log(data);
            });
          break;

        case 'ltoh':
          break;

        case 'htol':
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
