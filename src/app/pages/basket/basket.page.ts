import { OAuthService } from 'angular-oauth2-oidc';
import { MakePaymentComponent } from './../../components/make-payment/make-payment.component';
import { ProductQuantityModalComponent } from 'src/app/components/product-quantity-modal/product-quantity-modal.component';
import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { TicketLineDTO, ProductDTO, Customer } from 'src/app/api/models';
import { CartService } from 'src/app/services/cart.service';
import { QueryResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss']
})
export class BasketPage {
  ticketLines: TicketLineDTO[] = [];
  products: ProductDTO[] = [];
  customer: Customer;
  user: any = {};
  total = 0;
  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private authService: OAuthService,
    private queryResourceService: QueryResourceService
  ) {}

  ionViewWillEnter() {
    this.ticketLines = this.cartService.ticketLines;
    this.authService.loadUserProfile().then(user => {
      this.user = user;
      const param: QueryResourceService.FindCustomerByNameUsingGETParams = {name: this.user.preferred_username};
      this.queryResourceService.findCustomerByNameUsingGET(param).subscribe(res => {
        this.customer = res.content[0];
      });
    });
    this.setTotal();
  }

  setTotal() {
    this.total = 0;
    this.ticketLines.forEach(ticket => {
      this.total += ticket.total;
      this.queryResourceService.findProductUsingGET(ticket.productId).subscribe(
        result => {
          this.products.push(result);
          console.log(result);
        },
        err => {
          console.log('error');
        }
      );
    });
  }

  async checkout() {
    const modal = await this.modalController.create({
      component: MakePaymentComponent,
      componentProps: {
        ticketLines: this.ticketLines,
        toBePaid: this.total,
        customerId: this.customer.id,
      }
    });
    return await modal.present();
  }

  async productQuantity(ticket: TicketLineDTO) {
    const modal = await this.modalController.create({
      component: ProductQuantityModalComponent,
      componentProps: { quantity: ticket.quantity }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    ticket.quantity = data.quantity;
    ticket.total = ticket.price * ticket.quantity;
    if (ticket.quantity === 0) {
      this.ticketLines.splice(this.ticketLines.indexOf(ticket), 1);
    }
    this.setTotal();
  }

  getProduct(ticket: TicketLineDTO): ProductDTO {
    return this.products[this.ticketLines.indexOf(ticket)];
  }

  clearCart() {
    this.ticketLines = [];
    this.cartService.emptyCart();
  }

  removeTicket(index) {
    this.cartService.removeTicket(index);
    console.log(this.ticketLines.length);
    this.products.splice(index, 1);
  }
}
