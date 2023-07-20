import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from './../../Service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  productList: any[] = [];

  constructor(private ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.ProductsService.getAllProduct().subscribe(
      (data) => { this.productList = data; },
      (error) => { console.error(error); }
    );
  }

}
