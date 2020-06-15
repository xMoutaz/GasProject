import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  readonly url = `${environment.baseUrl}/priceList`;

  constructor(private http: HttpClient) { }

  getSalePriceList() {
  return this.http.get(`${this.url}/sale`);
  }

  getRentPriceList() {
    return this.http.get(`${this.url}/rent`);
  }
}
