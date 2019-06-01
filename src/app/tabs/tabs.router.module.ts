import { AuthGuardService } from './../services/security/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/restaurants/restaurants.module#RestaurantsPageModule',
            canActivate: [AuthGuardService]
          },
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'basket',
        children: [
          {
            path: '',
            loadChildren: '../pages/basket/basket.module#BasketPageModule',
            canActivate: [AuthGuardService]
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../pages/profile/profile.module#ProfilePageModule',
            canActivate: [AuthGuardService]
          }
        ],
        canActivate: [AuthGuardService]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
