import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClaimsService } from '../../services/claims.service';
import { filter } from 'rxjs/operators';
import { OffendersService } from '../../services/offenders.service';
import { ClaimantService } from '../../services/claimant.service';

@Component({
  selector: 'app-claim-view',
  templateUrl: './claim-view.component.html',
  styleUrls: ['./claim-view.component.css']
})
export class ClaimViewComponent implements OnInit {

  claimId:string;
  verified: boolean =  true;
  editState = {
    claim: false,
    claimant:false,
    offender:false
  };
  // TODO:- Make this an interface in the claim service
  claim = {
    offender:{
      _id:"",
      firstName:"",
      lastName: "",
      alsoKnownAs:"",
      address:"",
      dateOfBirth: "",
      description: "",
      masjid:"",
      verified:true
    },
    claimant:{
      firstName:"",
      lastName: "",
      phoneNumber:"",
      emailAddress:""
    },
    claim:{
      _id: "",
      extraDetails: "",
      loggedTime: ""
    }
  }

  constructor(private claimService: ClaimsService, private route: ActivatedRoute, private _location: Location, 
    private claimantService: ClaimantService, private offenderService: OffendersService) {
    this.claimId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.claimService.searchClaimView(this.claimId).pipe(filter((data:any) => !!data.success)).subscribe((data: any) => {
      console.log(data)
      this.claim.claim.extraDetails = data.data[0].extraDetails;
      this.claim.claim.loggedTime = data.data[0].dateOfEntry;
      this.claim.claim._id = data.data[0]._id;
      this.claim.claimant = data.data[0].claimant;
      this.claim.offender = data.data[0].offender;
    })
    console.log(this.claim);
  }

  verifyButton() {
    this.verified = true;
    console.log(this.claim.offender);
    console.log(this.claim.claimant);
    this.offenderService.verifyOffender( this.claim.offender._id ,this.verified).pipe(filter((data: any) => !!data.success))
    .subscribe(data => this.claim.offender.verified = true);
  }

  onSubmit(entity){
    this.editState[entity] = false;
    if(entity == 'offender'){this.offenderService.editOffenderInfo(this.claim.offender).subscribe(data=> console.log(data)); }
    if(entity == 'claim'){this.claimService.editClaimInfo(this.claim.claim).subscribe(data=> console.log(data)); }
    if(entity == 'claimant'){this.claimantService.editClaimantInfo(this.claim.claimant).subscribe(data=> console.log(data)); }
  }

  

  backButton(){
    this._location.back();
  }
}
