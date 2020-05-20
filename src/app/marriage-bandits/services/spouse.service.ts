import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpouseService {
  readonly url = `${environment.baseUrl}/spouse`;

  constructor(private http: HttpClient) { }

  findMaleSpouse() {
    return this.http.get(`${this.url}/search/viewMaleSpouse?pg=0&pgS=10&husbandFirstName=&husbandLastName=&wifeFirstName=&wifeLastName=&marriageDate=`);
  }

  findFemaleSpouse() {
    return this.http.get(`${this.url}/search/viewFemaleSpouse?pg=0&pgS=10&husbandFirstName=&husbandLastName=&wifeFirstName=&wifeLastName=&marriageDate=`);
  }

  getPartners(pg?, pgS?, searchedPerson?, gender?) {
    return this.http.get(`${this.url}/search/searchByGender?pg=${pg}&pgS=${pgS}&FirstName=${searchedPerson.firstName}&LastName=${searchedPerson.lastName}&gender=${gender}`);
  }

  getPartner(_id, gender) {    
    return this.http.get(`${this.url}/search/searchByIdGender?_id=${_id}&gender=${gender}`);
  }

}
