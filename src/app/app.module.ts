import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBoxModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { DxListModule } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { DxDataGridModule } from "devextreme-angular";
import { HttpClientModule } from '@angular/common/http';

import { OrderService } from './order.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);