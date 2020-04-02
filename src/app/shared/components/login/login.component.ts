import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

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

  forgetPassword(email) {    
    this.auth.forgetPassword(email);
  }
}
