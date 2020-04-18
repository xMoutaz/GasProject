import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  emailLogin(value) {
    console.log(value);
    this.auth.emailLogin(value.email, value.password);
  }

  googleLogin() {
    this.auth.googlelogin();
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }

}
