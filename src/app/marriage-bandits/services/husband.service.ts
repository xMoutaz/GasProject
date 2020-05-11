import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HusbandService {

  readonly url = "https://marriage-bandits.herokuapp.com/husband";
  readonly localurl = "http://localhost:8081/husband";

  constructor(private http: HttpClient) { }

  createHusband(husband) {
    return this.http.post(`${this.url}/createHusband`, husband);
  }
  
}
