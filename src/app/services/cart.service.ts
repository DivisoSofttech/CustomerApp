import { TicketLineDTO } from './../api/models/ticket-line-dto';
import { Injectable } from '@angular/core';
import { Product, Stock, StockCurrent } from '../api/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  ticketLines: TicketLineDTO[] = [];
  observableTickets: BehaviorSubject<TicketLineDTO[]>;
  constructor() {
    this.observableTickets = new BehaviorSubject<TicketLineDTO[]>(this.ticketLines);
  }

  addProduct(product: Product,stockCurrent: StockCurrent) {
    let added = false;
    this.ticketLines.forEach(ticket => {
      if (ticket.productId === product.id) {
        ticket.quantity++;
        ticket.total += ticket.price;
        this.updateCart();
        added = true;
      }
    });
    if (!added) {
      const ticketLine: TicketLineDTO = {
        productId: product.id,
        quantity: 1,
        price: stockCurrent.sellPrice,
        total: stockCurrent.sellPrice
      };
      this.ticketLines.push(ticketLine);
      this.updateCart();
    }
  }

  removeTicket(index) {
    this.ticketLines.splice(index, 1);
    this.updateCart();
  }

  updateCart() {
    console.log(this.ticketLines);
    this.observableTickets.next(this.ticketLines);
  }

  emptyCart() {
    this.ticketLines = [];
    this.observableTickets.next(this.ticketLines);
  }
}
