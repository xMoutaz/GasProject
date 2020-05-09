import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffendersService } from '../services/offenders.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offender-view',
  templateUrl: './offender-view.component.html',
  styleUrls: ['./offender-view.component.css']
})
export class OffenderViewComponent implements OnInit {

  offenderId:string;
  offender$:Observable<any>;

  constructor(private route: ActivatedRoute, private offenderSerivce: OffendersService, private _location: Location) { 
    this.offenderId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.offender$ = this.offenderSerivce.getOffender(this.offenderId).pipe(
      filter(resp => !!resp),
      map(resp => resp['data']));
  }

  backButton() {
    this._location.back();
  }

}
