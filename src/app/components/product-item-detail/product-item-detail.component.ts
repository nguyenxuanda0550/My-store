import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
// import { MessageService } from 'primeng/api';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../Service/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit, OnDestroy{

  product: Product[] = []
  cart: Product[] = []
  item: Product = {}
  quantity: number = 1;
  id: any;

  subscriptions: Subscription[] = []

  constructor(private route: ActivatedRoute,
    private productService: ProductsService){ }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.productService.getAllProduct().subscribe((productList: Product[]) => {
        this.product = productList;
        // console.log("this.product", this.product)
        this.product.forEach((item: Product) => {
          // console.log("id",typeof(this.id) + "item", typeof(item.id))
          if (item.id === Number(this.id)) {
            this.item = item;
            return;
          }
        });
      })
    );
    this.subscriptions.push(
      this.productService.cartSubject$.subscribe((cart: Product[]) => {
        this.cart = cart;
      })
    );
  }

  addToCart(item: any, quantity: number) {
    let addItemToCart = {...item, quantity: quantity}
    this.productService.checkExist(this.cart, addItemToCart)
    this.productService.cartSubject$.next(this.cart)
    alert('Added to cart');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe()
    })
  }

}
