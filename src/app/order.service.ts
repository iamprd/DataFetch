import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, delay, map, of } from 'rxjs';
import { Order } from './order.model';

@Injectable({
    providedIn: 'root'
  })
export class OrderService {
  
    private baseURL = 'http://localhost:8080/Orders/All';

    constructor(private httpClient: HttpClient) {
     }

    getOrdersList( pageSize: number,pageNumber:number): Observable<any>{
        return this.httpClient.get<any>(`${this.baseURL}?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(delay(500));
        
    }
     
}