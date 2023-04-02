import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './core/components/stocks-component/stocks.component';
import { BondsComponent } from './core/components/bonds-component/bonds.component';
import { CommoditiesComponent } from './core/components/commodities-component/commodities.component';

const routes: Routes = [
  { path: 'stocks', component: StocksComponent },
  { path: 'bonds', component: BondsComponent },
  { path: 'commodities', component: CommoditiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
