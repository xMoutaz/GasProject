import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WitnessService {
  
  readonly url = `${environment.baseUrl}/witness`;
  // readonly url = `https://marriage-bandits.herokuapp.com/witness`;
  
  constructor(private http: HttpClient) { }

  createWitness(witness) {
    return this.http.post(`${this.url}/createWitness`, witness);
  }

  editWitnessInfo(witness: Person) {
    return this.http.patch(`${this.url}/editWitness/${witness._id}`, witness);
  }
}
