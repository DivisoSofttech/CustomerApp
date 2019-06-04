import { MakePaymentComponent } from './../../components/make-payment/make-payment.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BasketPage } from './basket.page';
import { ProductQuantityModalComponent } from 'src/app/components/product-quantity-modal/product-quantity-modal.component';
import { DeliveryInfoComponent } from 'src/app/components/delivery-info/delivery-info.component';

const routes: Routes = [
  {
    path: '',
    component: BasketPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [BasketPage],
  entryComponents: [ProductQuantityModalComponent, DeliveryInfoComponent]
})
export class BasketPageModule {}
