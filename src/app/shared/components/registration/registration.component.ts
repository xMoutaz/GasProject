import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser = new User();

  constructor(private auth: AuthService) { }

  tryRegister(newUser) {
    this.auth.signup(newUser);
  }

  ngOnInit() {
  }

  googleLogin() {
    this.auth.googlelogin();
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }

}
