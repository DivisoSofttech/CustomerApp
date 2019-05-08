import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelMenuPopoverComponent } from './hotel-menu-popover/hotel-menu-popover.component';
import { IonicModule } from '@ionic/angular';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [HotelMenuPopoverComponent,FilterComponent],
  imports: [
    CommonModule,IonicModule.forRoot()

  ],exports:[HotelMenuPopoverComponent,FilterComponent]
})
export class ComponentsModule { }
