import { Component, OnInit, Input } from '@angular/core';
import { store } from '@angular/core/src/render3';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { ModalController } from '@ionic/angular';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {

  @Input() profile;

  @Input() store;

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async edit() {
    const modal = await this.modalController.create({
      component: ProfileEditComponent,
      componentProps: {profileKeycloak: this.profile}
    })

    modal.present();
  }

}
