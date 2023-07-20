import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from './../../Service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  // private listProductCart: Product[] = [];
  
  constructor(private productsService: ProductsService, private router: Router) { }
  
  totalPrice:number = 0;
  listProductCart: Product[] = []
  informationUserOrder = {
    fullName:  '',
    address:   '',
    creditCard: null
  }

  ngOnInit(): void {
      this.getListProductCart()
  }
   // Add Product to cart
   addToCart(product: Product) {
    this.listProductCart.push(product);
  }

  // Remove Product from cart
  removeFromCart(product: Product) {
    const index = this.listProductCart.indexOf(product);
    if (index !== -1) {
      this.listProductCart.splice(index, 1);
    }
  }

  // Get all cart Products
  getListProductCart() {
    this.productsService.cartSubject$.subscribe((cart) => {
      this.listProductCart = cart
      this.totalPrice = + this.listProductCart.reduce((total, Product:Product) => {
        return total + (Number(Product.quantity) * Number(Product.price))
      }, 0).toFixed(2)
    })
  }

  // Calculate the total cost
  calculateTotalCost(): number {
    return this.listProductCart.reduce((total, product) => total + (Number(product.price) * Number(product.quantity)), 0);
  }

  handleSubmit(formValue: any) {
    this.productsService.formValue.next({...formValue, totalPrice: this.totalPrice})
    this.listProductCart = [];
    this.productsService.cartSubject$.next([])
    this.router.navigate(['/confirmation'])
  }

  handleChangeProduct(product: Product) {
    let index = this.listProductCart.findIndex((ProductCard: any) => ProductCard.id === product.id);

    if(index !== -1 && product.quantity && product.quantity >= 1) {
      this.listProductCart[index].quantity = product.quantity
      this.productsService.cartSubject$.next([...this.listProductCart])
    }else {
      this.totalPrice = 0
    }
  }

  handleRemoveProduct(Product: Product) {
    let listProductCartNew = this.listProductCart.filter((cart) => {
      return cart.id !== Product.id
    })

    this.productsService.cartSubject$.next(listProductCartNew)
    alert('Remove Product success!');
  }
}
