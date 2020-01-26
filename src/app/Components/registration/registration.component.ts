import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser = new User();

  constructor(private auth: AuthService) { }

  tryRegister(value){
    this.auth.signup(value);
  }

  ngOnInit() {
  }

}
