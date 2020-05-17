import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HusbandService {

  readonly url = `${environment.baseUrl}/husband`;

  constructor(private http: HttpClient) { }

  createHusband(husband) {
    return this.http.post(`${this.url}/createHusband`, husband);
  }
  
  editHusbandInfo(husband: Person) {
    return this.http.patch(`${this.url}/editHusband/${husband._id}`, husband);
  }
}
