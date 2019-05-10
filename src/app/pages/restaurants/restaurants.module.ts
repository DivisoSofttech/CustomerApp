import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FilterComponent } from './../../components/filter/filter.component';
import { RestaurantsPage } from './restaurants.page';
import { ComponentsModule } from './../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RestaurantsPage }])
  ],
  providers: [Geolocation, NativeGeocoder],
  declarations: [RestaurantsPage],
  entryComponents : [FilterComponent]
})
export class RestaurantsPageModule {}
