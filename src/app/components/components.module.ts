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
                  PaymentSuccessfullInfoComponent
                ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
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
              PaymentSuccessfullInfoComponent
            ],
  entryComponents: [
              AddAddressModalComponent,MakePaymentComponent,PaymentSuccessfullInfoComponent
            ]
})
export class ComponentsModule { }
