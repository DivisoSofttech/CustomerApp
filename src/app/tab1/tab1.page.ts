import { FilterComponent } from './../components/filter/filter.component';
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private navCtrl : NavController,private modalController:ModalController){

  }
  showHotelMenu()
  {
    this.navCtrl.navigateForward("/hotel-menu");
  }
  async presentFilterModal()
  {
    const modal=await this.modalController.create({
      component : FilterComponent,
       cssClass : 'half-height',
      showBackdrop : true
    });
    return await modal.present();
  }
}
