import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffendersService {
  readonly url = 'http://localhost:8081/offenders';

  constructor(private http: HttpClient) { }

  getOffenders() {
    this.http.get(`${this.url}/all`);
  }
}
