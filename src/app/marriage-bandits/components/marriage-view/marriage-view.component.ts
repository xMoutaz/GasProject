import { Component, OnInit } from '@angular/core';
import { MarriageService } from '../../services/marriage.service';
import { filter } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HusbandService } from '../../services/husband.service';
import { WifeService } from '../../services/wife.service';
import { WitnessService } from '../../services/witness.service';
import * as moment from 'moment-mini';

@Component({
  selector: 'app-marriage-view',
  templateUrl: './marriage-view.component.html',
  styleUrls: ['./marriage-view.component.css']
})
export class MarriageViewComponent implements OnInit {
  
  husbandAge: number;
  wifeAge: number;
  witness1Age: number;
  witness2Age: number;
  viewWitnesses: boolean = false;
  viewWali: boolean = false;
  editState = {
    husband: false,
    wife:false,
    witness1:false,
    witness2:false,
    marriage:false
  };
  marriage= {_id:'', mahr:'', institution: '', dateOfMarriage: '',
  husband: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:'', isFlagged: false},
  wife: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:'', isFlagged: false},
  witness1: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:'', isFlagged: false},
  witness2: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:'', isFlagged: false}
  };
  

  constructor(private marriageService: MarriageService, private route: ActivatedRoute, private _location: Location,
    private husbandService: HusbandService, private wifeService: WifeService, private witnessService: WitnessService,
    private router: Router) { 
    this.marriage._id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.marriageService.getMarriageInfo(this.marriage._id).pipe(filter((data:any) => !!data.success))
    .subscribe((data: any) => {
      console.log(data);
      this.marriage = data.data[0];
      this.husbandAge = Math.floor(Math.abs(Date.now() - new Date(data.data[0].husband.dateOfBirth).getTime())/(1000 * 3600 * 24) / 365.25);
      this.wifeAge = Math.floor(Math.abs(Date.now() - new Date(data.data[0].wife.dateOfBirth).getTime())/(1000 * 3600 * 24) / 365.25);      
      this.witness1Age = Math.floor(Math.abs(Date.now() - new Date(data.data[0].witness1.dateOfBirth).getTime())/(1000 * 3600 * 24) / 365.25);      
      this.witness2Age = Math.floor(Math.abs(Date.now() - new Date(data.data[0].witness2.dateOfBirth).getTime())/(1000 * 3600 * 24) / 365.25);      
      console.log(this.marriage);
    });
  }

  dateFormat(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  onSubmit(entity){
    this.editState[entity] = false;
    if(entity == 'husband'){ 
      this.husbandService.editHusbandInfo(this.marriage.husband)
      .subscribe(data => console.log(data));
    }
    if(entity == 'wife'){
      this.wifeService.editWifeInfo(this.marriage.wife)
      .subscribe(data => console.log(data));
    }
    if(entity == 'witness1') {
      this.witnessService.editWitnessInfo(this.marriage.witness1)
      .subscribe(data => console.log(data));
    }
    if(entity == 'witness2') {
      this.witnessService.editWitnessInfo(this.marriage.witness2)
      .subscribe(data => console.log(data));
    }
    if(entity == 'marriage'){
      this.marriageService.editMarriageInfo(this.marriage)
      .subscribe(data => console.log(data));
     }
  }

  backButton() {
    this._location.back();
  }

  registerDivorce() {
    this.router.navigate([`registerDivorce/${this.marriage._id}`])
  }
}
