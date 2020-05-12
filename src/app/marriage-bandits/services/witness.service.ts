import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class WitnessService {
  
  readonly url = "https://marriage-bandits.herokuapp.com/witness";
  // readonly url = "http://localhost:8081/witness";

  constructor(private http: HttpClient) { }

  createWitness(witness) {
    return this.http.post(`${this.url}/createWitness`, witness);
  }

  editWitnessInfo(witness: Person) {
    return this.http.patch(`${this.url}/editWitness/${witness._id}`, witness);
  }
}
