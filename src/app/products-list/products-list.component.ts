import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  newProduct = '';

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => this.fetchProducts()
    });
  }

  private fetchProducts(): void {
    this.products$ = this.productsService.getProducts();
  }

  addNewProduct() : void {
    try {
      const a = this.productsService.createProduct({name: this.newProduct}).subscribe({
        next: () => {
          this.newProduct = '';
          this.fetchProducts();
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
}