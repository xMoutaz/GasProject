import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offender } from '../models/offender';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OffendersService {
  readonly url = `${environment.baseUrl}/offenders`;

  constructor(private http: HttpClient) { }

  getOffenders() {
    return this.http.get(`${this.url}/all`);
  }
  getTotalRecord(offender?: any) {
    return this.http.get<ApiResponse<number>>(this.url +`/search/totalrecord?firstName=${offender.firstName}&lastName=${offender.lastName}`)
  }

  searchOffender(pg: number,pgS:number, offender?: Offender) {
    return this.http.get<ApiResponse<Offender[]>>(`${this.url}/search/offender/?pg=${pg}&pgS=${pgS}&firstName=${offender.firstName}&lastName=${offender.lastName}`)
  }

  getOffender(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  createOffender( pic): Observable<Offender> {
    debugger;
     return this.http.post<Offender>(`${this.url}/createOffender`, pic);
  }

  editOffenderInfo(offender) {
    // return this.http.patch(`${this.url}/editOffenderInfo/${offender._id}`, offender)
    return this.http.patch(`${this.url}/editOffenderInfo/${offender._id}`, offender)
  }
  verifyOffender(id ,value) {
    return this.http.patch(`${this.url}/verify/${id}`, {"verified": value});
  }

   deleteOffender(id): any {
    return this.http.delete(`${this.url}/deleteOffender/${id}`)
  }

}
