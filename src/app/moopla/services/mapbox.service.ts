import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  accessToken = 'access_token=pk.eyJ1IjoieG1vdXRheiIsImEiOiJjazVvM3RubzUxMXppM21ydzQ5dDI4ZnY3In0.4gqa8rQR0W0VXixe51JxbA';

  constructor(private http: HttpClient) {
  }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.getLocation(term)));
  }

  getLocation(query) {
    return this.http.get(`${this.baseUrl}/${query}.json?${this.accessToken}`);
  }

}
