import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchedProperty } from '../models/for-sale';

@Injectable({
  providedIn: 'root'
})
export class SearchForSaleService {

  readonly url = 'http://localhost:8081/forSale/getSaleProperties'

  constructor(private http: HttpClient) { }

  searchPropertiesForSale(searchedProperty: SearchedProperty) {
    return this.http.get(`${this.url}/?addedd=${searchedProperty.addedd}&location[0]=${searchedProperty.location[0]}&location[1]=${searchedProperty.location[1]}&minPrice=${searchedProperty.minPrice}&maxPrice=${searchedProperty.maxPrice}&sortedBy=${searchedProperty.sortedBy}&bedrooms=${searchedProperty.bedRooms}&propertyType=${searchedProperty.propertyType}&distanceFromLocation=${searchedProperty.distanceFromLocation}`)
  }
}
