import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: User;

  constructor(private http: HttpClient, private auth: AuthService) { }

  tryRegister(newUser) {
    this.auth.signup(newUser);
  }

  ngOnInit() {
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }

  googleLogin() {
    this.auth.googlelogin();
  }

}
