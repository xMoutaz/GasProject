import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class HusbandService {

  readonly url = "https://marriage-bandits.herokuapp.com/husband";
  // readonly url = "http://localhost:8081/husband";

  constructor(private http: HttpClient) { }

  createHusband(husband) {
    return this.http.post(`${this.url}/createHusband`, husband);
  }
  
  editHusbandInfo(husband: Person) {
    return this.http.patch(`${this.url}/editHusband/${husband._id}`, husband);
  }
}
