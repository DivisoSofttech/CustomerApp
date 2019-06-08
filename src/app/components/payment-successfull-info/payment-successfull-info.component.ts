import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-successfull-info',
  templateUrl: './payment-successfull-info.component.html',
  styleUrls: ['./payment-successfull-info.component.scss'],
})
export class PaymentSuccessfullInfoComponent implements OnInit {

  total;


  constructor(private modalController:ModalController) { }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
