import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  readonly url = 'http://localhost:8081/claims';

  constructor(private http: HttpClient) { }

  getClaims() {
    this.http.get(`${this.url}/all`);
  }

  
}
