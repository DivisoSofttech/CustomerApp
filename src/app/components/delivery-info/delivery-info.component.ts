import { MakePaymentComponent } from './../make-payment/make-payment.component';
import { OrderDeliveryInfo } from './../../api/models/order-delivery-info';
import { ModalController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { OrderAddressDTO, OrderAddress, OrderLine } from 'src/app/api/models';
import { OrderCommandResourceService } from 'src/app/api/services';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.scss'],
})
export class DeliveryInfoComponent implements OnInit {


  orderLines: OrderLine[] = [];
  addresses: OrderAddress[] = [];
  customerId;
  taskId;
  orderId;
  selectedAddress: OrderAddressDTO;
  deliveryType;
  expectedDelivery;
  grandTotal:number;
  deliveryCharges:number;
  constructor(private oauthService: OAuthService, private modalController: ModalController, private orderCommandService: OrderCommandResourceService) { }



  collectDeliveryInfo() {
    this.deliveryCharges=50;
    const deliveryDetails: OrderDeliveryInfo = {
      deliveryCharge: 50,
      deliveryType: this.deliveryType,
      deliveryAddress: { 'id': this.selectedAddress.id, 'phone': this.selectedAddress.phone }
    }
    console.log('Next Id in Delivery info '+this.taskId);
    console.log('Order Id in Delivery info '+this.orderId);
    console.log('Delivery type is '+this.deliveryType);
    this.orderCommandService.collectDeliveryDetailsUsingPOST({ taskId: this.taskId, orderId: this.orderId, deliveryInfo: deliveryDetails })
      .subscribe(result => {
        console.log('Result is Next id deliveryinfo ' + result.nextTaskId);
        console.log('Self rel id  is '+result.selfId);
        this.taskId=result.nextTaskId;
        this.presentModal();
      },
        err => {
          console.log('Error performing collectDeliveryInfo ');
        }

      );
  }

  async presentModal(){
    this.dismiss();
    const modal = await this.modalController.create({
      component: MakePaymentComponent,
      componentProps: {
        orderLines: this.orderLines,
        taskId: this.taskId,
        orderId: this.orderId,
        toBePaid:this.grandTotal+this.deliveryCharges
      }
    });
    
    return await modal.present();
  }


  selectAddress(address: any) {
    if (this.selectedAddress === address) {
      this.selectAddress = undefined;
    } else {
      this.selectedAddress = address;
    }
  }

  getCurrentAddresses() {
    //this.oauthService.loadUserProfile()
      //.then((user: any) => {
        //console.log(user);
        this.orderCommandService.getAllSavedAddressUsingGET({ customerId: this.customerId })
          .subscribe(addresses => {
            console.log('Customer id is ' + this.customerId);
            console.log('Got Addresses ', addresses);
            this.addresses = addresses.content;
          });
      //});
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

  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.expectedDelivery = '35 Min';
    this.getCurrentAddresses();
  }

}
