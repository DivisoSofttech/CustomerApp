import { HotelMenuPopoverComponent } from './../../components/hotel-menu-popover/hotel-menu-popover.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// import { IonicRatingModule } from 'ionic-rating';
import { HotelMenuPage } from './hotel-menu.page';

const routes: Routes = [
  {
    path: '',
    component: HotelMenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // IonicRatingModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HotelMenuPage],
  entryComponents:[HotelMenuPopoverComponent]
})
export class HotelMenuPageModule {}
