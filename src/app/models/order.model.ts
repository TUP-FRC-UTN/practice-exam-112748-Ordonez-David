import { Product } from "./product.model";

export interface Order {
    id: string;
    customerName: string;
    email: string;
    products: Product[];
    total: number;
    orderCode: string;
    timestamp: string;
  }
  