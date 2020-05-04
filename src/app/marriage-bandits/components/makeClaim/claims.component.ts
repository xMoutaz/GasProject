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
  claim: Claim = { claimant_id: '', offender_id: '', evidence: null, dateOfEntry: new Date(), extraDetails: '' };
  selectedImage: any;
  offenderformData = new FormData();
  evidenceformData = new FormData();

  constructor(private claimsService: ClaimsService, private _formBuilder: FormBuilder, private router: Router,
    private claimntServer: ClaimantService, private offenderServer: OffendersService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: [''],
      phoneNumber: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      alsoKnownAs: [''],
      address: [''],
      dateOfBirth: [''],
      description: [''],
      masjid: [''],
      phoneNumber: [''],
      pictures: [''],
      file: [null],
    });
    this.thirdFormGroup = this._formBuilder.group({
      extraDetails: [''],
      supportingProof: ['']
    });
  }

  selectImage(event, val) {
    if (val === 'offender') {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.selectedImage = file;
        this.offenderformData.append('myFile', this.selectedImage);
      }
      if (val === 'claim') {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.selectedImage = file;
          this.evidenceformData.append('myFile', this.selectedImage);
        }
      }
    }
  }



  submitClaim() {
    this.offenderformData.append('firstName', this.secondFormGroup.get('firstName').value);
    this.offenderformData.append('lastName', this.secondFormGroup.get('lastName').value);
    this.offenderformData.append('alsoKnownAs', this.secondFormGroup.get('alsoKnownAs').value);
    this.offenderformData.append('address', this.secondFormGroup.get('address').value);
    this.offenderformData.append('dateOfBirth', this.secondFormGroup.get('dateOfBirth').value);
    this.offenderformData.append('description', this.secondFormGroup.get('description').value);
    this.offenderformData.append('masjid', this.secondFormGroup.get('masjid').value);
    this.offenderformData.append('phoneNumber', this.secondFormGroup.get('phoneNumber').value);
    this.offenderformData.append('pictures', this.secondFormGroup.get('pictures').value);
    this.evidenceformData.append('extraDetails', this.thirdFormGroup.get('extraDetails').value);
    debugger;
    this.offenderServer.createOffender(this.offenderformData).subscribe(data => console.log(data));
  }
  //   this.claimntServer.createClaimnt(this.firstFormGroup.value).pipe(
  //     (tap((data: any) => { this.claim.claimant_id= data.data._id})),
  //     switchMap(() => this.offenderServer.createOffender(this.secondFormGroup.value)),
  //     (tap((data: any) => { this.claim.extraDetails = this.thirdFormGroup.value; this.claim.offender_id = data.data._id})),
  //     switchMap((data:any)=> this.claimsService.makeClaime(this.claim))
  //   ).subscribe(data => {
  //     this.router.navigate(["claimConfirmation"]);
  //     console.log(data)});
  // }
}
