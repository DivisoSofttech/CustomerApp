import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-quantity-modal',
  templateUrl: './product-quantity-modal.component.html',
  styleUrls: ['./product-quantity-modal.component.scss'],
})
export class ProductQuantityModalComponent implements OnInit {


  @Input() quantity: number;


  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  add() {
    this.quantity++;
  }

  remove() {
    this.quantity--;
  }

  dismiss(force) {
    if (!force) {
      this.modalController.dismiss({quantity: this.quantity});
    } else {
      this.modalController.dismiss();
    }
  }

}
