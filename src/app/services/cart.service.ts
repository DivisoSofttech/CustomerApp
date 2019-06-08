import { Injectable } from '@angular/core';
import { Product, Stock, StockCurrent, OrderLine } from '../api/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderLines: OrderLine [] = [];
  totalPrice = 0;
  storeId;
  observableTickets: BehaviorSubject<OrderLine[]>;
  observablePrice: BehaviorSubject<number>;
  constructor() {
    this.observableTickets = new BehaviorSubject<OrderLine[]>(this.orderLines);
    this.observablePrice = new BehaviorSubject<number>(this.totalPrice);
  }

  addProduct(product: Product, stockCurrent: StockCurrent) {
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

  removeProduct(stockCurrent: StockCurrent) {
    this.orderLines.forEach(orderLine => {
      if (orderLine.productId === stockCurrent.product.id) {
        orderLine.quantity--;
        orderLine.total -= orderLine.pricePerUnit;
        if (orderLine.quantity === 0) {
          this.removeTicket(this.orderLines.indexOf(orderLine));
        }
        this.updateCart();
      }
    });
  }

  removeTicket(index) {
    this.orderLines.splice(index, 1);
    this.updateCart();
  }

  updateCart() {
    this.totalPrice = 0;
    this.orderLines.forEach(order => {
      this.totalPrice += order.total;
    });
    this.observableTickets.next(this.orderLines);
    this.observablePrice.next(this.totalPrice);
  }

  emptyCart() {
    this.orderLines = [];
    this.updateCart();
  }
}
