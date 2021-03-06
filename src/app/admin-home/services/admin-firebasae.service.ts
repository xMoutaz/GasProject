import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminFirebasaeService {

  readonly baseURL = 'https://us-central1-gasproject-2f4cb.cloudfunctions.net/deleteUser';

  constructor( private http: HttpClient) {
  }

  deleteFBUser(uid) {
    return this.http.delete<void>(`${this.baseURL}?uid=${uid}`);
  }
}
