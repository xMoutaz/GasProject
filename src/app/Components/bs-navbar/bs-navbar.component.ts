import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: User;

  constructor(public auth: AuthService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
  
  logout() {
    this.auth.logout();
  }

}
