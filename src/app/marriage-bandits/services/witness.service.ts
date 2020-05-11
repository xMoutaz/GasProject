import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WitnessService {
  
  readonly url = "https://marriage-bandits.herokuapp.com/witness";
  readonly localurl = "http://localhost:8081/witness";

  constructor(private http: HttpClient) { }

  createWitness(witness) {
    return this.http.post(`${this.url}/createWitness`, witness);
  }
}
