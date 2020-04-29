import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offender } from '../models/offender';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffendersService {
  readonly url = 'http://localhost:8081/offenders';

  constructor(private http: HttpClient) { }

  getOffenders() {
    return this.http.get(`${this.url}/all`);
  }
  getOffender(id) {
    return this.http.get(`${this.url}/${id}`);
  }
  createOffender(offender): Observable<Offender> {
     return this.http.post<Offender>(`${this.url}/createOffender`,  offender);
  }
  verifyOffender(id ,verified) {
    return this.http.patch(`${this.url}/verify/${id}`, verified);
  }
  deleteOffender(id) {
    return this.http.get(`${this.url}/deleteOffender/${id}`)
  }
}
