import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMdbService } from '../../services/Mongodb/user-mdb.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy{
  appUser: any;
  HOME = 'HOME';

  id : string = '';
  subscription : Subscription;

  constructor(public auth: AuthService, private userServiceMdb: UserMdbService) {  
     
  }
   ngOnInit() {
     this.auth.appUser$.subscribe(
       (data: User) => {
         console.log(data);
       this.appUser = data;
       }
       );

    // this.subscription =  this.auth.user$.subscribe(user => {
    //    if(user) {  
    //     this.appUser = user; 
    //    }
    //   });
    }

    ngOnDestroy() {
      // this.subscription.unsubscribe();
    }

  logout() {
    this.auth.logout();
    this.appUser = null;
  }

}
