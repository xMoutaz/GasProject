import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Marriage } from '../models/marriage';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MarriageService {

  readonly url = `${environment.baseUrl}/marriage`;

  constructor(private http: HttpClient) { }

  registerMarriage(marriageInfo) {
    return this.http.post<ApiResponse<Marriage>>(`${this.url}/createMarriage`, marriageInfo);
  }

  getMarriages(pg, pgS, searchedHusband: Person, searchedWife: Person, searchedMarriage: Marriage, institustion: string) {        
    console.log(`${this.url}/search/viewMarriage?pg=${pg}&pgS=${pgS}&husbandFirstName=${searchedHusband.firstName}&husbandLastName=${searchedHusband.lastName}&wifeFirstName=${searchedWife.firstName}&wifeLastName=${searchedWife.lastName}&marriageDate=${searchedMarriage.dateOfMarriage}&_id=${institustion}`);
    
    return this.http.get(`${this.url}/search/viewMarriage?pg=${pg}&pgS=${pgS}&husbandFirstName=${searchedHusband.firstName}&husbandLastName=${searchedHusband.lastName}&wifeFirstName=${searchedWife.firstName}&wifeLastName=${searchedWife.lastName}&marriageDate=${searchedMarriage.dateOfMarriage}&_id=${institustion}`)
  }

  getMarriageInfo(marriageId) {
    return this.http.get(`${this.url}/search/MarriageView/${marriageId}`)
  }

  editMarriageInfo(marriage: any) {
    return this.http.patch(`${this.url}/editMarriage/${marriage._id}`, marriage);
  }

}

export interface ViewMarriage {
  husband: Person,
  wife: Person,
  witness1: Person,
  witness2: Person,
  marriage: Marriage
}
