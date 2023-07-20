import { Component } from '@angular/core';
import { ProductsService } from 'src/app/Service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(private router: Router, private productService: ProductsService) { }
  fullName: string = '';
  totalPrice: number = 0;
  formValue: any;
  ngOnInit() {
    this.productService.formValue.subscribe((data) => {
      this.fullName = data.fullName
      this.totalPrice = data.totalPrice
    })

  }
  backtoProductPage() {
    this.router.navigate([''])
  }

}
