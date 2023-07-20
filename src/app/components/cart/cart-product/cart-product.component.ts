import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {
  @Input() product: Product = {}
  @Output() onChangeItem = new EventEmitter()
  @Output() onRemoveItem = new EventEmitter()
  quantity: any;
  ngOnInit() {
  }

  onChangeQuantity(item: Product) {
    this.onChangeItem.emit(item)
  }

  removeItemCart(item: Product) {
    this.onRemoveItem.emit(item)
  }
}
