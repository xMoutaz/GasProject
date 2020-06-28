import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RefDataService } from 'src/app/moopla/services/ref-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalService } from 'src/app/shared/services/local.service';


@Component({
  selector: 'app-view-edit-ref-data',
  templateUrl: './view-edit-ref-data.component.html',
  styleUrls: ['./view-edit-ref-data.component.css']
})
export class ViewEditRefDataComponent implements OnInit {

  refDataId: string;
  editState = {
    refData: false,
    priceList: false,
    local: false
  };
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private _location: Location, 
    private refDataService: RefDataService, private localService: LocalService) {
    this.refDataId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
      this.refDataService.getRefData(this.refDataId).subscribe(data => {
      this.firstFormGroup = this._formBuilder.group({
        _id: [data[0]._id == undefined? '': data[0]._id],
        country: [data[0].country == undefined? '': data[0].country],
        currencyCode: [data[0].currencyCode == undefined? '': data[0].currencyCode],
        rentPeriod: [data[0].rentPeriod == undefined? '': data[0].rentPeriod],
      });
      this.secondFormGroup = this._formBuilder.group({
        _id: [data[0].local._id == undefined? '': data[0].local._id],
        local: [data[0].local.local == undefined? '': data[0].local.local],
        description: [data[0].local.description == undefined? '': data[0].local.description],
        shortDateFormat: [data[0].local.shortDateFormat == undefined? '': data[0].local.shortDateFormat],
        longDateFormat: [data[0].local.longDateFormat == undefined? '': data[0].local.longDateFormat],
        timeFormat: [data[0].local.timeFormat == undefined? '': data[0].local.timeFormat],
        decimalFormat: [data[0].local.decimalFormat == undefined? '': data[0].local.decimalFormat],
        systemDefault: [data[0].local.systemDefault == undefined? '': data[0].local.systemDefault],
      })
    })
  }

  onSubmit(entity){
    this.editState[entity] = false;
    if(entity == 'refData'){ 
      this.refDataService.updateRefData(this.firstFormGroup.value._id,this.firstFormGroup.value)
      .subscribe(data => {
        console.log(data);
      })
    }
    if(entity == 'local') {
      this.localService.updateLocal(this.secondFormGroup.value._id, this.secondFormGroup.value)
      .subscribe(data => {
        console.log(data);
      })
    }
  }

  backButton(){
    this._location.back();
  }

}
