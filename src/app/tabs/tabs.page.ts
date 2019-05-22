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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.subscription = this.cartService.observableTickets.subscribe(ticketLines => this.basketBadge = ticketLines.length);
  }
}
