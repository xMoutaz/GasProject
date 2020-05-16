import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarriageBanditsUserService {
  readonly URL = 'https://marriage-bandits.herokuapp.com/users'
  constructor(private http: HttpClient) { }
  
  createUser(user) {
    return this.http.post(`${this.URL}/register`, user);
  }

  getLoggedUser(id) {
    return this.http.get(`${this.URL}/loggedUser/${id}`);
  }

  socialLogin(user) {
    return this.http.post(`${this.URL}/socialLogin`, user);
  }
  facebookLogin() {
    return this.http.get(`${this.URL}/auth/facebook`);
  }
  loginwithEmail(user) {
    return this.http.post(`${this.URL}/login`, user);
  }
  testUser() {
    return this.http.get(`${this.URL}/all`);
  }
  
}
