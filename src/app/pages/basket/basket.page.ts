import { Customer } from './../../api/models/customer';
import { OAuthService } from 'angular-oauth2-oidc';
import { MakePaymentComponent } from './../../components/make-payment/make-payment.component';
import { ProductQuantityModalComponent } from 'src/app/components/product-quantity-modal/product-quantity-modal.component';
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { TicketLineDTO, ProductDTO, OrderLine, Order } from 'src/app/api/models';
import { CartService } from 'src/app/services/cart.service';
import { QueryResourceService, OrderCommandResourceService } from 'src/app/api/services';
import { DeliveryInfoComponent } from 'src/app/components/delivery-info/delivery-info.component';
import {ORDERLINES} from '../../mock-orderlines';
import {PRODUCTS} from '../../mock-products';
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

  user: any = {};
  total = 0;
  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private authService: OAuthService,
    private queryResourceService: QueryResourceService,
    private orderCommandResource: OrderCommandResourceService
  ) { }

  ionViewWillEnter() {
    //this.orderLines = this.cartService.orderLines;
    this.orderLines=ORDERLINES;
    this.products=PRODUCTS;
    this.authService.loadUserProfile().then(user => {
      this.user = user;
      const param: QueryResourceService.FindCustomerByNameUsingGETParams = { name: this.user.preferred_username };
      this.queryResourceService.findCustomerByNameUsingGET(param).subscribe(res => {
        //this.customer = res.content[0];
        this.customer={'id':1,'name':'maya'};
      });
    });
    this.setTotal();
  }

  setTotal() {
    this.total = 0;
    this.orderLines.forEach(orderLine => {
      this.total += orderLine.total;
      // this.queryResourceService.findProductUsingGET(orderLine.productId).subscribe(
      //   result => {
      //     this.products.push(result);
      //     console.log(result);
      //   },
      //   err => {
      //     console.log('error');
      //   }
      // );
      this.products.forEach(product=>{
        if (product.id===orderLine.id){

        }
      })

    });
  }

  async checkout() {
    let grandTotal = 0;
    this.orderLines.forEach(orderLine => {
      grandTotal += orderLine.pricePerUnit * orderLine.quantity;
    })
    const order: Order = {
      customerId: this.customer.name,
      orderLines: this.orderLines,
      grandTotal: grandTotal,
      storeId: this.cartService.storeId
    }
    this.orderCommandResource.initiateOrderUsingPOST(order).subscribe(result => {
      this.nextTaskId = result.nextTaskId
      this.selfId = result.selfId
      console.log('Next Task Id is '+this.nextTaskId);
      console.log('Self id is '+this.selfId);
    })
    const modal = await this.modalController.create({
      component: DeliveryInfoComponent,
      componentProps: {
        orderLines: this.orderLines,
        customerId: this.customer.id,
        taskId:this.nextTaskId,
        orderId:this.selfId
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
}
