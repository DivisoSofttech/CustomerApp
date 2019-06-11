import { MakePaymentComponent } from './../make-payment/make-payment.component';
import { OrderDeliveryInfo } from './../../api/models/order-delivery-info';
import { ModalController, ToastController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { OrderAddressDTO, OrderAddress, OrderLine } from 'src/app/api/models';
import { OrderCommandResourceService } from 'src/app/api/services';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { Loading } from '../loading';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.scss'],
})
export class DeliveryInfoComponent implements OnInit {


  // Delete this later
  tmpAddress: OrderAddress = {};

  orderLines: OrderLine[] = [];
  addresses: OrderAddress[] = [];
  customerId;
  taskId;
  orderId;
  selectedAddressId:number;
  deliveryType;
  expectedDelivery;
  grandTotal:number;
  deliveryCharges:number;
  total:number;
  loading: HTMLIonLoadingElement;
  constructor(private oauthService: OAuthService, private modalController: ModalController, 
    private orderCommandService: OrderCommandResourceService,
    private loadingCreator: Loading,
    private toastController: ToastController) { }



  collectDeliveryInfo() {
    this.deliveryCharges=50;
    const deliveryDetails: OrderDeliveryInfo = {
      deliveryCharge: 50,
      deliveryType: this.deliveryType,
      deliveryAddress: { 'id': this.tmpAddress.id, 'phone': this.tmpAddress.phone }
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

    let selectedAddress: OrderAddress;
    this.addresses.forEach(addr => {
      // if(addr.id == this.selectedAddressId) {
        console.log('Selected id' , this.selectedAddressId);
        if(true) {
          selectedAddress = addr;
          console.log(selectedAddress);
        }
    });
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

  checkForm() {
    if(this.tmpAddress.name != undefined && this.tmpAddress.phone && this.tmpAddress.houseNoOrBuildingName) {
      return false;
    } 
    return true;
  }

  getCurrentAddresses() {
    //this.oauthService.loadUserProfile()
      //.then((user: any) => {
        //console.log(user);
        this.loadingCreator.createLoader()
        .then(data => {
          this.loading = data;
          this.loading.present();
          this.orderCommandService.getAllSavedAddressUsingGET({ customerId: this.customerId })
          .subscribe(addresses => {
            console.log('Customer id is ' + this.customerId);
            console.log('Got Addresses ', addresses);
            this.addresses = addresses.content;
            this.loading.dismiss();
          },
          err => {
            this.loading.dismiss();
          });
        })
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
    var dt = new Date();
    dt.setMinutes( dt.getMinutes() + 35 );
    this.expectedDelivery = dt.getHours() + '.' + dt.getMinutes();
    this.getCurrentAddresses();
    console.log('Product total is '+this.grandTotal);
    this.total=this.grandTotal+50
    console.log('Total is '+this.total);
  }

}
