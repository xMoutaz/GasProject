import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { Marriage } from '../models/marriage';

@Injectable({
  providedIn: 'root'
})
export class MarriageService {

  readonly url = "https://marriage-bandits.herokuapp.com/marriage";
  readonly localurl = "http://localhost:8081/marriage";

  constructor(private http: HttpClient) { }

  registerMarriage(marriageInfo) {
    return this.http.post(`${this.url}/createMarriage`, marriageInfo);
  }

  getMarriages(pg, pgS, searchedHusband: Person, searchedWife: Person, searchedMarriage: Marriage) {
    return this.http.get(`${this.url}/search/viewMarriage?pg=${pg}&pgS=${pgS}&husbandFirstName=${searchedHusband.firstName}&husbandLastName=${searchedHusband.lastName}&wifeFirstName=${searchedWife.firstName}&wifeLastName=${searchedWife.lastName}&marriageDate=${searchedMarriage.dateOfMarriage}`)
  }

  getMarriageInfo(marriageId) {
    return this.http.get(`${this.url}/search/MarriageView/${marriageId}`)
  }
}

export interface ViewMarriage {
  husband: Person,
  wife: Person,
  witness1: Person,
  witness2: Person,
  marriage: Marriage
}
