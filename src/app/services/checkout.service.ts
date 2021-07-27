import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl =`${environment.baseUrl}checkout/purchase`;

  constructor(private http: HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>{
    return this.http.post<Purchase>(this.purchaseUrl,purchase);
  }
}
