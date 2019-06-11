import { ToastController, AlertController, NavController, IonInfiniteScroll } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';
import { Order } from 'src/app/api/models';
import { Loading } from 'src/app/components/loading';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  
  currentSubPage = 'history';
  profile: any = {};
  orders: Order[] = [];
  stores: any = {};
  maximumPage;
  currentOrderPageNumber = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  segmentChanged(ev: any) {
    this.currentSubPage = ev.detail.value;
  }
  constructor(private oauthService: OAuthService,
              private queryResourceService: QueryResourceService,
              private toastController: ToastController,
              private alertController: AlertController,
              private navController: NavController) { }

  ionViewWillEnter() {
    this.oauthService.loadUserProfile().then((user:any) => {
      this.profile = user;
      this.queryResourceService.findOrdersByCustomerIdUsingGET({
        customerId: this.profile.preferred_username,
        page: 0
      })
      .subscribe(orders => {
        this.orders = orders.content;
        this.maximumPage = orders.totalPages;
        this.orders.forEach(order => {
          if(order.orderId != null) {
            this.queryResourceService.findStoreByRegisterNumberUsingGET(order.storeId)
            .subscribe(store => {
              this.stores[order.storeId] = store;
            });  
          }
        });
      })
      console.log(user);
    });
  }

  loadMoreOrders(event) {
    console.log("Load more");
    this.currentOrderPageNumber = this.currentOrderPageNumber + 1;
    this.queryResourceService.findOrdersByCustomerIdUsingGET({
      customerId: this.profile.preferred_username,
      page: this.currentOrderPageNumber,
      size:2
    })
    .subscribe(orders => {
      console.log("Getting orders" , orders);
      orders.content.forEach(order => {
        this.orders.push(order);
      })
    })
    if (this.currentOrderPageNumber === this.maximumPage) {
      console.log("maximum reached");
      this.infiniteScroll.disabled=true;
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

}
