import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  appUser: any;
  HOME = 'HOME';
  id: string = '';
  btnWord = '';
  subscription: Subscription;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user$.subscribe((user: User) => this.appUser = user);
    this.auth.appUser$.pipe(filter((data) => !!data))
    .subscribe((data) =>{
          console.log(data);
          this.btnWord = data.name.slice(0,1);
          this.appUser.isAdmin = data.isAdmin;
    });
  }

  ngOnDestroy() {
  }

  logout() {
    this.auth.logout();
    this.appUser = null;
  }

}