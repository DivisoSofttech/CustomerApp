import { UserStatusService } from './../user-status.service';
import { NavController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private oauthService: OAuthService,
              private router: Router,
              private navController: NavController,
              private userStatusService: UserStatusService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      this.userStatusService.setstatusTrue();
      return true;
    }
    this.userStatusService.setstatusFalse();
    this.navController.navigateRoot('/login');
    return false;
  }
}
