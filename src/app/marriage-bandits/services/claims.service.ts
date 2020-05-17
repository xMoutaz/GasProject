import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Claim } from '../models/claim';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';
import { Offender } from '../models/offender';
import { Claimant } from '../models/claimant';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  readonly url = `${environment.baseUrl}/claims`;

  constructor(private http: HttpClient) { }

  getClaims(pg, pgS, searchedOffender: Offender, searchedClaimant: Claimant) {
    return this.http.get(`${this.url}/search/viewClaim?pg=${pg}&pgS=${pgS}&offenderFirstName=${searchedOffender.firstName}&offenderLastName=${searchedOffender.lastName}&masjid=${searchedOffender.masjid}&verified=${searchedOffender.verified}&claimantFirstName=${searchedClaimant.firstName}&claimantLastName=${searchedClaimant.lastName}&email=${searchedClaimant.emailAddress}`)
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
