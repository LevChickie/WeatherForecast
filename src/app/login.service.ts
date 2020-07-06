import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './models/auth-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string;
 
  constructor(private http: HttpClient) { 
  }

  loginUser(username: string, password: string): string {
    const authData: AuthData= {username: username, password: password};
    //deal with the backend, sending back a webtoken
    //Mocking the backend's check and the token
    if(username==='admin'&&password==='admin'){
      //mock the generation of a token
      this.token = 'this-is-the-mocked-token-for-the-app';
      console.log(this.token);
      return this.token;
    } 
    console.log(this.token);
    return '';
  }

  getTokenForCheck(): string {
    console.log(this.token);
    return this.token;
  }

  checkTokenAndAllowAccess(token: string): boolean {
    if(this.token===token&&token!==undefined)
    {
      return true;
    }
    return false;
  }
}
