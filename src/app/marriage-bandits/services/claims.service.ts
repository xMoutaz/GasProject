import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Claim } from '../models/claim';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  readonly url = 'https://marriage-bandits.herokuapp.com/claims';

  constructor(private http: HttpClient) { }

  getClaims(pg, pgS) {
    return this.http.get(`${this.url}/search/viewClaim?pg=${pg}&pgS=${pgS}`);
  }
  getTotalRecord() {
    return this.http.get<ApiResponse<number>>(this.url +`/search/totalrecord`)
  }
  searchClaimView(claimId) {
    return this.http.get(this.url+`/search/claimView/${claimId}?pg=0&pgS=5`);
  }
  getClaim(id) {
    return this.http.get(`${this.url}/${id}`);
  }
  makeClaime(claim) {
    return this.http.post<ApiResponse<any>>(`${this.url}/makeClaim`,  claim);
  }
  editClaimInfo(claim) {
    return this.http.patch(`${this.url}/editClaim/${claim._id}`, claim)
  }
  archivingClaim(claimId) {
    return this.http.patch(`${this.url}/claimarchive/${claimId}`, {"claimarchive": true});
  }
  deleteClaim(id) {
    return this.http.delete(`${this.url}/deleteClaim/${id}`)
  }

}
