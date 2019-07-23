import { FilterComponent } from './components/filter/filter.component';
import { UserStatusService } from './services/user-status.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from './services/location-service.service';
import { FavouriteService } from './services/favourite/favourite.service';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthInterceptor } from './services/security/auth-interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PayPal } from '@ionic-native/paypal/ngx';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { IonicStorageModule } from '@ionic/storage';
import { SearchHistoryService } from './services/search-history-service';
import { CartService } from './services/cart.service';
import { FilterService } from './services/filter.service';

import {
  GoogleMapsAPIWrapper,
  AgmCoreModule,
} from '@agm/core';
import { ConfigsModule } from './configs/configs.module';
import { Util } from './services/util';
import { MapService } from './services/map/map.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [FilterComponent],
  imports: [

    ConfigsModule,

    ComponentsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c',
      libraries: ['places', 'geometry']
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
    Util,
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMapsAPIWrapper,
    FavouriteService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ComponentsModule,
    PayPal,
    CartService,
    UserStatusService,
    SearchHistoryService,
    LocationService,
    FilterService,
    MapService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
