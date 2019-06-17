import { CustomerDTO } from './../../api/models/customer-dto';
import { CommandResourceService } from 'src/app/api/services';
import {
  ModalController,
  NavController,
  ToastController,
  IonSlides
} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  username = '';
  password = '';
  email = '';
  loginTab = true;
  value = 'login';
  kcAdminClient: KeycloakAdminClient;
  agreement: boolean;
  phone: number;
  @ViewChild('slides') slides: IonSlides;

  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private oauthService: OAuthService,
    private navCtrl: NavController,
    private queryResourceService: QueryResourceService,
    private commandResourceService: CommandResourceService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.agreement = false;
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
      clientId: 'admin-cli'
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

  loginDisabled(): boolean {
    if (this.username === '' || this.password === '') {
      return true;
    } else {
      return false;
    }
  }

  registerDisabled(): boolean {
    if (this.username === '' || this.password === '' || this.email === '') {
      return true;
    } else {
      return false;
    }
  }

  slide(value) {
    this.value = value.detail.value;
    if (this.value === 'login') {
      this.slides.slideTo(0);
    } else {
      this.slides.slideTo(1);
    }
  }

  slideChange() {
    let currentSlide;
    this.slides.getActiveIndex().then(num => {
      currentSlide = num;
      if (this.value === 'login' && currentSlide !== 0) {
        this.value = 'signup';
      } else if (this.value === 'signup' && currentSlide !== 1) {
        this.value = 'login';
      }
    });
  }

  setSlideValue(): number {
    this.slideChange();
    return 1;
  }

  dataChanged(agreement) {
    console.log('Old Agreement is ' + this.agreement);

    console.log('Agreement is ' + agreement);
    this.agreement = agreement;
  }



  login() {
    console.log('in login' + this.username + ' password is ' + this.password);
    this.oauthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(
        this.username,
        this.password,
        new HttpHeaders()
      )
      .then(() => {
        const claims = this.oauthService.getIdentityClaims();
        if (claims) {

          this.queryResourceService.findCustomerByReferenceUsingGET(this.username) 
          .subscribe(
            res => {
              this.presentToast('Login Successful');
            },
            err => {
              this.commandResourceService
                .createCustomerUsingPOST({
                  reference: this.username
                })
                .subscribe(data => {
                  console.log('User Created', data);
                  this.presentToast('Login Successful');
                });
            }
          );
        }
        if (this.oauthService.hasValidAccessToken()) {
          this.navCtrl.navigateRoot('/tabs/home');
        }
      })
      .catch((err: HttpErrorResponse) => {
        this.presentToast(err.error.error_description);
      });
  }

  signup() {
    const map = new Map([['phone', this.phone], ['value', 3]]);

    this.kcAdminClient.users
      .create({
        realm: 'graeshoppe',
        username: this.username,
        email: this.email,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: this.password
          }
        ],
        attributes: map
      })
      .then(res => {
        this.oauthService
          .fetchTokenUsingPasswordFlowAndLoadUserProfile(
            this.username,
            this.password,
            new HttpHeaders()
          )
          .then(
            () => {
              this.commandResourceService
                .createCustomerUsingPOST({
                  reference: this.username
                })
                .subscribe(data => {
                  console.log('User Created', data);
                  this.presentToast('Registration Successful');
                  this.navCtrl.navigateRoot('/tabs/home');
                });
            },
            err => {
              this.presentToast('Error Registering User');
            }
          );
      });
  }
}
