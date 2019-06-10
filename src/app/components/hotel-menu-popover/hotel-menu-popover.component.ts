import { Category } from './../../api/models/category';
import { Component, OnInit, Input } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { PopoverController, LoadingController } from '@ionic/angular';
import { Loading } from '../loading';

@Component({
  selector: 'app-hotel-menu-popover',
  templateUrl: './hotel-menu-popover.component.html',
  styleUrls: ['./hotel-menu-popover.component.scss']
})
export class HotelMenuPopoverComponent implements OnInit {
  @Input()
  categories: Category[] = [];
  @Input() storeId:any;
  @Input() selectedCategory:string;

  loading: HTMLIonLoadingElement;

  constructor(
    private popoverController: PopoverController,
    private queryResourceService: QueryResourceService,
    private loadingController: LoadingController,
    private loadingCreator: Loading
  ) {}

  selectCategory(category: Category) {

    this.selectedCategory = category.name;
    this.loadingCreator.createLoader()
    .then((data) => {
      this.loading = data;
      this.loading.present();
      this.queryResourceService.findProductByStoreIdAndCategoryIdUsingGET(
        {
          userId: this.storeId,
          categoryId: category.id
        })
        .subscribe(data => {
          this.loading.dismiss();
          this.popoverController.dismiss({
            selectedCategory: this.selectedCategory,
            result:data
          });
        },
        err => {
          this.loading.dismiss();
        });  
    })
  }

  dismiss() {
    this.selectedCategory = 'All';
    this.loadingCreator.createLoader()
    .then((data)=> {
      this.loading = data;
      this.loading.present();
      this.queryResourceService.findStockCurrentByStoreIdUsingGET(this.storeId).subscribe(data=> {
        this.loading.dismiss();
        this.popoverController.dismiss({
          selectedCategory: this.selectedCategory,
          result:data
        });
      },
      err=> {
        this.loading.dismiss();
      });  
    })
  }

  ngOnInit() {
  }
}
