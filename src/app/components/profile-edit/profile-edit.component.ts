import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { CustomerDTO, Customer, ContactDTO } from 'src/app/api/models';
import { QueryResourceService, CommandResourceService } from 'src/app/api/services';
import { Loading } from '../loading';
import { ImageSelectorComponent } from '../image-selector/image-selector.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {

  profileKeycloak;
  customer: CustomerDTO;
  contact: ContactDTO;
  mobileNumber;

  image: string;
  imageContentType: string;

  defaultImage: string;

  kcAdminClient: KeycloakAdminClient;

  constructor(
    private modalController: ModalController,
    private queryResourceService: QueryResourceService,
    private commandResourceService: CommandResourceService,
    private loading: Loading,
  ) {
    this.kcAdminClient = new KeycloakAdminClient();
    this.kcAdminClient.setConfig({
      baseUrl: 'http://35.237.193.86:8080/auth'
    });
    this.configureKeycloakAdmin();

  }


  ngOnInit() {
    this.queryResourceService.findCustomerByNameUsingGET({
      name: this.profileKeycloak.preferred_username
    })
      .subscribe(customer => {
        this.customer = customer;
        this.queryResourceService.findContactByIdUsingGET(this.customer.contactId)
          .subscribe(data => {
            this.contact = data;
          })
      });
  }

  configureKeycloakAdmin() {
    this.kcAdminClient.auth({
      username: 'admin',
      password: 'admin',
      grantType: 'password',
      clientId: 'admin-cli'
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async selectImage() {

    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });
    
    modal.onDidDismiss()
    .then(data => {
      this.image = data.data.imageBase64;
      this.imageContentType = data.data.imageType;
    });

    return await modal.present();
  }


  update() {

    this.kcAdminClient.users.update(
      {
        id: this.profileKeycloak.sub,
        realm: 'graeshoppe'
      },
      {
        firstName: this.profileKeycloak.name.split(' ')[0],
        lastName: this.profileKeycloak.name.split(' ')[1],
        email: this.profileKeycloak.email
      }
    )
      .then(() => {
        if (this.contact != null) {
          // Update Contact if exists
          this.commandResourceService.updateContactUsingPUT(this.contact)
            .subscribe(contact => {
              console.log('Updated Contact ', contact)
              this.commandResourceService.updateCustomerUsingPUT(this.customer)
              .subscribe(data => {
                console.log('Updated Customer', data);
              });  
            });
          }
     });
  }

}
