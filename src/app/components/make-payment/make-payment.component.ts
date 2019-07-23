import { Component, OnInit, Input } from '@angular/core';
import { OrderLine } from 'src/app/api/models';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { ProcessPaymentComponent } from '../process-payment/process-payment.component';


@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit {

  @Input()  
  orderLines: OrderLine[] = [];
  @Input()
  toBePaid;
  @Input()
  customerId: number;
  orderId;
  taskId;
  paymentMethod;

  constructor(
    private modalController: ModalController,
    private navController: NavController
  ) { }

  dismiss() {
    this.modalController.dismiss();
  }
  

  async presentModal() {
    this.dismiss();
    const modal = await this.modalController.create({
      component: ProcessPaymentComponent,
      componentProps: {
        toBePaid: this.toBePaid,
        taskId:this.taskId,
        paymentMethod:this.paymentMethod,
        orderId:this.orderId
      }
    });
  
    return await modal.present();
  }
  ngOnInit() {}

  returnToSale() {
    this.navController.navigateRoot('/tabs/home');
  }

  



}
