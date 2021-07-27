import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated:boolean=false;
  userFullName:string;
  constructor(private oktaAuthService:OktaAuthService) { }

  ngOnInit(): void {
    //subscribe to autentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result)=>{
        console.log("inside login status" +result);
        this.isAuthenticated=result;
        this.getUserDetails();
      }
    );
  }
  getUserDetails() {
    if(this.isAuthenticated){

      //Fetch the logged in user details (user's claims)
      //user full name is exposed as a property name
      this.oktaAuthService.getUser().then(
        (res)=>{
          this.userFullName=res.name;
        }
      );
    }
    
  }

  logout(){
    //terminates the session with okta and remove current token
    this.oktaAuthService.signOut();
  }

}
