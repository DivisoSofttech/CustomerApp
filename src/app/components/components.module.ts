
import { FooterComponent } from './footer/footer.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddAddressModalComponent } from './add-address-modal/add-address-modal.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { ProductQuantityModalComponent } from './product-quantity-modal/product-quantity-modal.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelMenuPopoverComponent } from './hotel-menu-popover/hotel-menu-popover.component';
import { IonicModule } from '@ionic/angular';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import {PaymentSuccessfullInfoComponent} from './payment-successfull-info/payment-successfull-info.component'
import { Loading } from './loading';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { Camera } from '@ionic-native/camera/ngx';
import { ImageSelectorComponent } from './image-selector/image-selector.component';

@NgModule({
  declarations: [
                  HotelMenuPopoverComponent,
                  FilterComponent,
                  LoginScreenComponent,
                  RatingComponent,
                  ProductQuantityModalComponent,
                  MakePaymentComponent,
                  AddAddressModalComponent,
                  DeliveryInfoComponent,
                  NotificationsComponent,
                  PaymentSuccessfullInfoComponent,
                  FooterComponent,
                  ProfileDetailsComponent,
                  ProfileEditComponent,
                  ImageSelectorComponent
                ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  providers: [
    Loading,
    Camera
  ],
  exports:  [
              HotelMenuPopoverComponent,
              FilterComponent,
              LoginScreenComponent,
              RatingComponent,
              ProductQuantityModalComponent,
              MakePaymentComponent,
              AddAddressModalComponent,
              NotificationsComponent,
              DeliveryInfoComponent,
              PaymentSuccessfullInfoComponent,
              FooterComponent,
              ProfileDetailsComponent,
              ProfileEditComponent,
              ImageSelectorComponent
            ],
  entryComponents: [
              AddAddressModalComponent,MakePaymentComponent,PaymentSuccessfullInfoComponent,FooterComponent,
              ProfileEditComponent,
              ImageSelectorComponent
            ]
})
export class ComponentsModule { }
