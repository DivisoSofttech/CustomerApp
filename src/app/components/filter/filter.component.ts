import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CategoryDTO, StoreDTO } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  distance: number = 4;

  deliveryType: string = "both";

  categories: CategoryDTO[] = [];

  constructor(
     private modalController:ModalController
    ,private queryResourceService: QueryResourceService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.queryResourceService.findAllCategoriesUsingGET({})
    .subscribe(data => {
      if(data != undefined) {
        this.categories = data;
      }
    });
  }

  dismiss()
  {
    this.modalController.dismiss();
  }

  filter() {
    
  }

}
