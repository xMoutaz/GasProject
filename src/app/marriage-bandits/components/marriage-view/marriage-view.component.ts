import { Component, OnInit } from '@angular/core';
import { MarriageService } from '../../services/marriage.service';
import { filter } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-marriage-view',
  templateUrl: './marriage-view.component.html',
  styleUrls: ['./marriage-view.component.css']
})
export class MarriageViewComponent implements OnInit {
  
  marriageId:string;
  editState = {
    husband: false,
    wife:false,
    witness:false,
    marriage:false
  };
  marriage= {_id:'', mahr:'', institution: '', dateOfMarriage: '',
  husband: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''},
  wife: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''},
  // witness1: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''},
  // witness2: {_id: '', firstName: '', lastName: '', address: '', postCode: '', dateOfBirth: '', identificationId:''}
};
  husbandAge: number;
  wifeAge: number;

  constructor(private marriageService: MarriageService, private route: ActivatedRoute, private _location: Location) { 
    this.marriageId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.marriageService.getMarriageInfo(this.marriageId).pipe(filter((data:any) => !!data.success))
    .subscribe((data: any) => {
      console.log(data);
      this.marriage = data.data[0];
      this.husbandAge = Math.floor(Math.abs(Date.now() - new Date(data.data[0].husband.dateOfBirth).getTime())/(1000 * 3600 * 24) / 365.25);
      this.wifeAge = Math.floor(Math.abs(Date.now() - new Date(data.data[0].wife.dateOfBirth).getTime())/(1000 * 3600 * 24) / 365.25);
      console.log(this.husbandAge, this.wifeAge);
      
    });
    console.log(this.marriage);
  }

  onSubmit(entity){
    this.editState[entity] = false;
    // if(entity == 'husband'){ }
    // if(entity == 'wife'){}
    // if(entity == 'marriage'){ }
  }

  backButton() {
    this._location.back();
  }
}
