import { Customer } from './../../api/models/customer';
import { OAuthService } from 'angular-oauth2-oidc';
import { MakePaymentComponent } from './../../components/make-payment/make-payment.component';
import { ProductQuantityModalComponent } from 'src/app/components/product-quantity-modal/product-quantity-modal.component';
import { ModalController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { TicketLineDTO, ProductDTO, OrderLine, Order } from 'src/app/api/models';
import { CartService } from 'src/app/services/cart.service';
import { QueryResourceService, OrderCommandResourceService } from 'src/app/api/services';
import { DeliveryInfoComponent } from 'src/app/components/delivery-info/delivery-info.component';
import { ORDERLINES } from '../../mock-orderlines';
import { PRODUCTS } from '../../mock-products';
import { PaymentSuccessfullInfoComponent } from 'src/app/components/payment-successfull-info/payment-successfull-info.component';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss']
})
export class BasketPage {
  orderLines: OrderLine[] = [];
  products: ProductDTO[] = [];
  customer: Customer;
  nextTaskId;
  selfId;
  grandTotal: number;

  user: any = {};
  total = 0;
  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private toastController: ToastController,
    private authService: OAuthService,
    private queryResourceService: QueryResourceService,
    private orderCommandResource: OrderCommandResourceService
  ) { }

  ionViewWillEnter() {
    this.orderLines = this.cartService.orderLines;
    this.products = [];
    this.authService.loadUserProfile().then(user => {
      this.user = user;
      this.queryResourceService.findCustomerByReferenceUsingGET(this.user.preferred_username ).subscribe(res => {
        this.customer = res;
      }, err => {
        this.presentToast('Error connecting to server');
      });
    });
    this.setTotal();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }

  setTotal() {
    this.total = 0;
    this.orderLines.forEach(orderLine => {
      this.total += orderLine.total;
      this.queryResourceService.findProductUsingGET(orderLine.productId).subscribe(
        result => {
          this.products.push(result);
          console.log(result);
        },
        err => {
          this.presentToast('Error connecting to server');
        }
      );

    });
  }

  checkout() {
    let grandTotal = 0;
    this.orderLines.forEach(orderLine => {
      grandTotal += orderLine.pricePerUnit * orderLine.quantity;
    });
    this.grandTotal = grandTotal;
    const order: Order = {
      customerId: this.customer.name,
      orderLines: this.orderLines,
      grandTotal: this.grandTotal,
      storeId: this.cartService.storeId
      // storeId: 'whitesand'
    }
    this.orderCommandResource.initiateOrderUsingPOST(order).subscribe(result => {
      this.nextTaskId = result.nextTaskId
      this.selfId = result.selfId
      console.log('Next Task Id is ' + this.nextTaskId);
      console.log('Self id is ' + this.selfId);
      if (this.nextTaskId != undefined) {
        this.presentModal();
      }
    }, err => {
      this.presentToast('Error connecting to server');
    });
    console.log('Next id outside subscibe is ' + this.nextTaskId);
  }

  // For Testing lasat Page PaymentSuccessfullInfo
  // Remove After Testing
  async presentModalTest() {
    const modal = await this.modalController.create({
      component: PaymentSuccessfullInfoComponent,
      componentProps: {
        total: 2000
      }
    });

    return await modal.present();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: DeliveryInfoComponent,
      componentProps: {
        orderLines: this.orderLines,
        customerId: this.customer.name,
        taskId: this.nextTaskId,
        orderId: this.selfId,
        grandTotal: this.grandTotal
      }
    });
    return await modal.present();
  }

  async productQuantity(orderLine: OrderLine) {
    const modal = await this.modalController.create({
      component: ProductQuantityModalComponent,
      componentProps: { quantity: orderLine.quantity }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    orderLine.quantity = data.quantity;
    orderLine.total = orderLine.pricePerUnit * orderLine.quantity;
    if (orderLine.quantity === 0) {
      this.orderLines.splice(this.orderLines.indexOf(orderLine), 1);
    }
    this.setTotal();
  }

  getProduct(ticket: TicketLineDTO): ProductDTO {
    return this.products[this.orderLines.indexOf(ticket)];
  }

  clearCart() {
    this.orderLines = [];
    this.cartService.emptyCart();
  }

  removeTicket(index) {
    this.cartService.removeTicket(index);
    console.log(this.orderLines.length);
    this.products.splice(index, 1);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
