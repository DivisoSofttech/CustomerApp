import { AuthGuardService } from './services/security/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  { path: 'hotel-menu',
    loadChildren: './pages/hotel-menu/hotel-menu.module#HotelMenuPageModule'
  },
  { path: 'restaurants',
    loadChildren: './pages/restaurants/restaurants.module#RestaurantsPageModule'
  },
  { path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'basket', loadChildren: './pages/basket/basket.module#BasketPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'hotel-menu/product', loadChildren: './pages/product/product.module#ProductPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
