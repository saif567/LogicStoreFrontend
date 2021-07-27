import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  theTotalPrice:number=0.0;
  theTotalQuantity:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data =>{this.theTotalPrice=data;}
    );

    this.cartService.totalQuantity.subscribe(
      data=>{this.theTotalQuantity=data}
    );
  }

}
