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
  customer: CustomerDTO = {};
  contact: ContactDTO;
  mobileNumber;

  defaultImage: string;

  kcAdminClient: KeycloakAdminClient;

  loadingElement: HTMLIonLoadingElement;

  constructor(
    private modalController: ModalController,
    private queryResourceService: QueryResourceService,
    private commandResourceService: CommandResourceService,
    private loading: Loading,
  ) {
    this.kcAdminClient = new KeycloakAdminClient();
    this.kcAdminClient.setConfig({
      baseUrl: 'http://35.196.86.249:8080/auth'
    });
    this.configureKeycloakAdmin();

  }


  ngOnInit() {
    this.loading.createLoader()
    .then(data => {
      this.loadingElement = data;
      this.loadingElement.present();
    })
    this.queryResourceService.findCustomerByReferenceUsingGET(this.profileKeycloak.preferred_username)
      .subscribe(customer => {
        console.log(customer);
        this.customer = customer;
        this.queryResourceService.findContactByIdUsingGET(this.customer.contactId)
          .subscribe(data => {
            this.loadingElement.dismiss();
            this.contact = data;
          },
          err => {
            this.loadingElement.dismiss();
          });
      }, 
      err => {
        this.loadingElement.dismiss();
      });
  }

  configureKeycloakAdmin() {
    this.kcAdminClient.auth({
      username: 'admin',
      password: 'karma123',
      grantType: 'password',
      clientId: 'admin-cli'
    });
  }

  dismiss() {
    this.modalController.dismiss(
      {
        customer: this.customer
      }
    );
  }


  async selectImage() {

    const modal = await this.modalController.create({
      component: ImageSelectorComponent,
      cssClass: 'half-height'
    });

    modal.onDidDismiss()
    .then(data => {
      this.customer.photo = data.data.imageBase64;
      this.customer.photoContentType = data.data.imageType;
    });

    return await modal.present();
  }


  update() {

    this.loading.createLoader()
    .then(data =>{
      this.loadingElement = data;
      this.loadingElement.present();
      this.kcAdminClient.users.update(
        {
          id: this.profileKeycloak.sub,
          realm: 'graeshoppe'
        },
        {
          firstName: this.customer.name.split(' ')[0],
          lastName: this.customer.name.split(' ')[0],
          email: this.profileKeycloak.email
        }
      )
        .then(() => {
          if (this.contact != null) {
            this.commandResourceService.updateContactUsingPUT(this.contact)
              .subscribe(contact => {
                console.log('Updated Contact ', contact)
                this.contact = contact;
                this.commandResourceService.updateCustomerUsingPUT(this.customer)
                .subscribe(data => {
                  this.customer = data;
                  this.loadingElement.dismiss();
                  this.dismiss();
                  console.log('Updated Customer', data);
                },
                err => { this.loadingElement.dismiss();});
              },
              err => { this.loadingElement.dismiss();});
            } else {
              this.loadingElement.dismiss();
            }
       });  
    })
  }

}
