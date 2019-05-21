import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Store } from './../../api/models/store';
import { HotelMenuPopoverComponent } from './../../components/hotel-menu-popover/hotel-menu-popover.component';
import { HotelMenuPageModule } from './hotel-menu.module';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PopoverController, IonSlide, IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Product, Review, ReviewDTO } from 'src/app/api/models';

@Component({
  selector: 'app-hotel-menu',
  templateUrl: './hotel-menu.page.html',
  styleUrls: ['./hotel-menu.page.scss'],
})
export class HotelMenuPage implements OnInit {

  constructor(private popoverController: PopoverController,
              private route: ActivatedRoute,
              private commandResourceService: CommandResourceService,
              private queryResourceService: QueryResourceService) { }
  storeId;
  store: Store;
  simple = true;
  currentSubPage = 'menu';
  reviews: Review[];
  rate: number;
  review: ReviewDTO;
  products: Product[];
  @ViewChild('slides') slides: IonSlides;
  ngOnInit() {
    this.storeId = this.route.snapshot.paramMap.get('id');
    this.queryResourceService.findStoreByRegisterNumberUsingGET(this.storeId).subscribe(result => {
      this.store = result;
    }, err => {
      console.log('Error fetching store data', err);
    });
    this.queryResourceService.findAllProductByStoreIdUsingGET(this.storeId).subscribe(result => {
      this.products = result;
    }, err => {
      console.log('Error fetching product data', err);
    });
    this.queryResourceService.findReviewsByStoreIdUsingGET(this.storeId).subscribe(result => {
      this.reviews = result;
    }, err => {
      console.log('Error fetching review data', err);
    });
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: HotelMenuPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'menu') {
      this.slides.slideTo(0);
    } else {
      this.slides.slideTo(1);
    }
  }

  slideChange() {
    if (this.currentSubPage === 'menu') {
      this.currentSubPage = 'reviews';
      this.slides.slideTo(1);
    } else {
      this.currentSubPage = 'menu';
      this.slides.slideTo(0);
    }
  }

  postReview() {
    this.commandResourceService.createRev
  }

}
