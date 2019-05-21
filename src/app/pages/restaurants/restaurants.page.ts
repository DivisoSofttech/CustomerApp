import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { NavController, ModalController } from '@ionic/angular';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Store } from 'src/app/api/models';
import { QueryResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  latitude;
  longitude;
  stores: Store[] = [];
  rate = 2;
  constructor(private navCtrl: NavController,
              private modalController: ModalController,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private queryResourceService: QueryResourceService) {

  }
  showHotelMenu(storeId) {
    this.navCtrl.navigateForward('/hotel-menu/' + storeId);
  }
  async presentFilterModal() {
    const modal = await this.modalController.create({
      component : FilterComponent,
      cssClass : 'half-height',
      showBackdrop : true
    });
    return await modal.present();
  }

  ngOnInit() {
    this.getLocation();
    this.queryResourceService.findAllStoresUsingGET({}).subscribe(res => {
      this.stores = res;
    },
    err => {
      console.log('Error fetching stores');
    });
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude, this.longitude);
      this.getPlace();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getPlace() {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, options)
    .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
    .catch((error: any) => console.log(error));

  }

  rateChange(event) {
    console.log('rate changed', event);
  }
}
