import { UserStatusService } from './../../services/user-status.service';
import { FavouriteService } from './../../services/favourite/favourite.service';
import { Subscription } from 'rxjs';
import { CommandResourceService } from 'src/app/api/services';
import { RatingReview } from './../../api/models/rating-review';
import { UserRatingDTO } from './../../api/models/user-rating-dto';
import { Category } from './../../api/models/category';
import { CartService } from './../../services/cart.service';
import { StockCurrent } from './../../api/models/stock-current';
import { Store } from './../../api/models/store';
import { HotelMenuPopoverComponent } from './../../components/hotel-menu-popover/hotel-menu-popover.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, IonSlides, IonSearchbar} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { UserRating } from 'src/app/api/models/user-rating';
import { ReviewDTO, Product } from 'src/app/api/models';
import { SearchHistoryService } from 'src/app/services/search-history-service';
import { Util } from 'src/app/services/util';
import { MapService } from 'src/app/services/map/map.service';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-hotel-menu',
  templateUrl: './hotel-menu.page.html',
  styleUrls: ['./hotel-menu.page.scss']
})
export class HotelMenuPage implements OnInit {
  accordionArray = [];
  storeId;
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
  rate: UserRatingDTO = { rating: 1 };
  review: ReviewDTO = {
    userName: '',
    review: '',
    reviewedDate: '',
    storeId: 0
  };
  stockCurrents: StockCurrent[];
  products: Product[] = [];
  selectedCategory = 'All';
  now: Date;
  loading: HTMLIonLoadingElement;
  searchSuggetions: any[] = [];
  disableSuggetions = false;
  searchBarOnly = false;
  @ViewChild('slides') slides: IonSlides;
  @ViewChild('searchBar') searchBar: IonSearchbar;

  favouriteProductsID = [];


  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private util: Util,
    private commandResourceService: CommandResourceService,
    private queryResourceService: QueryResourceService,
    private keycloakService: KeycloakService,
    private favourite: FavouriteService,
    private mapService: MapService,
    private userStatusService: UserStatusService,
    private searchHistoyService: SearchHistoryService
  ) { }


  ionViewDidEnter() {
    this.userStatusService.disableFilterView();
  }

  ionViewWillLeave() {
    this.userStatusService.enableFilterView();
  }

  ngOnInit() {
    this.util.createLoader()
    .then(loader => {
      this.loading = loader;
      this.loading.dismiss();
      this.storeId = this.route.snapshot.paramMap.get('id');
      this.cartService.storeId = this.storeId;
      this.keycloakService.getCurrentUserDetails()
      .then(data => {
        this.usr = data;
      });

      this.getStore();
      this.getProducts();
      this.getCategories();
      this.getRatingReview();

      this.subscriptionCart = this.cartService.observableTickets.subscribe(
        orderLines => (this.cartSize = orderLines.length)
      );
      this.subscriptionPrice = this.cartService.observablePrice.subscribe(
        price => (this.totalPrice = price)
      );
      this.timeTracker();
    });

  }

  getRatingReview() {
    this.queryResourceService
    .findRatingReviewByStoreidAndCustomerNameUsingGET({
      storeId: this.storeId
    })
    .subscribe(
      result => {
        this.rateReview = result.content;
      },
      err => {
        console.log('Error fetching review data', err);
      }
    );
  }

  getStore() {
    this.queryResourceService
    .findStoreByRegisterNumberUsingGET(this.storeId)
    .subscribe(
      result => {
        this.store = result;
      },
      err => {
        console.log('Error fetching store data', err);
      }
    );
  }

  getCategories() {
    this.queryResourceService
    .findAllCategoriesUsingGET(this.storeId)
    .subscribe(result => {
      this.categories = result;
    });
  }

  getProducts() {
    this.queryResourceService
    .findStockCurrentByStoreIdUsingGET(this.storeId)
    .subscribe(
      result => {
        if (result != null) {
          this.stockCurrents = result.content;
          this.getFavourites();
          result.content.forEach(() => {
            this.accordionArray.push(false);
          });
        }
        this.loading.dismiss();
        result.content.forEach(() => {
          this.cardExpand.push(0);
        });
      },
      err => {
        console.log('Error fetching product data', err);
      }
    );
  }


  postReview() {
    console.log('here');
    this.review.storeId = this.store.id;
    this.rate.storeId = this.store.id;
    if (this.review.review !== '') {
      const raterev: RatingReview = { review: this.review, rating: this.rate };
      raterev.rating.userName = this.usr.preferred_username;
      raterev.review.userName = this.usr.preferred_username;
      this.commandResourceService
        .createRatingAndReviewUsingPOST({ ratingReview: raterev })
        .subscribe(
          result => {
            console.log(result);
            this.rateReview = result.content;
            this.review.review = '';
          },
          err => {
            this.util.createToast('Error while posting review. Try again later');
          }
        );
    } else {
      this.util.createToast('Review field can\'t be empty.');
    }
  }

  updateRating(event) {
    this.rate.rating = event;
    console.log(this.rate.rating);
  }


  searchProducts(event) {

    this.searchSuggetions = [];
    if (event.detail.value !== '') {
      if (this.disableSuggetions != true) {
        this.searchHistoyService.findAllSearchTerms(event.detail.value)
        .then(data => {
          console.log(data);
          this.searchSuggetions = data;
        });
        this.searchHistoyService.addSearchTerm(event.detail.value);
      }
      const query: string = event.detail.value;
      this.queryResourceService
        .findAllStockCurrentByProductNameStoreIdUsingGET({
          name: query,
          storeId: this.storeId
        })
        .subscribe(
          res => {
            console.log('Stock' , this.stockCurrents);
            this.stockCurrents = res;
            this.disableSuggetions = false;
          },
          err => {
            this.util.createToast('No results found');
            this.disableSuggetions = false;
          }
        );
    } else {
      this.getProducts();
    }
  }



  // View Methods

  closeOpen(index) {
    for (let i = 0 ; i < this.accordionArray.length; i++) {

      if (i === index) {
        this.accordionArray[i] = !this.accordionArray[i];
      } else {
        this.accordionArray[i] = false;
      }
    }
  }

  async categoryListPopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: HotelMenuPopoverComponent,
      componentProps: {
        categories: this.categories,
        storeId: this.storeId,
        selectedCategory: this.selectedCategory
      },
      event: ev,
      translucent: true
    });
    popover.onDidDismiss().then((data: any) => {
      console.log(data.data);
      if (data.data !== undefined) {
        this.stockCurrents = data.data.result;
        this.selectedCategory = data.data.selectedCategory;
      } else {
        this.util.createToast('Error while Getting data');
      }
    });
    return await popover.present();
  }

  toggleSearchView(setVal: boolean) {
    this.searchBarOnly = setVal;
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
          this.mapService.loadMap();
        }
      }
    });
  }

  add(i, stock: StockCurrent) {
    if (this.cartService.addProduct(stock.product, stock , this.store)) {
      this.cardExpand[i]++;
    }
  }

  remove(i, stock: StockCurrent) {
    if (this.cardExpand[i] !== 0) {
      this.cardExpand[i]--;
      this.cartService.removeProduct(stock);
    }
  }

  selectSuggestion(term) {
    this.disableSuggetions = true;
    this.searchSuggetions = [];
    this.searchBar.value = term;
  }

  // I dont Know/not sure whether this
  // function will cause any Performance issues
  timeTracker() {
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
    }, 10000);
  }

  addToFavourite(product) {
    console.log('adding to favourite', this.favouriteProductsID);
    this.favourite.addToFavouriteProduct(product, this.router.url.split('#')[0]);
    this.getFavourites();
  }

  removeFromFavourite(product) {
    this.favourite.removeFromFavorite(product, 'product');
    this.getFavourites();
  }

  getFavourites() {
    this.favouriteProductsID = this.favourite.getFavouriteProductsID();
    console.log(this.favouriteProductsID);
  }

  isFavourite(product: Product) {
    return this.favouriteProductsID.includes(product.id);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
