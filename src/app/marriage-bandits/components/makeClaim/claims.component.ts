import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimsService } from '../../services/claims.service';
import { OffendersService } from '../../services/offenders.service';
import { switchMap, tap } from 'rxjs/operators';
import { Claim } from '../../models/claim';
import { ClaimantService } from '../../services/claimant.service';
import { Router } from '@angular/router';

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
  claim: Claim = {claimant_id: '', offender_id: '', evidence: null, dateOfEntry: new Date(), extraDetails: ''};
  
  constructor(private claimsService: ClaimsService,private _formBuilder: FormBuilder, private router: Router,
    private claimntServer: ClaimantService,private offenderServer: OffendersService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress:[''],
      phoneNumber:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      alsoKnownAs: [''],
      address:[''],
      dateOfBirth:[''],
      description:[''],
      masjid:[''],
      phoneNumber:[''],
      pictures:['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      extraDetails: [''],
      supportingProof: ['']
    });
  }

  submitClaim() {
    this.claimntServer.createClaimnt(this.firstFormGroup.value).pipe(
      (tap((data: any) => { this.claim.claimant_id= data.data._id})),
      switchMap(() => this.offenderServer.createOffender(this.secondFormGroup.value)),
      (tap((data: any) => { this.claim.extraDetails = this.thirdFormGroup.value; this.claim.offender_id = data.data._id})),
      switchMap((data:any)=> this.claimsService.makeClaime(this.claim))
    ).subscribe(data => {
      this.router.navigate(["claimConfirmation"]);
      console.log(data)});
  }
}
