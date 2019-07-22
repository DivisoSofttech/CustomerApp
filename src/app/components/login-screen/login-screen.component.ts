import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services/query-resource.service';
import { CommandResourceService } from 'src/app/api/services';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { Util } from 'src/app/services/util';
import { ApiConfiguration } from 'src/app/api/api-configuration';

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
  phone: number;
  @ViewChild('slides') slides: IonSlides;

  constructor(
    private keycloakService: KeycloakService,
    private queryResourceService: QueryResourceService,
    private commandResourceService: CommandResourceService,
    private util: Util,
    private apiConfiguration: ApiConfiguration
  ) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  // Login and Register Methods

  login() {
    this.util.createLoader().then(loader => {
      loader.present();
      this.keycloakService.authenticate(
        { username: this.username, password: this.password },
        () => {
          loader.dismiss();
          // Uncomment this later
          // this.createUserIfNotExists(this.username);
          // Remove this later
          this.util.navigateRoot();
        },
        () => {
          loader.dismiss();
          this.util.createToast('Invalid Username / Password');
        }
      );
    });
  }

  signup() {
    this.util.createLoader().then(loader => {
      loader.present();
      const user = { username: this.username, email: this.email };
      this.keycloakService.createAccount(
        user,
        this.password,
        res => {
          // Remove this later
          this.keycloakService.authenticate(
            { username: this.username, password: this.password },
            () => {
              this.commandResourceService
                .createCustomerUsingPOST({
                  reference: this.username,
                  name: this.username
                })
                .subscribe(
                  customer => {
                    console.log('Customer Created', customer);
                    loader.dismiss();
                    this.util.navigateRoot();
                  },
                  err => {
                    console.log(err);
                    loader.dismiss();
                    this.util.createToast('Server is Unreachable');
                  }
                );
            },
            () => {
              loader.dismiss();
              this.util.createToast('Invalid Username / Password');
            }
          );
          // Remove this later
        },
        err => {
          loader.dismiss();
          if (err.response.status === 409) {
            this.util.createToast('User Already Exists');
            this.slideChange();
          } else {
            this.util.createToast('Cannot Register User. Please Try Later');
          }
          console.log(err);
        }
      );
    });
  }

  isLoggedIn() {
    this.keycloakService
      .isAuthenticated()
      .then(() => {
        this.util.navigateRoot();
      })
      .catch(() => {
        console.log('Not Logged In');
      });
  }

  createUserIfNotExists(reference) {
    this.util.createLoader().then(loader => {
      loader.present();
      this.queryResourceService
        .findCustomerByReferenceUsingGET(reference)
        .subscribe(
          customer => {
            console.log('Got Customer', customer);
            loader.dismiss();
            this.util.navigateRoot();
          },
          err => {
            if (err.status === 500) {
              // Check if server is reachable
              const url = this.apiConfiguration.rootUrl.slice(
                2,
                this.apiConfiguration.rootUrl.length
              );
              this.commandResourceService
                .createCustomerUsingPOST({
                  reference: this.username,
                  name: this.username
                })
                .subscribe(
                  customer => {
                    console.log('Customer Created', customer);
                    loader.dismiss();
                    this.util.navigateRoot();
                  },
                  eror => {
                    console.log(eror);
                    loader.dismiss();
                    this.util.createToast('Server is Unreachable');
                  }
                );
            }
          }
        );
    });
  }

  // View Related Methods

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
}
