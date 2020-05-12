import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Divorce } from '../models/divorce';

@Injectable({
  providedIn: 'root'
})
export class DivorceService {

  readonly url = "https://marriage-bandits.herokuapp.com/divorce";
  // readonly url = "http://localhost:8081/divorce";

  constructor(private http: HttpClient) { }

  registerDivorce(divorce: Divorce) {
    return this.http.post(`${this.url}/createDivorce`, divorce)
  }
}
