import { LoginScreenComponent } from './login-screen/login-screen.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelMenuPopoverComponent } from './hotel-menu-popover/hotel-menu-popover.component';
import { IonicModule } from '@ionic/angular';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
                  HotelMenuPopoverComponent,
                  FilterComponent,
                  LoginScreenComponent
                ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  exports:  [
              HotelMenuPopoverComponent,
              FilterComponent,
              LoginScreenComponent
            ]
})
export class ComponentsModule { }
