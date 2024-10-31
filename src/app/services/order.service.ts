import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/orders'; // Cambia esto a la URL de tu API



  constructor(private http: HttpClient) { }



  getOrders(): Observable<Order> {
    return this.http.get<Order>(this.apiUrl);
  }

  createOrder(orderData: any): Observable<any> {
    
    console.log("LLEGA LA DATA", orderData);
    return this.http.post<any>(this.apiUrl, orderData);
  }

}
