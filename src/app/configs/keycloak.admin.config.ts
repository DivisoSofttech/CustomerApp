import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable()
export class KeycloakAdminConfig {


    kcAdminClient: KeycloakAdminClient;

    constructor() {
      this.kcAdminClient = new KeycloakAdminClient();
      this.kcAdminClient.setConfig({
        baseUrl: 'http://35.196.86.249:8080/auth'
      });
      this.configureKeycloakAdmin();
    }

    configureKeycloakAdmin() {
      this.kcAdminClient.auth({
        username: 'admin',
        password: 'karma123',
        grantType: 'password',
        clientId: 'admin-cli',
      });
    }
}

