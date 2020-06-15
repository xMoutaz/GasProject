import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchForRentService {

  readonly url = `${environment.baseUrl}/forRent`;
  
  constructor(private http: HttpClient) { }

  searchPropertiesForSale(searchedProperty) {
    return this.http.get(`${this.url}/getRentProperties/?addedd=${searchedProperty.addedd}&location[0]=${searchedProperty.location0}&location[1]=${searchedProperty.location1}&minPrice=${searchedProperty.minPrice}&maxPrice=${searchedProperty.maxPrice}&sortedBy=${searchedProperty.sortedBy}&bedrooms=${searchedProperty.bedRooms}&propertyType=${searchedProperty.propertyType}&distanceFromLocation=${searchedProperty.distanceFromLocation}`)
  }

}
