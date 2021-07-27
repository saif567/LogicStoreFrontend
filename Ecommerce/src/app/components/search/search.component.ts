import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  searchByKeyword(keyword:string) {
    console.log(`Keyword is= ${keyword}`);
    this.route.navigateByUrl(`/search/${keyword}`);
  }

}
