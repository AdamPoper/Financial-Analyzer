import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './core/components/stocks-component/stocks.component';
import { BondsComponent } from './core/components/bonds-component/bonds.component';
import { CommoditiesComponent } from './core/components/commodities-component/commodities.component';
import { WatchListsComponent } from './core/components/watch-lists/watch-lists.component';
import { LoginComponent } from './core/components/login-component/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'stocks/:symbol', component: StocksComponent },
  { path: 'bonds', component: BondsComponent },
  // { path: 'commodities', component: CommoditiesComponent },
  { path: 'watchLists', component: WatchListsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
