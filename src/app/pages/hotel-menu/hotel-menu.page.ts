import { HotelMenuPopoverComponent } from './../../components/hotel-menu-popover/hotel-menu-popover.component';
import { HotelMenuPageModule } from './hotel-menu.module';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-hotel-menu',
  templateUrl: './hotel-menu.page.html',
  styleUrls: ['./hotel-menu.page.scss'],
})
export class HotelMenuPage implements OnInit {

  constructor(private popoverController: PopoverController ) { }
  simple : boolean =true;
  ngOnInit() {
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: HotelMenuPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
