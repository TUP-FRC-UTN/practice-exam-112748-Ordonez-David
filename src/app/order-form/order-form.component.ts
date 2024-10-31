import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products-service.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {


  form: FormGroup;
  productsApi: Product[] = []; // Lista de productos obtenidos de la API


  constructor(private fb: FormBuilder, private productsService: ProductsService,
    private router: Router, private orderService: OrderService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      products: this.fb.array([]) // Inicializamos el FormArray vacío
    });
  }

  ngOnInit(): void {
    // Llamar al servicio para obtener la lista de productos
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.productsApi = data; // Asignar los productos a la variable
      this.addProduct();
      console.log("DATA", data)

    });

  }


   // Método para acceder al FormArray de productos
   get products(): FormArray {
    return this.form.get('products') as FormArray;
  }


  // Método para añadir un producto al FormArray
  addProduct() {
    const productForm = this.fb.group({
      productId: [1, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      stock: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]], // Deshabilitado
      price: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]]  // Deshabilitado
    });
  // Suscribirse a los cambios en el productId
  productForm.get('productId')?.valueChanges.subscribe((value:any) => {
    this.updateStockAndPrice(productForm, value);
});

    this.products.push(productForm);

    console.log("FORM", this.form);
  }



  // Método para actualizar stock y price basado en el producto seleccionado
  private updateStockAndPrice(productForm: FormGroup, productId: number) {
    const selectedProduct = this.productsApi.find(product => product.id === productId);
    
    if (selectedProduct) {
      productForm.patchValue({
        stock: selectedProduct.stock, 
        price: selectedProduct.price   
      });
    }
  }

  private calculateTotal(): number {
    return this.form.value.products.reduce((total: number, product: any) => {
      return total + (product.price * product.quantity);
    }, 0);
  }

  
  // Método para eliminar un producto específico
  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  private generateOrderCode(): string {
    return `J.com${Math.floor(Math.random() * 100000)}`; // Simple generación de código
  }

  sendForm() {
    alert("TEST");
    if (this.form.valid) {
      const orderData = {
        customerName: this.form.value.name,
        email: this.form.value.email,
        products: this.form.value.products.map((product: any) => ({
          productId: product.productId,
          quantity: product.quantity,
          stock: product.stock,
          price: product.price
        })),
        total: this.calculateTotal(), // Método para calcular el total
        orderCode: this.generateOrderCode(), // Método para generar un código de orden (si es necesario)
        timestamp: new Date().toISOString() // O usa la fecha actual
      };
  
      // Enviar el pedido a la API
      this.orderService.createOrder(orderData).subscribe({
        next: (response:any) => {
          console.log('Orden creada', response);
          //this.router.navigate(['/table']); // Regresa a la tabla
        },
        error: (error:any) => {
          console.error('Error al crear la orden', error);
          // Maneja el error de manera apropiada
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
