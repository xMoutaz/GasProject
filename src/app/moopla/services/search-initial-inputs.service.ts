import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchInitialInputsService {

  constructor() { }

  ForSaleSearch: any = {
    propertyTypes: ['HOUSE', 'APARTMENT', 'LAND'],
    maxPrices: [100000, 500000, 10000000],
    minPrices: [10000, 50000, 100000],
    distances: ['10', '20', '50'],
    bedrooms: [1 , 2 , 3],
    coordinates: []
  }

  ForRentSearch: any = {
    propertyTypes: ['HOUSE', 'APARTMENT', 'LAND'],
    maxPrices: [1000, 20000, 30000],
    minPrices: [100, 200, 300],
    distances: ['10', '20', '50'],
    bedrooms: [1 , 2 , 3],
    coordinates: []
  }
}
