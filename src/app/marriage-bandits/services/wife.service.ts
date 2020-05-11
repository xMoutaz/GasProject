import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WifeService {

  readonly url = "https://marriage-bandits.herokuapp.com/wife";
  readonly localurl = "http://localhost:8081/wife";

  constructor(private http: HttpClient) { }

  createWife(wife) {
    return this.http.post(`${this.url}/createWife`, wife);
  }

}
