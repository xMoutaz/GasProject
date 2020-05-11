import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from '../services/apixu.service';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';
import { Router } from '@angular/router';
import { MarriageBanditsUserService } from '../../services/Mongodb/marriage-bandits-user.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appUser: any;

  constructor(private auth: AuthService, private mbS : MarriageBanditsUserService, private router: Router, private store: Store<AppState>) { }


  ngOnInit() {
    // TODO: -Access user from store here and display user name in welcome message
    this.store.select(store => store.User.user)
      .pipe(filter((data) => !!data))
      .subscribe(data => {
        this.appUser = data;
      });
  }

  makeClaim(){
    this.router.navigate(['makeClaim']);
  }

  registerMarriage() {
    this.router.navigate(['registerMarriage']);
  }
}