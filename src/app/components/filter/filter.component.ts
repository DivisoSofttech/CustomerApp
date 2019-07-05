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

  price = {
    lower: 20,
    upper: 300
  };

  deliveryType = 'both';

  categories: CategoryDTO[] = [];

  constructor(
    private modalController: ModalController,
    private queryResourceService: QueryResourceService
  ) { }

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
            .findStoreByRatingUsingGET()
            .subscribe(data => {
              console.log('Rating' , data);
            });
          break;

        case 'deliveryType':
          this.queryResourceService
            .findStoreByTypeNameUsingGET({
              name: this.deliveryType
            })
            .subscribe(data => {
              console.log('DeliveryType' ,data);
            });
          break;

        case 'ltoh':
          break;

        case 'htol':
          break;

        case 'price':
          console.log(this.price.lower,'-' , this.price.upper);
          this.queryResourceService
            .findAndSortProductByPriceUsingGET({
              to: this.price.lower,
              from: this.price.upper
            })
            .subscribe(data => {
              console.log('price' ,data);
            });
          break;

      }
    } catch (error) {
      console.log(error);
    }
  }
}
