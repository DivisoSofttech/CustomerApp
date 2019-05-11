import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {

  username = '';
  password = '';
  constructor(private modalController: ModalController,
              private navController: NavController,
              private oauthService: OAuthService,
              private navCtrl: NavController,
              private toastController: ToastController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  login() {
    console.log('in login' + this.username + ' password is ' + this.password);
    this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.username, this.password, new HttpHeaders()).then(() => {
      const claims = this.oauthService.getIdentityClaims();
      if (claims) { console.log(claims); }
      if (this.oauthService.hasValidAccessToken()) {
        this.navCtrl.navigateRoot('/tabs/profile');
        this.dismiss();
      }
    }).catch((err: HttpErrorResponse) => {
      this.presentToast(err.error.error_description);
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }

  disabled(): boolean {
    if (this.username === '' || this.password === '') {
      return true;
    } else {
      return false;
    }
  }
}
