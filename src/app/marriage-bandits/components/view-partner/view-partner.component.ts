import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpouseService } from '../../services/spouse.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment-mini';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-partner',
  templateUrl: './view-partner.component.html',
  styleUrls: ['./view-partner.component.css']
})
export class ViewPartnerComponent implements OnInit {

  partner_id: string;
  gender: string;
  partner$ = new Observable<any>();
  partnerInformation:any = {};
  
  constructor(private route: ActivatedRoute, private spoucseService: SpouseService, private _location: Location) {
    debugger;
    this.partner_id = this.route.snapshot.queryParams._id;
    this.gender = this.route.snapshot.queryParams.gender;
    this.partnerInformation =  this.route.snapshot.queryParams;
   }

  ngOnInit(): void {
   this.partner$ =  this.spoucseService.getPartner(this.partner_id, this.gender).pipe(map((res: any) => res.data[0].marriages));
  }

  dateFormat(date) {
    if(date){
    return moment(date).format("DD/MM/YYYY")}
    else return "Not Divorced"
  }

  back() {
    this._location.back();
  }
}
