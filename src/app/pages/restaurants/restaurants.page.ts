import { Store, Category } from 'src/app/api/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { NavController, ModalController, ToastController, Platform, IonSlides, LoadingController } from '@ionic/angular';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { QueryResourceService } from 'src/app/api/services';
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
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { LowerCasePipe } from '@angular/common';
import { Loading } from 'src/app/components/loading';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  now: number;
  loading: HTMLIonLoadingElement;

  map: GoogleMap;
  stores: Store[] = [];
  categories: any = {};
  rate = 2;
  slideOpts = {
    slidesPerView: 2,
    loop: true,
    autoplay: true,
  };
  @ViewChild('slides') slides: IonSlides;
  constructor(private navCtrl: NavController,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private modalctrl: ModalController,
    private queryResourceService: QueryResourceService,
    private loadingCreator: Loading) {
  }

  ionViewWillLeave() {
    console.log('hello will leave');
    this.slides.stopAutoplay();
  }
  ionViewDideave() {
    console.log('hello did leave');
    this.slides.stopAutoplay();
  }
  ionViewDidEnter() {
    console.log('hello did enter');
    this.slides.startAutoplay();
  }
  showHotelMenu(storeId) {
    this.slides.stopAutoplay();
    this.navCtrl.navigateForward('/hotel-menu/' + storeId);
  }

  async presentFilterModal() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      cssClass: 'half-height',
      showBackdrop: true
    });
    return await modal.present();
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

  async ngOnInit() {

    this.loadingCreator.createLoader()
    .then(async (data) => {
      this.loading = data;
      this.loading.present();
      this.timeTracker();
      this.queryResourceService.findAllStoresUsingGET({}).subscribe(res => {
        this.stores = res;
        this.stores.forEach(store => {
          this.queryResourceService.findCategoryByStoreIdUsingGET({userId: store.regNo}).subscribe(success => {
              this.categories[store.regNo] = success.content;
              console.log('------------------------------------------',this.categories);
              this.loading.dismiss();
          },
          err=> {
            this.loading.dismiss();
          });
        })
      },
        err => {
          console.log('Error fetching stores');
          this.loading.dismiss();
        });
      await this.platform.ready();
      await this.loadMap();  
    })
  }

  search(event) {
    if (event.detail.value !== '') {
      const query: string = event.detail.value;
      this.queryResourceService.findAllStoreByNameUsingGET(query.toLowerCase()).subscribe(res => {
        if (res.length > 0) {
          this.stores = res;
        }
      }, err => {
        this.toastView('No results found');
      });
    } else {
      this.queryResourceService.findAllStoresUsingGET({}).subscribe(res => {
        this.stores = res;
      },
        err => {
          console.log('Error fetching stores');
        });
    }
  }

  async toastView(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      cssClass: 'toast'
    });
    await toast.present();
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAUlvH09qvfqTyR6izVneDPXEzDyHcIB-0',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAUlvH09qvfqTyR6izVneDPXEzDyHcIB-0'
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

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.getMyLocation().then((location: MyLocation) => {
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

  async notificationsModal() {
    const modal = await this.modalController.create({
      component: NotificationsComponent,
    });
    return await modal.present();
  }


}
