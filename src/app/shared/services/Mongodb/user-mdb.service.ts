import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root'
})
export class UserMdbService {
  
  selectedUser: User;
  users: User[];
  readonly baseURL = 'https://gas-apiv0.herokuapp.com/users';
  commingUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  get(_id): Observable<User> {
    return this.http.get<User>(this.baseURL +`/${_id}`);
  }

  getTotalRecord(user?:User) {
    return this.http.get<ApiResponse<number>>(this.baseURL +`/search/count?_id=${user._id}&&userName=${user.name}`)
  }

  saveUser(newUser: User) {
    return this.http.post<ApiResponse<User>>(this.baseURL, newUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  checkUserInfo(_id) {
    return this.http.get<ApiResponse<User>>(this.baseURL +`/${_id}`)
  }

  deleteUser(_id) {
   return this.http.delete<ApiResponse<void>>(this.baseURL+ `/${_id}`)
  }

  searchUser(pg: number,pgS:number, user?: User) {
    return this.http.get<ApiResponse<User[]>>(`${this.baseURL}/search/user/?pg=${pg}&&pgS=${pgS}&&_id=${user._id}&&userName=${user.name}`)
  }

  setAdmin(data) {
    return this.http.patch<ApiResponse<any>>(`${this.baseURL}/setAdmin/${data._id}`, data)
  }

  updateUserInfo(user: User) {
    return this.http.patch<ApiResponse<any>>(`${this.baseURL}/${user._id}` , user);
  }
}