import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ModalController,
  Platform,
  IonSlides,
  IonInfiniteScroll,
  NavController
} from '@ionic/angular';

import { Store } from 'src/app/api/models';
import { LocationService } from './../../services/location-service.service';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { QueryResourceService } from 'src/app/api/services';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { FavouriteService } from 'src/app/services/favourite/favourite.service';
import { FilterService } from 'src/app/services/filter.service';
import { Util } from 'src/app/services/util';
import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss']
})
export class RestaurantsPage implements OnInit {

  now: Date;
  pageNumber = 1;
  maxPage = 1;
  filterData;
  showServiceDown = false;


  stores: Store[];
  storesBackup: Store[];
  categories: any = {};
  deliveryType: any = {};
  favouriteRestaurantsID = [];

  locateBarOnly = false;
  searchBarOnly = false;

  places: any[] = [];

  slideOpts = {
    slidesPerView: this.platform.width() >= 640 ? 3 : 2,
    loop: true,
    autoplay: true
  };
  @ViewChild('slides') slides: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private locationService: LocationService,
    private queryResourceService: QueryResourceService,
    private favourite: FavouriteService,
    private filterService: FilterService,
    private util: Util,
    private map: MapService,
    private navCtrl: NavController
  ) {
    if (this.platform.width() <= 640) {
      this.navCtrl.navigateRoot('/tabs/home');
    } else {
      this.navCtrl.navigateRoot('/restaurants');
    }
  }


  ngOnInit() {

    this.showServiceDown = false;
    this.now = new Date();
    this.filterService.getFilter()
    .subscribe(data => {
      this.filterData = data;
      this.getStores();
    });
    this.platform.ready()
      .then(data => {
        if (this.platform.is('cordova')) {
          this.map.loadMap();
        }
      });
  }

  getStores() {
      if (this.filterData.sortFilter != undefined) {
        console.log('Getting Via Common Filter');
        this.getStoreByCommonSortFilter();
      } else if (this.filterData.deliveryTypeFilter != undefined) {
        console.log('Getting Via Delivery Type Filter');
        this.getStoreByDeliveryType(this.filterData.deliveryTypeFilter);
      } else {
        console.log('Getting Via No Filter');
        this.getStoresNoFilter();
      }

  }

  getStoreByCommonSortFilter() {
    switch (this.filterData.sortFilter) {
      case 'rating':
        this.queryResourceService.findStoreByRatingUsingGET()
        .subscribe(res => {

          console.log('Got CommonFilter' , res.content);

          this.showServiceDown = false;
          this.stores = res.content;

          this.maxPage = res.totalPages;
          this.pageNumber++;

          this.map.setStores(this.stores);
          this.map.setRestaurantMarkers();
          this.getFavourites();

          this.stores.forEach(store => {
            this.getStoreCategory(store);
            this.getStoreDeliveryType(store);
          });
        },
        err => {
          console.log('Error fetching stores');
          this.showServiceDown = true;
          this.toggleInfiniteScroll();
        });
        break;
    }
  }

  getStoreByDeliveryType(dt) {
    this.queryResourceService.findStoreByTypeNameUsingGET(
      {
        name: dt.toLowerCase()
      }
    ).subscribe(res => {

      console.log('Got DeliveryType' , res.content);

      this.showServiceDown = false;
      this.stores = res.content;

      this.maxPage = res.totalPages;
      this.pageNumber++;

      this.map.setStores(this.stores);
      this.map.setRestaurantMarkers();
      this.getFavourites();

      this.stores.forEach(store => {
        this.getStoreCategory(store);
        this.getStoreDeliveryType(store);
      });
    },
    err => {
      console.log('Error fetching stores');
      this.showServiceDown = true;
      this.toggleInfiniteScroll();
    });
  }

  getStoresNoFilter() {
    this.queryResourceService.findAllStoresUsingGET({ page: this.pageNumber })
      .subscribe(
        res => {
          this.showServiceDown = false;
          this.stores = res.content;
          this.storesBackup = res.content;

          this.maxPage = res.totalPages;
          this.pageNumber++;

          this.map.setStores(this.stores);
          this.map.setRestaurantMarkers();
          this.getFavourites();

          this.stores.forEach(store => {
            this.getStoreCategory(store);
            this.getStoreDeliveryType(store);
          });

        },
        err => {
          console.log('Error fetching stores');
          this.showServiceDown = true;
          this.toggleInfiniteScroll();
        }
      );
  }


  getStoreCategory(store) {
    console.log('Getting Category', store.regNo);
    this.queryResourceService
      .findCategoryByStoreIdUsingGET({ userId: store.regNo })
      .subscribe(
        success => {
          this.categories[store.regNo] = success.content;
          console.log('Got Category', success.content);
        },
        err => { }
      );
  }


  getStoreDeliveryType(store) {
    this.queryResourceService
      .findAllDeliveryTypesByStoreIdUsingGET({
        storeId: store.id
      })
      .subscribe(
        success => {
          this.deliveryType[store.regNo] = success.content;
          console.log('DeliveryInfo', this.deliveryType[store.regNo]);
        },
        err => { }
      );
  }

  loadData(event) {

    if (this.pageNumber <= this.maxPage) {
      console.log('Loading more data');
      this.getStores();
    } else {
      console.log('Disabling Infinite Scroll');
      this.toggleInfiniteScroll();
    }
  }

  doRefresh(event) {
    console.log('Refrshing data');
    this.infiniteScroll.disabled = false;
    this.ngOnInit();
    setTimeout(() => {
      console.log('Refresh has completed');
      event.target.complete();
    }, 2000);
  }


  // Favourites Methods

  addToFavourite(store: Store) {
    console.log('adding to favourite', this.favouriteRestaurantsID);
    this.favourite.addToFavouriteStore(store, '/hotel-menu/' + store.regNo);
    this.getFavourites();
  }

  removeFromFavourite(store) {
    this.favourite.removeFromFavorite(store, 'store');
    this.getFavourites();
  }

  getFavourites() {
    this.favouriteRestaurantsID = this.favourite.getFavouriteStoresID();
    console.log(this.favouriteRestaurantsID);
  }

  isFavourite(store: Store) {
    return this.favouriteRestaurantsID.includes(store.id);
  }


  // View Related Methods

  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }
  ionViewDideave() {
    this.slides.stopAutoplay();
  }
  ionViewDidEnter() {
    this.getFavourites();
    this.stores = this.stores;
    this.slides.startAutoplay();
  }

  doPlaceSearch(event) {
    this.places = [];
    console.log(event.detail.value);
    const searchterm = event.detail.value;
    if (searchterm === '' || searchterm === null) {
      return;
    }
    this.locationService.getPredictions(searchterm).subscribe(res => {
      console.log(res);
      this.places = res;
    });
  }

  updateMap(placeId) {
    this.map.decodeLatLongByPlaceId(placeId);
  }

  showHotelMenu(storeId) {
    this.navCtrl.navigateForward('/hotel-menu/' + storeId);
  }

  searchRestaurants(event) {
    this.queryResourceService.findStoreBySearchTermUsingGET({ searchTerm: event.detail.value })
      .subscribe(result => {
        console.log(result.content);
        if (result.content.length === 0) {
          this.util.createToast('Sorry, couldn\'t find any match');
          return;
        } else {
          this.stores = result.content;
        }
      });
  }

  async notificationsModal() {
    const modal = await this.modalController.create({
      component: NotificationsComponent
    });
    return await modal.present();
  }

  async filterModal() {
    const modal = await this.modalController.create({
      component: FilterComponent
    });

    modal.onDidDismiss()
    .then(() => {

        this.pageNumber = 1;
        this.infiniteScroll.disabled = false;
        this.maxPage = 1;
    });

    modal.present();
  }

  toggleSearchView(setVal: boolean) {
    this.searchBarOnly = setVal;
    this.stores = this.storesBackup;
  }

  toggleLocateView(setVal: boolean) {
    this.places = [];
    this.locateBarOnly = setVal;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
