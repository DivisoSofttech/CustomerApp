import { LoginScreenComponent } from './../../components/login-screen/login-screen.component';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async showLoginPage() {
    const modal = await this.modalController.create({
      component: LoginScreenComponent
    });
    await modal.present();
  }

}
