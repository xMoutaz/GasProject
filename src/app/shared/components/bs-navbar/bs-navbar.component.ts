import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMdbService } from '../../services/Mongodb/user-mdb.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: User;
  HOME = 'HOME';

  id : string = '';

  constructor(public auth: AuthService, private userServiceMdb: UserMdbService) {  
     
  }
   ngOnInit() {
     this.auth.user$.subscribe(user => {
       if(user) {         
         this.id = user.uid;
         this.setAppUser();
        }
        });
        
}
  setAppUser() {
    this.userServiceMdb.get(this.id).subscribe((data: User)=> {
      this.appUser = data;
    })
  }
  logout() {
    this.auth.logout();
    this.appUser = null;
  }

}
