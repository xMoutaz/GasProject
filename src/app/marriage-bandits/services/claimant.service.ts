import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claimant } from '../models/claimant';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimantService {

  readonly url = `${environment.baseUrl}/claimants`;

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
  editClaimantInfo(claimant) {
    return this.http.patch(`${this.url}/editClaimant/${claimant._id}`, claimant)
  }
  deleteClaimnt(id): any {
    console.log(`${this.url}/deleteClaimant/${id}`)
    return this.http.delete(`${this.url}/deleteClaimant/${id}`)
  }
}
