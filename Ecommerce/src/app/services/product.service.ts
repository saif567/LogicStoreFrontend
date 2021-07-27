import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  

  private baseURL= 'http://localhost:8080/api/products';

  private categoryURL='http://localhost:8080/api/product-category';
  
  constructor(private http:HttpClient) { }

  
  getProuctListPaginate(theCategoryId:number,
                        thePage:number,
                        thePageSize:number):Observable<GetResponseProducts>{
    //need to bubild URL based on category id,page and size
    const searchUrl=`${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`
                      +`&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseProducts>(searchUrl);
  }

  searchProductsPaginate(keyword:string,
                            thePage:number,
                            thePageSize:number):Observable<GetResponseProducts> {
    const searchUrl=`${this.baseURL}/search/findByNameContaining?name=${keyword}`
                      +`&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseProducts>(searchUrl);
  }
  getProuctList(theCategoryId:number):Observable<Product[]>{
    const searchUrl=`${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }


  getProductCategoryList():Observable<ProductCategory[]> {
    return this.http.get<GetResponseProductCategory>(this.categoryURL).pipe(
      map(response=>response._embedded.productCategory)
    );
  }

  searchProducts(keyword:string):Observable<Product[]> {
    const searchUrl=`${this.baseURL}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  getProduct(id: number) :Observable<Product>{
    const searchUrl=`${this.baseURL}/${id}`;
    return this.http.get<Product>(searchUrl);
  }

  private getProducts(searchURL: string): Observable<Product[]> {
    return this.http.get<GetResponseProducts>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}