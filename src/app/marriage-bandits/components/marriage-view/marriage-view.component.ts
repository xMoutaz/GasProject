import { Component, OnInit } from '@angular/core';
import { MarriageService } from '../../services/marriage.service';
import { filter } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HusbandService } from '../../services/husband.service';
import { WifeService } from '../../services/wife.service';
import { WitnessService } from '../../services/witness.service';

@Component({
  selector: 'app-marriage-view',
  templateUrl: './marriage-view.component.html',
  styleUrls: ['./marriage-view.component.css']
})
export class MarriageViewComponent implements OnInit {
  
  marriageId:string;
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
  husband: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''},
  wife: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''},
  witness1: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''},
  witness2: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''}
  };
  

  constructor(private marriageService: MarriageService, private route: ActivatedRoute, private _location: Location,
    private husbandService: HusbandService, private wifeService: WifeService, private witnessService: WitnessService) { 
    this.marriageId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.marriageService.getMarriageInfo(this.marriageId).pipe(filter((data:any) => !!data.success))
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
}
