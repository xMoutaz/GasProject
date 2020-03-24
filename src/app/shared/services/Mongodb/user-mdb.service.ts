import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserMdbService {
  
  selectedUser: User;
  users: User[];
  readonly baseURL = 'http://localhost:3000/users';
  commingUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  // Getting all user
  get(_id) {
    return this.http.get(this.baseURL +`/${_id}`);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  saveUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.baseURL, newUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // After Login check if the user have entered his Address data
  checkUserInfo(_id):Observable<User> {
    return this.http.get<User>(this.baseURL +`/${_id}`)
  }

  deleteUser(_id) {
   return this.http.delete<void>(this.baseURL+ `/${_id}`)
  }

}