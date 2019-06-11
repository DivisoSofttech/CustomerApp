import { Component, OnInit, Input } from '@angular/core';
import { store } from '@angular/core/src/render3';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {

  @Input() profile;

  @Input() store;

  editMode = false;

  private keycloak: KeycloakAdminClient;

  constructor(
  ) { 
    this.keycloak = new KeycloakAdminClient();
  }

  ngOnInit() {}

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.editMode = false;
  }

  update() {
    this.keycloak.users.update(
      {
        id: this.profile.sub,
        realm: 'graeshoppe'
      },
      {
        firstName: this.profile.name.split(' ')[0],
        lastName: this.profile.name.split(' ')[1],
        email: this.profile.email
      }
    );
  }

}
