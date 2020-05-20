import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WifeService {

  readonly url = `${environment.baseUrl}/wife`;

  constructor(private http: HttpClient) { }

  createWife(wife) {
    return this.http.post(`${this.url}/createWife`, wife);
  }

  editWifeInfo(wife: Person) {
    return this.http.patch(`${this.url}/editWife/${wife._id}`, wife);
  }
}
