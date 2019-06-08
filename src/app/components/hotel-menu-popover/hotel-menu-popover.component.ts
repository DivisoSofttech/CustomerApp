import { Category } from './../../api/models/category';
import { Component, OnInit, Input } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { PopoverController, LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController
  ) {}

  async createLoader() {

    this.loading = await this.loadingController.create({
      spinner: 'circles',
      translucent: true,
      cssClass: 'loading'
    });
  }

  selectCategory(category: Category) {

    this.selectedCategory = category.name;
    this.createLoader()
    .then(() => {
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
    this.createLoader()
    .then(()=> {
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
