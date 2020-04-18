import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  email: string;
  passwordSent: Boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  forgetPassword() {
    this.auth.forgetPassword(this.email);
    this.passwordSent= true;
  }

}
