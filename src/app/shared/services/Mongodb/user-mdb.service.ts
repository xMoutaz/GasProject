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
  readonly baseURL = 'https://gas-apiv0.herokuapp.com/users';
  commingUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  get(_id) {
    return this.http.get(this.baseURL +`/${_id}`);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  getTotalRecord(user?:User) {
    return this.http.get(this.baseURL +`/search/count?_id=${user._id}&&userName=${user.name}`)
  }

  getDatatable(pg, pgS): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/dataTable/users?pg=${pg}&&pgS=${pgS}`)
  }

  saveUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.baseURL, newUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  checkUserInfo(_id):Observable<User> {
    return this.http.get<User>(this.baseURL +`/${_id}`)
  }

  deleteUser(_id) {
   return this.http.delete<void>(this.baseURL+ `/${_id}`)
  }

  searchUser(pg: number,pgS:number, user?: User): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/search/user/?pg=${pg}&&pgS=${pgS}&&_id=${user._id}&&userName=${user.name}`)
  }

  setAdmin(data) {
    return this.http.patch(`${this.baseURL}/setAdmin/${data._id}`, data)
  }

  updateUserInfo(user: User) {
    return this.http.patch(`${this.baseURL}/${user._id}` , user);
  }
}