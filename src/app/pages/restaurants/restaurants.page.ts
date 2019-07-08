import { map } from "rxjs/operators";
import { LocationService } from "./../../services/location-service.service";
import { Store, Category } from "src/app/api/models";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NavController,
  ModalController,
  ToastController,
  Platform,
  IonSlides,
  IonInfiniteScroll
} from "@ionic/angular";
import { FilterComponent } from "src/app/components/filter/filter.component";
import { QueryResourceService } from "src/app/api/services";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  Environment,
  MyLocation,
  GoogleMapsAnimation,
  GoogleMapsEvent
} from "@ionic-native/google-maps";
import { NotificationsComponent } from "src/app/components/notifications/notifications.component";
import { Loading } from "src/app/components/loading";
import { FavouriteService } from "src/app/services/favourite/favourite.service";
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.page.html",
  styleUrls: ["./restaurants.page.scss"]
})
export class RestaurantsPage implements OnInit {
  now: Date;
  loading: HTMLIonLoadingElement;
  storesBackup: Store[] = [];
  places: any[] = [];
  searchBarOnly = false;
  private selectedLat: string;
  private selectedLon: string;
  locateBarOnly = false;
  map: GoogleMap;
  stores: Store[] = [];
  categories: any = {};
  deliveryInfos: any = {};
  rate = 2;
  slideOpts = {
    slidesPerView: 2,
    loop: true,
    autoplay: true
  };
  @ViewChild("slides") slides: IonSlides;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  favouriteRestaurantsID = [];

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private locationService: LocationService,
    private queryResourceService: QueryResourceService,
    private loadingCreator: Loading,
    private favourite: FavouriteService,
    private filterService: FilterService
  ) { }

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
  showHotelMenu(storeId) {
    this.slides.stopAutoplay();
    this.navCtrl.navigateForward("/hotel-menu/" + storeId);
  }

  async presentFilterModal() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      cssClass: "half-height",
      showBackdrop: true
    });
    return await modal.present();
  }

  // I dont Know/not sure whether this
  // function will cause any Performance issues
  timeTracker() {
    this.now = new Date();
    // setInterval(() => {
    //   this.now = new Date();
    // }, 10000);
  }

  async ngOnInit() {
    this.loadingCreator.createLoader().then(async data => {
      this.loading = data;
      this.loading.present();
      this.timeTracker();
      this.getStores();
      await this.platform.ready();
      await this.loadMap();
    });
  }

  getStores() {
    this.filterService.getFilter()
    .subscribe(data => {
      if(data.sortFilter != undefined) {
        this.getStoreByCommonSortFilter()
      } else if(data.deliveryTypeFilter != undefined) {
        this.getStoreByDeliveryType();
      }
      else {
        this.getStoresNoFilter();
      }
    });
 
  }

  getStoreByCommonSortFilter() {
    this.filterService.getByCommonFilter();
  }

  getStoreByDeliveryType() {
    this.filterService.getByDeliveryType();
  }

  getStoresNoFilter() {
    this.queryResourceService.findAllStoresUsingGET(
      {

      }).subscribe(
        res => {
          this.stores = res;
          console.log("Got Stores", res);
          this.setRestaurantMarkers();
          this.storesBackup = res;
          this.getFavourites();
          this.stores.forEach(store => {
            console.log("Getting Category", store.regNo);
            this.queryResourceService
              .findCategoryByStoreIdUsingGET({ userId: store.regNo })
              .subscribe(
                success => {
                  this.categories[store.regNo] = success.content;
                  console.log("Got Category", success.content);
                  this.loading.dismiss();
                },
                err => {
                  this.loading.dismiss();
                  this.toastView("Error, connecting to server.");
                }
              );
            this.queryResourceService
              .findAllDeliveryTypesByStoreIdUsingGET({
                storeId: store.id
              })
              .subscribe(
                success => {
                  this.deliveryInfos[store.regNo] = success.content;
                  console.log("DeliveryInfo", this.deliveryInfos[store.regNo]);
                },
                err => {
                  console.log("Could Not Find Delivery Info");
                }
              );
          });
        },
        err => {
          console.log("Error fetching stores");
          this.toastView("Error, connecting to server.");
          this.loading.dismiss();
        }
      );    
  }

  async toastView(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      cssClass: "toast"
    });
    await toast.present();
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBMiG49LE8jalJZrgYTKcauhhSGkZHfUcw",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBMiG49LE8jalJZrgYTKcauhhSGkZHfUcw"
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 14,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);
    this.map
      .getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 14,
          tilt: 30
        });
        const marker: Marker = this.map.addMarkerSync({
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });
        marker.showInfoWindow();
      })
      .catch(err => {
        this.toastView(err.error_message);
      });
  }

  setRestaurantMarkers() {
    this.stores.forEach(store => {
      let latLng: string[];
      try {
        latLng = store.location.split(",");
      } catch (error) {

      }
      if (this.map != undefined && latLng != undefined) {
        const marker: Marker = this.map.addMarkerSync({
          icon: "assets/icon/marker.png",
          label: store.name,
          position: {
            lat: +latLng[0],
            lng: +latLng[1]
          },
          animation: GoogleMapsAnimation.BOUNCE
        });
        // const infowindow = new google.maps.InfoWindow({
        //   content: store.name
        // });
        // marker.showInfoWindow();
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showHotelMenu(store.regNo);
        });
      }
    });
  }

  async notificationsModal() {
    const modal = await this.modalController.create({
      component: NotificationsComponent
    });
    return await modal.present();
  }

  toggleSearchView(setVal: boolean) {
    this.searchBarOnly = setVal;
    this.stores = this.storesBackup;
  }

  toggleLocateView(setVal: boolean) {
    this.places = [];
    this.locateBarOnly = setVal;
  }

  doPlaceSearch(event) {
    this.places = [];
    console.log(event.detail.value);
    const searchterm = event.detail.value;
    if (searchterm === "" || searchterm === null) {
      return;
    }
    this.locationService.getPredictions(searchterm).subscribe(res => {
      console.log(res);
      this.places = res;
    });
  }

  decodeLatLongByPlaceId(placeId) {
    this.places = [];
    this.map.remove();
    this.locationService.geocodeAddress(placeId).then(latlon => {
      console.log(latlon);
      Environment.setEnv({
        API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBMiG49LE8jalJZrgYTKcauhhSGkZHfUcw",
        API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBMiG49LE8jalJZrgYTKcauhhSGkZHfUcw"
      });
      const mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: latlon[0],
            lng: latlon[1]
          },
          zoom: 14,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create("map_canvas", mapOptions);
      const marker: Marker = this.map.addMarkerSync({
        icon: "red",
        animation: "bounce",
        position: {
          lat: latlon[0],
          lng: latlon[1]
        }
      });
      this.setRestaurantMarkers();
    });
  }
  addToFavourite(store: Store) {
    console.log("adding to favourite", this.favouriteRestaurantsID);
    this.favourite.addToFavouriteStore(store, "/hotel-menu/" + store.regNo);
    this.getFavourites();
  }

  removeFromFavourite(store) {
    this.favourite.removeFromFavorite(store, "store");
    this.getFavourites();
  }

  getFavourites() {
    this.favouriteRestaurantsID = this.favourite.getFavouriteStoresID();
    console.log(this.favouriteRestaurantsID);
  }

  isFavourite(store: Store) {
    return this.favouriteRestaurantsID.includes(store.id);
  }

  searchRestaurants(event) {
    this.queryResourceService.findStoreBySearchTermUsingGET({ searchTerm: event.detail.value })
      .subscribe(result => {
        console.log(result.content);
        if (result.content.length === 0) {
          this.toastView('Sorry, couldn\'t find any match');
          return;
        } else {
          this.stores = result.content;
        }
      });
  }

  async filterModal() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      componentProps: { stores: this.stores }
    });

    modal.onDidDismiss()
      .then(data => {

        if (data.data != undefined) {
          this.stores = data.data;
        }
      })

    modal.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {

  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
