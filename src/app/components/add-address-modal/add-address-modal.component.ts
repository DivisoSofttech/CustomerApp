import { OrderAddressDTO } from 'src/app/api/models';
import { OAuthService } from 'angular-oauth2-oidc';
import { OrderCommandResourceService } from 'src/app/api/services';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-address-modal',
  templateUrl: './add-address-modal.component.html',
  styleUrls: ['./add-address-modal.component.scss'],
})
export class AddAddressModalComponent implements OnInit {

  address: OrderAddressDTO = {};
  @Input() customerId;

  constructor(
    private modalController: ModalController,
    private orderCommandResourceService: OrderCommandResourceService,
    private oauthService: OAuthService
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  saveAddress() {

    console.log(this.address);
    this.oauthService.loadUserProfile()
    .then((user: any) => {
      this.orderCommandResourceService.createAddressUsingPOST(
        {
          alternatePhone: this.address.alternatePhone,
          city: this.address.city,
          customerId: user.preferred_username,
          houseNoOrBuildingName: this.address.houseNoOrBuildingName,
          landmark: this.address.landmark,
          name: this.address.name,
          phone: this.address.phone,
          pincode: this.address.pincode,
          roadNameAreaOrStreet: this.address.roadNameAreaOrStreet,
          state: this.address.state
        }
      )
      .subscribe(address => {
        console.log('Address Saved' , address);
        this.modalController.dismiss();
      });
    })
  }

}
