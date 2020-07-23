import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class PriceListService {

  readonly url = `${environment.baseUrl}/priceList`;

  constructor(private http: HttpClient) { }

  createpriceList(priceList) {
    return this.http.post(`${this.url}/createPriceList`, priceList);
  }
  
  updatepriceList(_id, priceList) {
    return this.http.patch(`${this.url}/editPriceList/${_id}`, priceList);
  }

  deletePrice(_id) {
    return this.http.delete(`${this.url}/deletePrice/${_id}`);
  }
}
