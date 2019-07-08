import { ProfileEditComponent } from './../../components/profile-edit/profile-edit.component';
import { CustomerDTO } from './../../api/models/customer-dto';
import { FavouriteService, Favourite } from './../../services/favourite/favourite.service';
import { ToastController, AlertController, NavController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Order, Product, Stock, StockCurrent } from 'src/app/api/models';
import { Loading } from 'src/app/components/loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  favouriteProductsID = [];
  currentSubPage = 'history';
  profile: any = {};
  stores: any = {};
  maximumPage;
  currentOrderPageNumber = 0;

  favourites: Favourite[] = [];
  frequentOrders: StockCurrent[] = [
    {
      product:{
        name:'Burger',
        reference:'abc',
        searchkey:'cba'
      },
      sellPrice: 10
    }
  ];
  orders: Order[] = [];
  customer: CustomerDTO = {};

  loadingElement: HTMLIonLoadingElement;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('profileImage') profileImage: ElementRef;

  segmentChanged(ev: any) {
    this.currentSubPage = ev.detail.value;
  }

  constructor(private oauthService: OAuthService,
              private queryResourceService: QueryResourceService,
              private toastController: ToastController,
              private alertController: AlertController,
              private modalController: ModalController,
              private navController: NavController,
              private favourite: FavouriteService,
              private router: Router,
              private loading: Loading) { }

  ngOnInit() {

    this.loading.createLoader()
      .then(res => {
        this.loadingElement = res;
        this.loadingElement.present();
        this.favourite.getFavourites()
          .subscribe(data => {
            console.log('favorrite',data);
            if (data != undefined) {
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
            }, err => {
              this.presentToast('Error connecting to server');
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
                    }, err => {
                      this.presentToast('Error connecting to server');
                    });
                }
              }, err => {
                this.presentToast('Error connecting to server');
              });
            },
              err => {
                this.presentToast('Error connecting to server');
                this.loadingElement.dismiss();
              });
          console.log(user);
        }, err => {
          this.presentToast('Error connecting to server');
        });
      });


  }

  ionViewDidEnter() {
    console.log(this.frequentOrders);
  }

  setBackground(customer) {
    if (customer.photo != null) {
      let img = 'url(\'data:' +  customer.photoContentType + ';base64,' + customer.photo + '\')';
      this.profileImage.nativeElement.style.backgroundImage = img;
      this.profileImage.nativeElement.style.display ='block';
    } else {
      this.profileImage.nativeElement.style.display ='hidden';
    }
  }

  async edit() {
    const modal = await this.modalController.create({
      component: ProfileEditComponent,
      componentProps: { profileKeycloak: this.profile}
    });

    modal.onDidDismiss()
      .then((data: any) => {
        try {
          this.customer = data.data.customer;
          this.setBackground(data.data.customer);            
        } catch (error) {
          
        }
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
    let routeURL = favourite.route + '#' + favourite.data.id;
    this.navController.navigateForward(routeURL);
  }

  addToFavourite(product) {
    console.log('adding to favourite', this.favouriteProductsID);
    this.favourite.addToFavouriteProduct(product, this.router.url.split('#')[0]);
    this.getFavourites();
  }

  removeFromFavourite(product) {
    this.favourite.removeFromFavorite(product.data, product.type);
    this.getFavourites();
  }

  getFavourites() {
    this.favouriteProductsID = this.favourite.getFavouriteProductsID();
    console.log(this.favouriteProductsID);
  }

  isFavourite(product: Product) {
    return this.favouriteProductsID.includes(product.id);
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
