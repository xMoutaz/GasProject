import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  newUser= {} as User;
  newUserForm: FormGroup;
  searchInput: any;

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 4 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 15 characters long' },
      { type: 'pattern', message: 'Your username must containe only letters' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    }

  constructor(private _formBuilder: FormBuilder, private auth: AuthService) { }
  
  ngOnInit() {
    this.newUserForm = this._formBuilder.group({
      name:['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z ]*')
      ])],
      email:['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")
      ])],
      password:['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
    })
  }

  tryRegister(value) {
    this.auth.signup(value);
  }

  facebookLogin() {
    this.auth.facebookLogin();
  }

  googleLogin() {
    this.auth.googlelogin();
  }

}
