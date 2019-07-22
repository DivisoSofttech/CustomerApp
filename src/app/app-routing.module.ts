import { RestaurantsPage } from './pages/restaurants/restaurants.page';
import { AuthGuardService } from './services/security/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule',
  },
  { path: 'hotel-menu/:id',
    loadChildren: './pages/hotel-menu/hotel-menu.module#HotelMenuPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuardService]
  },
  { path: 'basket',
    loadChildren: './pages/basket/basket.module#BasketPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'restaurants',
    loadChildren: './pages/restaurants/restaurants.module#RestaurantsPageModule',
    canActivate: [AuthGuardService]
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
