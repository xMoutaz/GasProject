import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claim-view',
  templateUrl: './claim-view.component.html',
  styleUrls: ['./claim-view.component.css']
})
export class ClaimViewComponent implements OnInit {

  claimId:string;

  constructor(private route: ActivatedRoute) {
    this.claimId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
  }

}
