import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  Url='./assets/data.json'

  cartSubject$: BehaviorSubject<Product[]> = new BehaviorSubject(<Product[]>[]);
  formValue: BehaviorSubject<any> = new BehaviorSubject({})
  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<[]> {
    return this.http.get<[]>('./assets/data.json').pipe(map((data: any) =>{
        return data || [];
      })
    );
  }

  checkExist(cart: Product[], item: Product) {
    let index = cart.findIndex((itemCard) => itemCard.id === item.id);
    if (index !== -1) {
      cart[index].quantity = item.quantity;
    } else {
      cart.push(item);
    }
  }
}
