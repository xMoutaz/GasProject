import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarriageBanditsUserService {
  readonly url = 'http://localhost:8081/users'
  constructor(private http: HttpClient) { }
  
  createUser(user) {
    return this.http.post(`${this.url}/register`, user);
  }
  loginwithEmail(user) {
    return this.http.post(`${this.url}/login`, user);
  }
  testUser() {
    return this.http.get(this.url + '/all');
  }
  
}
