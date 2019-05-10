import { Component, OnInit } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { NavController, ModalController } from '@ionic/angular';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  latitude;
  longitude;

  constructor(private navCtrl: NavController,
              private modalController: ModalController,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder) {

  }
  showHotelMenu() {
    this.navCtrl.navigateForward('/hotel-menu');
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

}
