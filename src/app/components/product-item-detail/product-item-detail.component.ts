import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../Service/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent {

  product: Product[] = []
  cart: Product[] = []
  item: Product = {}
  quantity: any;
  id: any;

  subscriptions: Subscription[] = []

  constructor(private routeActive: ActivatedRoute,
    private productService: ProductsService){ }

  ngOnInit() {
    this.id = this.routeActive.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.productService.getAllProduct().subscribe((productList: Product[]) => {
        this.product = productList;
        this.product.forEach((item: Product) => {
          if (item.id === this.id) {
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
    // console.log("item",this.item)
    // console.log("product",this.product)
  }

  addToCart(item: any, quantity: number) {
    let addItemToCart = {...item, quantity: quantity}
    this.productService.checkItemExist(this.cart, addItemToCart)
    this.productService.cartSubject$.next(this.cart)
    alert('Added to cart');
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe()
    })
  }

}
