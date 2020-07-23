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

  testForRent() {
    let propertyType = '';
    return this.http.get(`http://localhost:8081/forRent/testingFacet?added=2019-06-06T18:36:09.456Z&location[0]=-5.36667&location[1]=35.56667&minPrice=0&maxPrice=10000000&sortedBy=oldest&distanceFromLocation=10000&furnished=&sharedAccommodation=&minBedrooms=&maxBedrooms=&propertyType=${propertyType}`)
  }

}
