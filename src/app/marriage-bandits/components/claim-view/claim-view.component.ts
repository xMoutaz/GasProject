import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claim-view',
  templateUrl: './claim-view.component.html',
  styleUrls: ['./claim-view.component.css']
})
export class ClaimViewComponent implements OnInit {

  claimId:string;
  claim = {
    offender:{
      firstName:"Ahmed",
      lastName: "Raza",
      alsoKnownAs:"AR",
      address:"236 Drakefell road",
      dateOfBirth: "24-09-1988",
      description: "Asian, Gold tooth",
      masjid:"Masjid Bilal",
      verified:true
    },
    claimaint:{
      firstName:"Clair",
      lastName: "Barne",
      phoneNumber:"",
      email:"email@email.com"
    },
    claim:{
      extraDetails: "Consumated the marriage and then ran away.",
      loggedTime: "25-4-2020 18:00"
    }
  }

  constructor(private route: ActivatedRoute) {
    this.claimId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
  }

}
