import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {}
  dismiss()
  {
    this.modalController.dismiss();
  }

}
