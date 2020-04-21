import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location){
    return this.http.get('http://api.weatherstack.com/current?access_key=9bac0cda3ab951f95f64bd8c41a76b96&query='+location);
  }
}
