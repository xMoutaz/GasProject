import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ClaimsService } from '../../services/claims.service';
import { filter } from 'rxjs/operators';

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
      email:""
    },
    claim:{
      extraDetails: "",
      loggedTime: ""
    }
  }

  constructor(private claimService: ClaimsService, private route: ActivatedRoute, private _location: Location, private claimsService: ClaimsService) {
    this.claimId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.claimService.searchClaimView(this.claimId).pipe(filter((data:any) => !!data.success)).subscribe((data: any) => {
      console.log(data)
      this.claim.claim.extraDetails = data.data[0].extraDetails;
      this.claim.claim.loggedTime = data.data[0].dateOfEntry;
      this.claim.claimant = data.data[0].claimant;
      this.claim.offender = data.data[0].offender;
    })
    console.log(this.claim);
  }

  verifyButton() {
    this.verified = true;
    this.claimsService.verifyClaim( this.claimId ,this.verified).subscribe(data => console.log(data));
  }

  onSubmit(entity){
    this.editState[entity] = false;
  }

  backButton(){
    this._location.back();
  }
}
