import { Injectable } from '@angular/core';
import { Product, Stock, StockCurrent, OrderLine } from '../api/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderLines:OrderLine[]=[];
  storeId;
  observableTickets: BehaviorSubject<OrderLine[]>;
  constructor() {
    this.observableTickets = new BehaviorSubject<OrderLine[]>(this.orderLines);
  }

  addProduct(product: Product,stockCurrent: StockCurrent) {
    let added = false;
    this.orderLines.forEach(orderLine => {
      if (orderLine.productId === product.id) {
        orderLine.quantity++;
        orderLine.total += orderLine.pricePerUnit;
        this.updateCart();
        added = true;
      }
    });
    if (!added) {
      const orderLine: OrderLine = {
        productId: product.id,
        quantity: 1,
        pricePerUnit: stockCurrent.sellPrice,
        total: stockCurrent.sellPrice
      };
      this.orderLines.push(orderLine);
      this.updateCart();
    }
  }

  removeTicket(index) {
    this.orderLines.splice(index, 1);
    this.updateCart();
  }

  updateCart() {
    console.log(this.orderLines);
    this.observableTickets.next(this.orderLines);
  }

  emptyCart() {
    this.orderLines = [];
    this.observableTickets.next(this.orderLines);
  }
}
