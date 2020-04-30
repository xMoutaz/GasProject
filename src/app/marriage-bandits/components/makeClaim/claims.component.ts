import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class MakeClaimComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress:[''],
      phoneNumber:[''],
      pictures:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      alsoKnownAs: [''],
      address:[''],
      dateOfBirth:[''],
      description:[''],
      masjid:[''],
      phoneNumber:['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      extraDetails: [''],
      supportingProof: ['']
    });
  }
}
