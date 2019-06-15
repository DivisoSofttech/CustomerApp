import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class Loading {

    constructor(
        private loadingController: LoadingController
    ){}

    async createLoader() {
        return await this.loadingController.create({
          spinner: "lines",
          animated: true,
          message: 'loading',
          translucent: true,
        });
      } 
}