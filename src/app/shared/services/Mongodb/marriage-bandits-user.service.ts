import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MarriageBanditsUserService {
  readonly baseURL = `${environment.baseUrl}/users`;
  
  constructor(private http: HttpClient) { }
  
  createUser(user) {
    return this.http.post(`${this.baseURL}/register`, user);
  }

  getLoggedUser(id) {
    return this.http.get(`${this.baseURL}/loggedUser/${id}`);
  }

  socialLogin(user) {
    return this.http.post(`${this.baseURL}/socialLogin`, user);
  }
  facebookLogin() {
    return this.http.get(`${this.baseURL}/auth/facebook`);
  }
  loginwithEmail(user) {
    return this.http.post(`${this.baseURL}/login`, user);
  }
  testUser() {
    return this.http.get(`${this.baseURL}/all`);
  }
  
}
