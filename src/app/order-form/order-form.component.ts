import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products-service.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {


  form: FormGroup;
  productsApi: Product[] = []; // Lista de productos obtenidos de la API


  constructor(private fb: FormBuilder, private productsService: ProductsService) {
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
    });
  }


   // Método para acceder al FormArray de productos
   get products(): FormArray {
    return this.form.get('products') as FormArray;
  }


  // Método para añadir un producto al FormArray
  addProduct() {
    const productForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
    this.products.push(productForm);

    console.log("FORM", this.form);
  }

  // Método para eliminar un producto específico
  removeProduct(index: number) {
    this.products.removeAt(index);
  }


  sendForm() {
    throw new Error('Method not implemented.');
    }


}
