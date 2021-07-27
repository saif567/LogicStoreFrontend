import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  searchMode:boolean =false;
  products:Product[] = [];
  currentCategoryId:number = 1;
  previousCategoryId: number= 1;

  previousKeyword:string |undefined;

  //new properties for pagination
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements=0;
  
  constructor(private productService:ProductService,
                      private cartService:CartService,
                      private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( ()=>{
    this.listProducts();
  }); 
  }

  updatePageSize(thePageSize:number){
    this.thePageSize=thePageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      const keyword:string = String(this.route.snapshot.paramMap.get('keyword'));
      this.handleSearchProducts(keyword);
    }
    else{
      this.handleListProducts();
    }
    
  }

  handleListProducts(){
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the "id" param string. Convert string to a number using the + symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id')); 
    }
    else {
      //not category id available .. default to category id 1
      this.currentCategoryId=1;
    }

    //Check if we have a different category than previous 
    //Note : Angular will resue the component if it is currenlty being viewed
    // 

    //if we have diffrent category id than previous
    //then set thePageNumber back to 1
    if(this.previousCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    } 

    this.previousCategoryId=this.currentCategoryId
    console.log(`CurrentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    this.productService.getProuctListPaginate(this.currentCategoryId,
                                              this.thePageNumber-1,
                                              this.thePageSize).subscribe(data =>{
                                                this.products=data._embedded.products;
                                                this.thePageNumber=data.page.number+1; 
                                                this.thePageSize=data.page.size;
                                                this.theTotalElements=data.page.totalElements;
                                              });
  }
  

  handleSearchProducts(keyword:string){

    //if we have diffrent keyword than previous
    //then set thePageNumber back to 1
    if(this.previousKeyword != keyword){
      this.thePageNumber=1;
    }

    this.previousKeyword=keyword;
    this.productService.searchProductsPaginate(keyword,
                                                this.thePageNumber-1,
                                                this.thePageSize)
                                                .subscribe(
                                                  data =>{
                                                    console.log(JSON.stringify(data))
                                                    this.products=data._embedded.products;
                                                    this.thePageNumber=data.page.number+1; 
                                                    this.thePageSize=data.page.size;
                                                    this.theTotalElements=data.page.totalElements;
                                                  }
                                                );
  }

  addToCart(theProduct:Product){
    console.log(`Adding to cart ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
