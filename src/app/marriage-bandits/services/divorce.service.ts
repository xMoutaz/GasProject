import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Divorce } from '../models/divorce';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DivorceService {

  readonly url = `${environment.baseUrl}/divorce`;

  constructor(private http: HttpClient) { }

  registerDivorce(divorce: Divorce) {
    return this.http.post(`${this.url}/createDivorce`, divorce)
  }
}
