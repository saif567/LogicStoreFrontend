import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItem:CartItem[]=[];
  // totalPrice: Subject<number>= new ReplaySubject<number>();
  // totalQuantity:Subject<number>= new ReplaySubject<number>();
  totalPrice: Subject<number>= new BehaviorSubject<number>(0);
  totalQuantity:Subject<number>= new BehaviorSubject<number>(0);

  //storage:Storage=sessionStorage;
  storage:Storage=localStorage;

  constructor() { 
    let data = JSON.parse(this.storage.getItem('cartItems'));
    if(data !=null){
      this.cartItem=data;
      this.computeCartTotal();
    }
  }

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItem));
  }
  
  addToCart(theCartItem: CartItem){
    //check if item is already in cart
    let alreadyExistInCart:boolean=false;
    let existingCartItem :CartItem | undefined;
    if(this.cartItem.length>0){
      // for(let tempCartItem of this.cartItem){
      //   if(tempCartItem.id==theCartItem.id){
      //     existingCartItem=tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem=this.cartItem.find(tempCartItem =>tempCartItem.id==theCartItem.id );
      alreadyExistInCart=(existingCartItem!=undefined);

     }


    
     if(alreadyExistInCart){
      existingCartItem.quantity++;
     }
     else{
       this.cartItem.push(theCartItem);
     }
    
     this.computeCartTotal();

  }
  computeCartTotal() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for(let currentCartItem of this.cartItem){
      totalPriceValue+=currentCartItem.quantity* currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }

    //publish the new values.. all subscribers will receive the
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log data

    this.logCartData(totalPriceValue,totalQuantityValue);
    this.persistCartItems();
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`Content of Cart`);
    for(let tempCartItem of this.cartItem){
      const subTotalPrice= tempCartItem.unitPrice*tempCartItem.quantity;
      console.log(`name :${tempCartItem.name}, Quantity :${tempCartItem.quantity},`+
      ` UnitPrice :${tempCartItem.unitPrice}, SubTotalPrice: ${subTotalPrice}`);
    }
    console.log(`Total Price :${totalPriceValue} Total Quantity :${totalQuantityValue} `);
    console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {
    let currentCartItem = this.cartItem.find(tempCartItem =>tempCartItem.id==theCartItem.id );
    currentCartItem.quantity--;
    if(currentCartItem.quantity==0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotal();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex= this.cartItem.findIndex(tempCartItem =>tempCartItem.id==theCartItem.id );
    if(itemIndex>-1){
      this.cartItem.splice(itemIndex,1);
      this.computeCartTotal();
    }
  }

}
