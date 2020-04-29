import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claimant } from '../models/claimant';

@Injectable({
  providedIn: 'root'
})
export class ClaimantService {

  readonly url = 'http://localhost:8081/claimants';

  constructor(private http: HttpClient) { }
  getClaimnts() {
    return this.http.get(`${this.url}/all`);
  }
  getClaimnt(id) {
    return this.http.get(`${this.url}/${id}`);
  }
  createClaimnt(claimnt): Observable<Claimant> {
     return this.http.post<Claimant>(`${this.url}/createClaimant`,  claimnt);
  }
  deleteClaimnt(id) {
    return this.http.get(`${this.url}/deleteClaimant/${id}`)
  }
}
