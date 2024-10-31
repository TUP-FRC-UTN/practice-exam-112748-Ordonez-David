import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderTableComponent } from './order-table/order-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderFormComponent, OrderTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'practice-exam';

  showForm:boolean = false;
  constructor(private router: Router) {}

  goToTable() {
    this.router.navigate(['/table']);
  }

  goToForm() {
    this.router.navigate(['/form']);
  }

}
