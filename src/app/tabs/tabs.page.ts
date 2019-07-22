import { Platform, NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  private subscription: Subscription;
  basketBadge = 0;
  enableTabs = true;

  constructor(
    private cartService: CartService,
    private navController: NavController,
    private platform: Platform
  ) {
    this.enableTabs = this.platform.width() >= 640 ? false : true;
    if (this.platform.width() >= 640) {
      this.navController.navigateRoot('restaurants');
    }
  }

  ngOnInit() {
    this.subscription = this.cartService.observableTickets.subscribe(
      ticketLines => (this.basketBadge = ticketLines.length)
    );
  }
}
