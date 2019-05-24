import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit, Input } from '@angular/core';
import { TicketLineDTO, SaleDTO, StockDiaryDTO , OrderAddressDTO } from 'src/app/api/models';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { CommandResourceService, OrderCommandResourceService, QueryResourceService } from 'src/app/api/services';
import { CartService } from 'src/app/services/cart.service';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';


@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
})
export class MakePaymentComponent implements OnInit {

  @Input()
  ticketLines: TicketLineDTO[] = [];
  @Input()
  toBePaid;
  @Input()
  customerId: number;
  cashRecieved;
  sale: SaleDTO = {};
  addresses: OrderAddressDTO[] = [];

  selectedAddress: OrderAddressDTO;

  constructor(
    private modalController: ModalController,
    private commandResourceService: CommandResourceService,
    private queryResourceService: QueryResourceService,
    private oauthService: OAuthService,
    private orderCommandResourceService: OrderCommandResourceService,
    private navController: NavController,
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.cashRecieved = this.toBePaid;
    this.sale.customerId = this.customerId;
    this.sale.grandTotal = this.toBePaid;
    this.getCurrentAddresses();
  }

  returnToSale() {
    this.navController.navigateRoot('/tabs/home');
  }

  selectAddress(address: any) {
    if(this.selectedAddress === address) {
      this.selectAddress = undefined;
    } else {
      this.selectedAddress = address;
    }
  }

  getCurrentAddresses() {
    this.oauthService.loadUserProfile()
    .then((user: any) => {
      console.log(user);
      this.orderCommandResourceService.getAllSavedAddressUsingGET(user.preferred_username)
      .subscribe(addresses => {
        console.log('Got Addresses ' , addresses);
        this.addresses = addresses;
      });
    });
  }


  async addAddressModal() {
    const modal = await this.modalController.create({
      component: AddAddressModalComponent,
    });

    modal.onDidDismiss()
    .then(() => {
      this.getCurrentAddresses();
    });

    modal.present();
  }

  save() {
    // if (this.cashRecieved >= this.toBePaid) {
    //   this.commandResourceService
    //     .createSaleUsingPOST(this.sale)
    //     .subscribe(success => {
    //       console.log(success);
    //       this.sale = success;
    //       this.ticketLines.forEach(ticket => {
    //         ticket.saleId = this.sale.id;
    //         this.commandResourceService
    //           .createTickerLineUsingPOST(ticket)
    //           .subscribe(res => {
    //             ticket = res;
    //             const stockDiary: StockDiaryDTO = {};
    //             // stockDiary.dateOfCreation = '' + new Date();
    //             stockDiary.isBuy = false;
    //             stockDiary.units = -1 * ticket.quantity;
    //             stockDiary.price = ticket.price;
    //             stockDiary.productId = ticket.productId;
    //             this.commandResourceService
    //               .createStockOfProductUsingPOST(stockDiary)
    //               .subscribe(result => {
    //                 console.log(result);
    //               });
    //           });
    //       });
    //       this.returnToSale();
    //       this.cartService.emptyCart();
    //       this.toastView();
    //       this.dismiss();
    //     });
    // }
  }

  async toastView() {
    const toast = await this.toastController.create({
      message: 'Thank you for shopping',
      cssClass: 'toast',
      duration: 2000
    });
    toast.present();
  }

}
