import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from './../../api/models/store';
import { ProductDTO, StoreDTO, Product } from 'src/app/api/models';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

export class Favourite {

    route: string;
    type: string;
    data: any;
}

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  username;

  private favourites: Favourite[] = [];

  private favouriteSubject: BehaviorSubject<Favourite[]> = new BehaviorSubject(this.favourites);

  constructor(
    private storage: Storage,
    private oauthService: OAuthService
  ) { 
    this.oauthService.loadUserProfile()
    .then((data: any) => {
      this.username = data.preferred_username;
      this.storage.get(this.username +  '_favourites')
      .then(p => {
        if(p==null) {this.storage.set(this.username +  '_favourites' , this.favourites);}
        this.favouriteSubject.next(p);
      })
      .catch(err => {
        this.storage.set(this.username +  '_favourites' , this.favourites);
      });
    });
  }

  refresh() {
    this.favouriteSubject.next(this.favourites);
    this.storage.set(this.username +  '_favourites' , this.favourites);
  }

  addToFavouriteProduct(product: Product , route) {
    this.favourites.push({data: product , route: route , type:'product'});
    this.refresh();
  }

  addToFavouriteStore(store: Store , route) {
    this.favourites.push({data: store , route: route , type:'store'});
    this.refresh();
  }


  getFavourites(): BehaviorSubject<Favourite[]>
  {
    return this.favouriteSubject;
  }

  isFavouriteProduct(product: Product) {

  }

  isFavouriteStore(store: Store) {

  }

  getFavouriteProducts(){}
  getFavouriteStores() {}
}
