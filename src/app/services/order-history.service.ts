import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl=`${environment.baseUrl}orders`;

  constructor(private http :HttpClient) { }

  getUserHistory(theEmail:string):Observable<GetReponseOrdeHistory>{
    const searchUrl=`${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    return this.http.get<GetReponseOrdeHistory>(searchUrl);
  }
}
interface GetReponseOrdeHistory{
  _embedded:{
    orders:OrderHistory[];
  }
}
