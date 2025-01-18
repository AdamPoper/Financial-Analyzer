import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './core/components/stocks-component/stocks.component';
import { BondsComponent } from './core/components/bonds-component/bonds.component';
import { CommoditiesComponent } from './core/components/commodities-component/commodities.component';
import { WatchListsComponent } from './core/components/watch-lists/watch-lists.component';
import { LoginComponent } from './core/components/login-component/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stocks', component: StocksComponent, canActivate: [AuthGuard] },
  { path: 'stocks/:symbol', component: StocksComponent, canActivate: [AuthGuard] },
  { path: 'bonds', component: BondsComponent, canActivate: [AuthGuard] },
  // { path: 'commodities', component: CommoditiesComponent },
  { path: 'watchLists', component: WatchListsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
