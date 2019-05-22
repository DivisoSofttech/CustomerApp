import { CartService } from './../../services/cart.service';
import { StockCurrent } from './../../api/models/stock-current';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Store } from './../../api/models/store';
import { HotelMenuPopoverComponent } from './../../components/hotel-menu-popover/hotel-menu-popover.component';
import { HotelMenuPageModule } from './hotel-menu.module';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, IonSlide, IonSlides, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Product, Review, ReviewDTO, UserRating } from 'src/app/api/models';

@Component({
  selector: 'app-hotel-menu',
  templateUrl: './hotel-menu.page.html',
  styleUrls: ['./hotel-menu.page.scss'],
})
export class HotelMenuPage implements OnInit {

  constructor(private popoverController: PopoverController,
              private route: ActivatedRoute,
              private cartService: CartService,
              private toastController: ToastController,
              private commandResourceService: CommandResourceService,
              private queryResourceService: QueryResourceService) { }
    storeId;
    store: Store;
    // delivery
    simple = true;
    currentSubPage = 'menu';
    cardExpand: boolean[] = [];
    reviews: Review[];
    ratings: UserRating[];
    rate: number;
    review: ReviewDTO = {userName: '', review: '', reviewedDate: '', storeId: 0};
    stockCurrents: StockCurrent[];
    @ViewChild('slides') slides: IonSlides;
    ngOnInit() {
      this.storeId = this.route.snapshot.paramMap.get('id');
      this.queryResourceService.findStoreByRegisterNumberUsingGET(this.storeId).subscribe(result => {
        this.store = result;
      }, err => {
        console.log('Error fetching store data', err);
      });
      this.queryResourceService.findStockCurrentByStoreIdUsingGET(this.storeId).subscribe(result => {
        this.stockCurrents = result;
        result.forEach(() => {
          this.cardExpand.push(false);
        });
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
      console.log('here');
      this.review.storeId = this.storeId;
      if (this.review.review !== '') {
        this.commandResourceService.createUserReviewUsingPOST(this.review).subscribe(result => {
          this.reviews.push(result);
        }, err => {
          this.presentToast('Error while posting review. Try again later');
        });
      } else {
        this.presentToast('Review field can\'t be empty.');
      }
    }

    async presentToast(message) {
      const toast = await this.toastController.create({
        message,
        cssClass: 'toast',
        duration: 1500
      });
      await toast.present();
    }

    expandOrCollapse(index) {
      if (this.cardExpand[index]) {
        this.cardExpand[index] = false;
      } else {
        this.cardExpand[index] = true;
      }
    }

    addToCart(stock: StockCurrent) {
      this.cartService.addProduct(stock.product, stock);
      this.presentToast('Product added to basket');
    }
  }
