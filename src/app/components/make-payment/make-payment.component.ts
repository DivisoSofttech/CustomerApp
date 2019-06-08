import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit, Input } from '@angular/core';
import { TicketLineDTO, SaleDTO, StockDiaryDTO, OrderAddressDTO, OrderAddress, OrderLine } from 'src/app/api/models';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { CommandResourceService, OrderCommandResourceService, QueryResourceService } from 'src/app/api/services';
import { CartService } from 'src/app/services/cart.service';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { PaymentSuccessfullInfoComponent } from '../payment-successfull-info/payment-successfull-info.component';


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


  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private toastController: ToastController,
    private orderCommandResource: OrderCommandResourceService,
    private payPal: PayPal
  ) { }

  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() {

  }

  returnToSale() {
    this.navController.navigateRoot('/tabs/home');
  }


  save() {

  }

  makePayment(type: string, ref, status: string) {
    this.orderCommandResource.createPaymentUsingPOST({ orderId: this.orderId, paymentDTO: { amount: this.toBePaid, paymentType: type, ref: ref, status: status, tax: 0, total: this.toBePaid }, taskId: this.taskId })
      .subscribe(result => {
        console.log('Payment Success with the result ' + result);
        this.toastView();
        this.presentModal();
      },
        er => {
          console.log('there is an error comleting your payment ');
        }
      );
  }

  payViaCashOnDelivery() {

    console.log('Payment done via COD');
    this.makePayment('COD', '', 'success');
  }

  payViaNetBanking() {

    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AQ1oQup1GH_ihZOolhFZX2f_hdsD1K-t5MJ99of_6390pyaB7b-aO33GxUqqe2kz7G4EkNitDXoCN2it'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.toBePaid, 'INR', 'Order placed', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(res=> {
          
          
          this.makePayment('NETBANKING',res.response.id,'sucess');
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });




  }

  async toastView() {
    const toast = await this.toastController.create({
      message: 'Thank you for shopping',
      cssClass: 'toast',
      duration: 2000
    });
    toast.present();
  }

  async presentModal() {
    this.dismiss();
    const modal = await this.modalController.create({
      component: PaymentSuccessfullInfoComponent,
      componentProps: {
        total: this.toBePaid
      }
    });

    return await modal.present();
  }

}
