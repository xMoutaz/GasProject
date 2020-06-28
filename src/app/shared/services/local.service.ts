import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  readonly url = `${environment.baseUrl}/local`;

  constructor(private http: HttpClient) { }

  createLocal(local) {
    return this.http.post(`${this.url}/createLocal`, local);
  }
  
  updateLocal(_id, local) {
    return this.http.patch(`${this.url}/editLocal/${_id}`, local);

  }
}
