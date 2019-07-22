import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Platform, ToastController, NavController, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthConfig } from 'angular-oauth2-oidc/auth.config';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { UserStatusService } from './services/user-status.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  enableSidePane = false;
  private subscriptionCart: Subscription;
  private subscriptionUserStatus: Subscription;
  cartSize;
  loggedIn = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private navController: NavController,
    private cartService: CartService,
    private oauthService: OAuthService,
    private toastController: ToastController,
    private userStatusService: UserStatusService
  ) {
    this.initializeApp();
    this.enableSidePane = this.platform.width() >= 640 ? true : false;
  }

  ngOnInit() {
    this.subscriptionCart = this.cartService.observableTickets.subscribe(
      orderLines => (this.cartSize = orderLines.length)
    );
    this.userStatusService.observableStatus.subscribe(
      loggedIn => (this.loggedIn = loggedIn)
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#d7d8da');
      this.splashScreen.hide();
    });
  }

  async presentToastLogout() {
    const toast = await this.toastController.create({
      message: 'You\'ve been successfully logout',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast'
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'LOGOUT',
      message: 'Do you really wish to logout?',
      buttons: [
        {
          text: 'Cancel',
        }, {
          text: 'Okay',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.oauthService.logOut();
    this.presentToastLogout();
    this.navController.navigateRoot('tabs/home');
  }
}
