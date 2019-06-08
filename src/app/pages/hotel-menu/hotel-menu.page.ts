import { Subscription } from 'rxjs';
import { OrderLine } from './../../api/models/order-line';
import { CommandResourceService } from 'src/app/api/services';
import { RatingReview } from './../../api/models/rating-review';
import { UserRatingDTO } from './../../api/models/user-rating-dto';
import { Category } from './../../api/models/category';
import { CartService } from './../../services/cart.service';
import { StockCurrent } from './../../api/models/stock-current';
import { Store } from './../../api/models/store';
import { HotelMenuPopoverComponent } from './../../components/hotel-menu-popover/hotel-menu-popover.component';
import { HotelMenuPageModule } from './hotel-menu.module';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PopoverController, IonSlide, IonSlides, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { UserRating } from 'src/app/api/models/user-rating';
import { ReviewDTO, TicketLineDTO, Product } from 'src/app/api/models';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MyLocation,
  GoogleMapsAnimation,
  LatLng
} from '@ionic-native/google-maps';

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
              private oauthService: OAuthService,
              private commandResourceService: CommandResourceService,
              private queryResourceService: QueryResourceService) { }
    storeId;
    map: GoogleMap;
    store: Store;
    // delivery
    private subscriptionCart: Subscription;
    private subscriptionPrice: Subscription;
    cartSize;
    totalPrice;
    simple = true;
    mapLoaded = false;
    currentSubPage = 'menu';
    cardExpand: number[] = [];
    usr: any;
    rateReview: RatingReview[];
    ratings: UserRating[];
    categories: Category[];
    rate: UserRatingDTO = {rating: 1};
    review: ReviewDTO = {userName: '', review: '', reviewedDate: '', storeId: 0};
    stockCurrents: StockCurrent[];
    products: Product[] = [];
    selectedCategory: string = 'All';
    now:number;
    @ViewChild('slides') slides: IonSlides;
    ngOnInit() {
      this.storeId = this.route.snapshot.paramMap.get('id');
      this.cartService.storeId = this.storeId;
      this.queryResourceService.findStoreByRegisterNumberUsingGET(this.storeId).subscribe(result => {
        this.store = result;
      }, err => {
        console.log('Error fetching store data', err);
      });
      this.queryResourceService.findStockCurrentByStoreIdUsingGET(this.storeId).subscribe(result => {
        this.stockCurrents = result;
        result.forEach(() => {
          this.cardExpand.push(0);
        });
      }, err => {
        console.log('Error fetching product data', err);
      });
      this.queryResourceService.findRatingReviewByStoreidAndCustomerNameUsingGET({storeId: this.storeId}).subscribe(result => {
        this.rateReview = result.content;
      }, err => {
        console.log('Error fetching review data', err);
      });
      this.queryResourceService.findCategoryByStoreIdUsingGET({userId: this.storeId}).subscribe(success => {
        this.categories = success.content;
      });
      this.oauthService.loadUserProfile().then(user => {
        this.usr = user;
      });
      this.subscriptionCart = this.cartService.observableTickets.subscribe(orderLines => this.cartSize = orderLines.length);
      this.subscriptionPrice = this.cartService.observablePrice.subscribe(price => this.totalPrice = price);
      this.timeTracker();
    }

    async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: HotelMenuPopoverComponent,
        componentProps: {categories: this.categories , storeId: this.storeId
        ,selectedCategory: this.selectedCategory},
        event: ev,
        translucent: true
      });
      popover.onDidDismiss()
      .then((data:any) => {
        console.log('jjksjkjskj' , data.data.result);
        if(data.data.result !== undefined) {
          this.stockCurrents= data.data.result;
          this.selectedCategory = data.data.selectedCategory;
        } else {
          this.presentToast('Error while Getting data');
        }

      })
      return await popover.present();
    }

    segmentChanged(ev: any) {
      if (ev.detail.value === 'menu') {
        this.slides.slideTo(0);
      } else if (ev.detail.value === 'reviews') {
        this.slides.slideTo(1);
      } else if (ev.detail.value === 'info') {
        this.slides.slideTo(2);
      }
    }

    slideChange() {
      let index: any;
      this.slides.getActiveIndex().then(num => {
        index = num;
        if (index === 0) {
          this.currentSubPage = 'menu';
        } else if (index === 1) {
          this.currentSubPage = 'reviews';
        } else {
          this.currentSubPage = 'info';
          if (!this.mapLoaded) {
            this.loadMap();
          }
        }
      });
    }

    postReview() {
      console.log('here');
      this.review.storeId = this.store.id;
      this.rate.storeId = this.store.id;
      if (this.review.review !== '') {
        const raterev: RatingReview = {review: this.review,  rating: this.rate};
        raterev.rating.userName = this.usr.preferred_username;
        raterev.review.userName = this.usr.preferred_username;
        this.commandResourceService.createRatingAndReviewUsingPOST({ratingReview: raterev}).subscribe(result => {
          this.rateReview = result.content;
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

    add(i, stock: StockCurrent) {
      this.cardExpand[i]++;
      this.cartService.addProduct(stock.product, stock);
    }
    remove(i, stock: StockCurrent) {
      if (this.cardExpand[i] !== 0) {
        this.cardExpand[i]--;
        this.cartService.removeProduct(stock);
      }
    }

    updateRating(event) {
      this.rate.rating = event;
      console.log(this.rate.rating);
    }

    loadMap() {
      // This code is necessary for browser
      Environment.setEnv({
        API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAUlvH09qvfqTyR6izVneDPXEzDyHcIB-0',
        API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAUlvH09qvfqTyR6izVneDPXEzDyHcIB-0'
      });
      const latLng: string[] = this.store.location.split(',');
      const mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: +latLng[0],
            lng: +latLng[1]
          },
          zoom: 14,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create('map_canvas', mapOptions);
      const marker: Marker = this.map.addMarkerSync({
        position: new LatLng(+latLng[0], +latLng[1]),
        animation: GoogleMapsAnimation.BOUNCE
      });
      marker.showInfoWindow();
    }

    searchProducts(event) {
      if (event.detail.value !== '') {
        const query: string = event.detail.value;
        this.queryResourceService.findAllStockCurrentByProductNameStoreIdUsingGET({name: query.toLowerCase(), storeId: this.storeId})
          .subscribe(res => {
            this.stockCurrents = res;
          }, err => {
            this.presentToast('No results found');
          });
      } else {
        this.queryResourceService.findStockCurrentByStoreIdUsingGET(this.storeId).subscribe(result => {
          this.stockCurrents = result;
        }, err => {
          console.log('Error fetching product data', err);
        });
      }
    }

     // I dont Know/not sure whether this 
  // function will cause any Performance issues
  timeTracker() {
    setInterval(() => {
      let date = new Date()
      this.now  = this.getTimeFixed(date.getHours() + '.' + date.getMinutes());
    }, 1000);
  }

  getTimeFixed(str: string): number {
    return parseFloat(str.replace(':' , '.'));
  }
  }
