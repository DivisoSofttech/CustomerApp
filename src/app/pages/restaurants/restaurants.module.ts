import { ArrayFormaterPipe } from './../../pipes/array-formater.pipe';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { RatingComponent } from './../../components/rating/rating.component';
import { IonicRatingModule } from 'ionic-rating';
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
import { ErrorComponent } from 'src/app/components/error/error.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RestaurantsPage }])
  ],
  providers: [Geolocation, NativeGeocoder],
  declarations: [RestaurantsPage , ArrayFormaterPipe],
  entryComponents : [FilterComponent, RatingComponent, NotificationsComponent,ErrorComponent]
})
export class RestaurantsPageModule {}
