import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList:OrderHistory[]=[];
  storage:Storage=sessionStorage;
  constructor(private orderHistoryService:OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }
  handleOrderHistory() {
    //read the user's email address from browser storage
    const email = JSON.parse(this.storage.getItem('userEmail'));
    // const email = tempEmail.replace(/['"]+/g, '');
    //console.log("Email from the storage"+ email.replace(/['"]+/g, ''));
    //retrieve the data from the service
    this.orderHistoryService.getUserHistory(email).subscribe(
      data=>{
        //console.log("this is email-->"+JSON.stringify(data));
        this.orderHistoryList=data._embedded.orders;
      }
    );
    
  }

}
