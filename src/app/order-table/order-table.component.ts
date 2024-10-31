import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent {

  orders: Order[] = [];


  constructor(private orderService: OrderService) {}


  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((response:any) => {
      this.orders = response;
      console.log('Orders:', this.orders);
    });
  }






}
