import { ToastController, AlertController, NavController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  currentSubPage = 'history';
  profile: any = {};
  segmentChanged(ev: any) {
    this.currentSubPage = ev.detail.value;
  }
  constructor(private oauthService: OAuthService,
              private toastController: ToastController,
              private alertController: AlertController,
              private navController: NavController) { }

  ionViewWillEnter() {
    this.oauthService.loadUserProfile().then(user => {
      this.profile = user;
      console.log(user);
    });
  }
  edit(){

  }
  save(){

  }
  presentPopover(){

  }
  logout() {
    this.oauthService.logOut();
    this.presentToast('You\'ve been logged out');
    this.navController.navigateRoot('tabs/home');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
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

}
