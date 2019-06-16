import { ProfileEditComponent } from './../../components/profile-edit/profile-edit.component';
import { CustomerDTO } from './../../api/models/customer-dto';
import { FavouriteService, Favourite } from './../../services/favourite/favourite.service';
import { ToastController, AlertController, NavController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Order, Product } from 'src/app/api/models';
import { Loading } from 'src/app/components/loading';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentSubPage = 'history';
  profile: any = {};
  stores: any = {};
  maximumPage;
  currentOrderPageNumber = 0;
  showFavourite = false;

  favourites: Favourite[] = [];

  orders: Order[] = [];
  customer: CustomerDTO = {};

  loadingElement: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('profileImage') profileImage: ElementRef;

  segmentChanged(ev: any) {
    this.showFavourite = !this.showFavourite;
  }

  constructor(private oauthService: OAuthService,
    private queryResourceService: QueryResourceService,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private navController: NavController,
    private favourite: FavouriteService,
    private loading: Loading) { }

  ngOnInit() {

    this.loading.createLoader()
      .then(data => {
        this.loadingElement = data;
        this.loadingElement.present();
        this.favourite.getFavourites()
          .subscribe(data => {
            console.log(data);
            if (data != null) {
              this.favourites = data;
            }
          });

        this.oauthService.loadUserProfile().then((user: any) => {
          this.profile = user;
          this.queryResourceService.findCustomerByReferenceUsingGET(this.profile.preferred_username)
            .subscribe(customer => {
              console.log(customer);
              this.customer = customer;
              this.setBackground(customer);
            });
          this.queryResourceService.findOrdersByCustomerIdUsingGET({
            customerId: this.profile.preferred_username,
            page: 0
          })
            .subscribe(orders => {
              this.loadingElement.dismiss();
              if (orders.content.length > 0) {
                this.orders = orders.content;
                console.log('No orders', this.orders.length);
              }
              this.maximumPage = orders.totalPages;
              this.orders.forEach(order => {
                if (order.orderId != null) {
                  this.queryResourceService.findStoreByRegisterNumberUsingGET(order.storeId)
                    .subscribe(store => {
                      this.stores[order.storeId] = store;
                    });
                }
              });
            },
              err => {
                this.loadingElement.dismiss();
              });
          console.log(user);
        });
      });


  }

  setBackground(customer) {
    if(customer.photo != null) {
      var img = "url('data:" +  customer.photoContentType + ";base64," + customer.photo + "')";
      this.profileImage.nativeElement.style.backgroundImage = img;
      this.profileImage.nativeElement.style.display="block";
    } else {
      this.profileImage.nativeElement.style.display="hidden";
    }
  }

  async edit() {
    const modal = await this.modalController.create({
      component: ProfileEditComponent,
      componentProps: { profileKeycloak: this.profile }
    });

    modal.onDidDismiss()
      .then((data: any) => {
        this.customer = data.data.customer;
        this.setBackground(data.data.customer);
      });

    modal.present();
  }

  loadMoreOrders(event) {
    console.log('Load more');
    this.currentOrderPageNumber = this.currentOrderPageNumber + 1;
    this.queryResourceService.findOrdersByCustomerIdUsingGET({
      customerId: this.profile.preferred_username,
      page: this.currentOrderPageNumber,
      size: 2
    })
      .subscribe(orders => {
        if (orders.content.length > 0) {
          console.log('Getting orders', orders);
          orders.content.forEach(order => {
            this.orders.push(order);
          });
        }
      });
    if (this.currentOrderPageNumber === this.maximumPage) {
      console.log('maximum reached');
      this.infiniteScroll.disabled = true;
      this.infiniteScroll.complete();
    }
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

  route(favourite: Favourite) {
    var routeURL = favourite.route + "#" + favourite.data.id;
    this.navController.navigateForward(routeURL)
  }

  removeFavourite(fav) {
    this.favourite.removeFromFavorite(fav.data , fav.type);
  }

}
