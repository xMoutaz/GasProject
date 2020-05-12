import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class WifeService {

  readonly url = "https://marriage-bandits.herokuapp.com/wife";
  // readonly url = "http://localhost:8081/wife";

  constructor(private http: HttpClient) { }

  createWife(wife) {
    return this.http.post(`${this.url}/createWife`, wife);
  }

  editWifeInfo(wife: Person) {
    return this.http.patch(`${this.url}/editWife/${wife._id}`, wife);
  }
}
