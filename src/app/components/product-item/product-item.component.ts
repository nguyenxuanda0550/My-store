import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from './../../Service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit{
  @Input() product: any;

  quantity: number = 1;
  CartList: Product[] = [];

  constructor(private router: Router, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.cartSubject$.subscribe((data) => {
      this.CartList = data
    })
  }

  addToCart(ProductItem: any, quantity: number) {
  let productAddToCart = {...ProductItem, quantity: quantity}
    this.productsService.checkExist(this.CartList, productAddToCart)
    this.productsService.cartSubject$.next(this.CartList)
    alert('Added to cart!');
  }

  navigateToProductDetail(productId: number) {
    this.router.navigateByUrl('/product-detail/' + productId);
  }
}
