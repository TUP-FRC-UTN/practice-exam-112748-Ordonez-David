import { Routes } from '@angular/router';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderTableComponent } from './order-table/order-table.component';

export const routes: Routes = [

    {
        path: 'form',
        component: OrderFormComponent,
    },

    {
        path: 'table',
        component: OrderTableComponent
    }

];
