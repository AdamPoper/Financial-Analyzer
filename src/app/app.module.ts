import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StocksComponent } from './core/components/stocks-component/stocks.component';
import { BondsComponent } from './core/components/bonds-component/bonds.component';
import { CommoditiesComponent } from './core/components/commodities-component/commodities.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ModalComponent } from './core/components/modal/modal.component';
import { WatchListsComponent } from './core/components/watch-lists/watch-lists.component';
import { LoginComponent } from './core/components/login-component/login.component';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    BondsComponent,
    CommoditiesComponent,
    ModalComponent,
    WatchListsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
