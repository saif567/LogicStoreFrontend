import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import myAppConfig from 'src/app/config/my-app-config';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin:any;
  constructor(private oktaAuthService: OktaAuthService) { 
    this.oktaSignin= new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams:{
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
    console.log("thisisi ")
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el:'#okta-sign-in-widget'},//this name shuold be same as the div tag id n login.component.html
      (response)=>{
        console.log("inside......response")
        if(response.status==='SUCCESS'){
          console.log("Sucess")
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error)=>{
        console.log("error mofo")
        throw error;
      }
    )
  }

}
