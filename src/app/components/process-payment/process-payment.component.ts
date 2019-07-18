import { Component, OnInit } from '@angular/core';
import { OrderCommandResourceService, PaymentCommandResourceService } from 'src/app/api/services';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { PaymentSuccessfullInfoComponent } from '../payment-successfull-info/payment-successfull-info.component';
import { testUserAgent } from '@ionic/core';

declare var RazorpayCheckout;

@Component({
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.scss'],
})
export class ProcessPaymentComponent implements OnInit {


  toBePaid;
  paymentMethod;
  taskId;
  orderId;
  paymentId;
  state;


  constructor(private loadingCtrl: LoadingController, private paymentService: PaymentCommandResourceService, private orderCommandResource: OrderCommandResourceService, private modalCtrl: ModalController, private payPal: PayPal, private toastCtrl: ToastController) { }

  async presentLoadingWithOptions() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 2000,
      message: 'Please wait...',
      translucent: true
    });
    return await loading.present();
  }

  async presentLoadingRedirecting() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 3000,
      message: 'Redirecting...',
      translucent: true
    });
    return await loading.present();
  }

  makePayment(ref) {
    console.log('Payment reference is %%%%%%%%%%%%%%%%%%%%'+ref);
    this.orderCommandResource.createPaymentUsingPOST({ orderId: this.orderId, paymentDTO: { amount: this.toBePaid, paymentType: this.paymentMethod, ref: ref, status: 'success', tax: 0, total: this.toBePaid }, taskId: this.taskId })
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
    this.makePayment('123');
  }


  payWithRazorPay() {
    let intNumber = Math.trunc(this.toBePaid);
    let fractNumber = this.toBePaid % 1;
    let amount = intNumber * 100 + Math.round(fractNumber);
    console.log("Amount in paisa is " + amount + " int number is " + intNumber + " fract number is " + fractNumber);
    this.paymentService.createOrderUsingPOST({ amount: amount, currency: 'INR', payment_capture: 1, receipt: 'receipt12340' })
      .subscribe(response => {
        console.log("Response is orde id " + response.id);
        var options = {
          description: 'Graeshoppe Payment',
          currency: 'INR',
          key: 'rzp_test_nYbfvOn43G0awI',
          order_id: response.id,
          amount: amount,
          external: {
            wallets: ['paytm', 'citrus']
          },
          name: 'Graeshoppe',
          prefill: {
            email: 'pranav@razorpay.com',
            contact: '8879524924',
            name: 'Pranav Gupta',
            method: this.paymentMethod
          },
        }

        var successCallback = function (success, _this) {
          console.log('payment_id: ' + success.razorpay_payment_id);
          var orderId = success.razorpay_order_id
          var signature = success.razorpay_signature
          _this.paymentId = success.razorpay_payment_id;
          _this.state = success.razorpay_state;
          console.log("State is", success.razorpay_state);
          _this.makePayment(success.razorpay_payment_id);
          console.log('Payment id in callback function ' + _this.paymentId + ' status is ' + _this.state);
          _this.presentLoadingRedirecting();
          
        }


        var cancelCallback = function (error) {
          alert(error.description + ' (Error ' + error.code + ')')
        }   


        RazorpayCheckout.on('payment.success', (success) => {
          successCallback(success, this);

        })
        RazorpayCheckout.on('payment.cancel', cancelCallback)
        RazorpayCheckout.open(options)

      });

  }


  payWithPaypal() {
      console.log('In Paypal payment');
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AQ1oQup1GH_ihZOolhFZX2f_hdsD1K-t5MJ99of_6390pyaB7b-aO33GxUqqe2kz7G4EkNitDXoCN2it'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        console.log("In paypal payment 1");

        let payment = new PayPalPayment(this.toBePaid, 'EUR', 'Graeshoppe purchase', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(res => {
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SpayWithPaypalDK",
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
          console.log('Paypal payment id is '+res.response.id);
          this.makePayment(res.response.id);
        }, () => {
          console.log("Error or render dialog closed without being successful");

          // Error or render dialog closed without being successful
        });
      }, () => {
        console.log("Error in configuration");

        // Error in configuration
      });
    }, () => {
      console.log("Error in initialization, maybe PayPal isn't supported or something else")
      // Error in initialization, maybe PayPal isn't supported or something else
    });

    this.presentLoadingRedirecting();

  }



  

  async toastView() {
    const toast = await this.toastCtrl.create({
      message: 'Thank you for shopping',
      cssClass: 'toast',
      duration: 2000
    });
    toast.present();
  }

  async presentModal() {
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: PaymentSuccessfullInfoComponent,
      componentProps: {
        total: this.toBePaid,
        method: this.paymentMethod
      }
    });

    return await modal.present();
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    console.log("Payment method is " + this.paymentMethod);
    console.log("Amount is " + this.toBePaid);
    console.log("Task id is " + this.taskId);
    if (this.paymentMethod == "paypal") {
      console.log("Paypal Method")
      this.payWithPaypal();
    } else if (this.paymentMethod == "cod") {
      console.log("Cash on elivery option ");
      this.payViaCashOnDelivery();
    } else {
      this.presentLoadingWithOptions();
      console.log("Razorpay payment ");
      this.payWithRazorPay();
      console.log('Payment id is ' + this.paymentId);
      console.log('Payment status is ' + this.state);
    }
  }

}
