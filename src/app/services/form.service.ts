import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../common/country';
import { map } from 'rxjs/operators';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  countriesUrl:string =`${environment.baseUrl}countries`;
  statesUrl:string =`${environment.baseUrl}states`;

  constructor(private http: HttpClient) { }

  getCreditCardMonth(startMonth:number):Observable<number[]>{
    let data:number[]=[];


    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYear():Observable<number[]>{
    let data:number[]=[];
    const startYear: number = new Date().getFullYear();
    const endYear:number = startYear+10;

    for(let theYear=startYear;theYear<=endYear;theYear++){
      data.push(theYear);
    }

    return of(data);
  }

  getCountries():Observable<Country[]>{
    return this.http.get<GetResponseCountires>(this.countriesUrl).pipe(
      map(
        reponse=>reponse._embedded.countries
      )
    );
  }
  getStates(theCountryCode):Observable<State[]>{
    const searchUrl=`${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.http.get<GetResponseStates>(searchUrl).pipe(
      map(
        reponse=>reponse._embedded.states
      )
    );
  }

}

interface GetResponseStates{
  _embedded:{
    states:State[];  
  }
}

interface GetResponseCountires{
  _embedded:{
    countries:Country[];  
  }
}
