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


  orderLines:OrderLine[]=[];
  addresses: OrderAddress[] = [];
  customerId;
  taskId;
  orderId;
  selectedAddress: OrderAddressDTO;
  constructor(private oauthService: OAuthService, private modalController: ModalController, private orderCommandService: OrderCommandResourceService) { }


  selectAddress(address: any) {
    if (this.selectedAddress === address) {
      this.selectAddress = undefined;
    } else {
      this.selectedAddress = address;
    }
  }

  getCurrentAddresses() {
    this.oauthService.loadUserProfile()
      .then((user: any) => {
        console.log(user);
        this.orderCommandService.getAllSavedAddressUsingGET({ customerId: user.preferred_username })
          .subscribe(addresses => {
            console.log('User is from loadprofile 2' + user.preferred_username);
            console.log('Got Addresses ', addresses);
            this.addresses = addresses.content;
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

  ngOnInit() { }

}
