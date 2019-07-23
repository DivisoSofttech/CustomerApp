import { Injectable } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  Environment,
  MyLocation,
  GoogleMapsAnimation,
  GoogleMapsEvent
} from '@ionic-native/google-maps';
import { Util } from '../util';
import { NavController } from '@ionic/angular';
import { LocationService } from '../location-service.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: GoogleMap;
  stores: any;

  constructor(private util: Util,
              private navCtrl: NavController,
              private locationService: LocationService) { }

  // Google Maps

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c'
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
          animation: GoogleMapsAnimation.DROP
        });
        marker.showInfoWindow();
      })
      .catch(err => {
        this.util.createToast(err);
      });
  }

  setStores(stores) {
    this.stores = stores;
  }

  setRestaurantMarkers() {
    this.stores.forEach(store => {
      let latLng: string[];
      console.log(store.location);
      try {
        latLng = store.location.split(',');
      } catch (error) {

      }
      if (this.map != undefined && latLng != undefined) {
        const marker: Marker = this.map.addMarkerSync({
          icon: 'assets/icon/marker.png',
          label: store.name,
          position: {
            lat: +latLng[0],
            lng: +latLng[1]
          },
          animation: GoogleMapsAnimation.BOUNCE
        });
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showHotelMenu(store.regNo);
        });
      }
    });
  }

  showHotelMenu(storeId) {
    this.navCtrl.navigateForward('/hotel-menu/' + storeId);
  }


  decodeLatLongByPlaceId(placeId) {
    this.map.remove();
    this.locationService.geocodeAddress(placeId).then(latlon => {
      console.log(latlon);
      Environment.setEnv({
        API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c',
        API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c'
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
      this.map = GoogleMaps.create('map_canvas', mapOptions);
      const marker: Marker = this.map.addMarkerSync({
        icon: 'red',
        animation: 'bounce',
        position: {
          lat: latlon[0],
          lng: latlon[1]
        }
      });
      this.setRestaurantMarkers();
    });
  }

}
