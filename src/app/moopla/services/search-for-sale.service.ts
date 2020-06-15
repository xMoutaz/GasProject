import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchedProperty } from '../models/for-sale';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchForSaleService {

  readonly url = `${environment.baseUrl}/forSale`;

  constructor(private http: HttpClient) { }

  searchPropertiesForSale(searchedProperty) {
    console.log(`${this.url}/getSaleProperties?addedd=${searchedProperty.addedd}&location[0]=${searchedProperty.location0}&location[1]=${searchedProperty.location1}&minPrice=${searchedProperty.minPrice}&maxPrice=${searchedProperty.maxPrice}&sortedBy=${searchedProperty.sortedBy}&bedrooms=${searchedProperty.bedrooms}&propertyType=${searchedProperty.propertyType}&distanceFromLocation=${searchedProperty.distanceFromLocation}`);
    return this.http.get(`${this.url}/getSaleProperties?addedd=${searchedProperty.addedd}&location[0]=${searchedProperty.location0}&location[1]=${searchedProperty.location1}&minPrice=${searchedProperty.minPrice}&maxPrice=${searchedProperty.maxPrice}&sortedBy=${searchedProperty.sortedBy}&bedrooms=${searchedProperty.bedrooms}&propertyType=${searchedProperty.propertyType}&distanceFromLocation=${searchedProperty.distanceFromLocation}`)
  }
  
}
