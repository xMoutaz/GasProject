import { Injectable } from '@angular/core';
import { Address } from '../../models/address';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressMdbService {
  
  selectedUser: Address;
  Addresses: Address[];
  readonly baseURL = '';
  
  constructor(private http: HttpClient) { }

  saveAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.baseURL , address);
  }

  get(_id) {
    return this.http.get(this.baseURL +`/${_id}`);
  }

  updateAddress(_id, address: Address): Observable<Address> {
    return this.http.patch<Address>(this.baseURL + `/${_id}`, address);
  }

  deleteAddress(_id) {
    return this.http.delete<void>(this.baseURL+ `/${_id}`)
   }

  }
