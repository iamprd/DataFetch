import { Component, HostListener, OnInit, enableProdMode } from '@angular/core';
import DataSource from "devextreme/data/data_source";
import { DxDataGridModule } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[OrderService]
})
export class AppComponent implements OnInit {

  title = 'angl-summary';
  orders= [];
  editorOptions: any;
  start=0;
  end=10;
  pageSize = 10;
  pageNumber = 1;
    
  constructor(private service: OrderService) {
    this.editorOptions = {
      format: 'currency',
    };
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.service.getOrdersList(this.pageSize,this.pageNumber).subscribe(data => {

        const newData= data.slice(this.start,this.end);
        this.orders = this.orders.concat(newData);
        this.start = this.end
        this.end = this.start+1
    },
    (error) => {
      console.error('Error fetching data', error);
    }
    );
  }

  onScroll(){
      this.pageNumber++;
      this.getUsers();
    }
  
  customizeDate(data:any) {
    return `First: ${new DatePipe('en-US').transform(data.value, 'MMM dd, yyyy')}`;
  }

  calculateSelectedRow(options:any) {
    if (options.name === 'SelectedRowsSummary') {
      if (options.summaryProcess === 'start') {
        options.totalValue = 0;
      } else if (options.summaryProcess === 'calculate') {
        if (options.component.isRowSelected(options.value.id)) {
          options.totalValue += options.value.saleAmount;
        }
      }
    }
  }

  onSelectionChanged(e:any) {
    e.component.refresh(true);
  }
}




