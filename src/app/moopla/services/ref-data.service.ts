import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefDataService {

  readonly url = `${environment.baseUrl}/refData`;
  
  constructor(private http: HttpClient) { }

  getRefData(_id) {
    return this.http.get(`${this.url}/getSpecificRefData/${_id}`);
  }

  searchRefData(searchedQ,pgS, pgN) {
    return this.http.get(`${this.url}/getRefData?_id=${searchedQ.value._id}&country=${searchedQ.value.country}&pgN=${pgN}&pgS=${pgS}`);
  }

  creatRefData(refData) {
    return this.http.post(`${this.url}/createRefData/`, refData);
  }

  updateRefData(_id, updatedRefData) {
    return this.http.patch(`${this.url}/editRefData/${_id}`, updatedRefData);
  }
}
