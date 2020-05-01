import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-confirmation',
  templateUrl: './claim-confirmation.component.html',
  styleUrls: ['./claim-confirmation.component.css']
})
export class ClaimConfirmationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  home(){
    this.router.navigate(["/"]);
  }

}
