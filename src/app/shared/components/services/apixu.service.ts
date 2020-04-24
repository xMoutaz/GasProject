import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(){
    return this.http.get('https://api.weatherapi.com/v1/current.json?key=d81fa446d9bb4d99815111105202404&q=Tetouan');
  }
}
