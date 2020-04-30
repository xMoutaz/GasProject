import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offender } from '../models/offender';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class OffendersService {
  readonly url = 'https://marriage-bandits.herokuapp.com/offenders';

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
