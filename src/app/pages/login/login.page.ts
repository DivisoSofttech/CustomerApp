import { OAuthService } from 'angular-oauth2-oidc';
import { LoginScreenComponent } from './../../components/login-screen/login-screen.component';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  constructor(private modalController: ModalController,
              private navController: NavController,
              private oauthService: OAuthService,
              private navCtrl: NavController,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  async showLoginPage() {
    const modal = await this.modalController.create({
      component: LoginScreenComponent
    });
    await modal.present();
  }

  navigateRoot() {
    this.navController.navigateRoot('/tabs');
  }
}
