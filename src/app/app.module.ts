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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMiG49LE8jalJZrgYTKcauhhSGkZHfUcw',
      libraries: ['places', 'geometry']
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
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
    SearchHistoryService,
    LocationService,
    FilterService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
