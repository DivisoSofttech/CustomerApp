import { RatingComponent } from './../../components/rating/rating.component';
import { HotelMenuPopoverComponent } from './../../components/hotel-menu-popover/hotel-menu-popover.component';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HotelMenuPage } from './hotel-menu-page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: HotelMenuPage }])
  ],
  declarations: [HotelMenuPage],
  entryComponents:[HotelMenuPopoverComponent, RatingComponent]
})
export class HotelMenuPageModule {}
