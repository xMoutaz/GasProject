import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RefDataService } from 'src/app/moopla/services/ref-data.service';
import { LocalService } from 'src/app/shared/services/local.service';
import { tap, switchMap } from 'rxjs/operators';
import { PriceListService } from 'src/app/shared/services/price-list.service';
import { Location } from '@angular/common';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = false;
  inputCtrl = new FormControl();
  
  constructor(private _formBuilder: FormBuilder, private router: Router, private priceListService: PriceListService,
    private refDataService: RefDataService, private localService: LocalService, private _location: Location) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      local: ['', Validators.required],
      description: ['', Validators.required],
      shortDateFormat: ['', Validators.required],
      longDateFormat: ['', Validators.required],
      timeFormat: ['', Validators.required],
      decimalFormat: ['', Validators.required],
      systemDefault: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      currencyCode: ['', Validators.required],
      rentPeriod: ['', Validators.required],
      local_id: [''],
      priceList_id: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      rentRange: [[]],
      saleRange: [[]]
    });
  }

  createRefData() {
    this.localService.createLocal(this.firstFormGroup.value).pipe(
      (tap((data: any) => {
        console.log(data);
        this.secondFormGroup.patchValue({local_id: data._id})
      })
      ),
      switchMap(data => this.priceListService.createpriceList(this.thirdFormGroup.value).pipe(
        (tap((data: any) => {
          this.secondFormGroup.patchValue({priceList_id: data._id})
        }))
      )),
      switchMap(data => this.refDataService.creatRefData(this.secondFormGroup.value))
    ).subscribe(data => {
      console.log(data);
      this._location.back();
    })
  }

  add(event: MatChipInputEvent, type): void {
    const input = event.input;
    const value = event.value;
    let copiedInput = (type =="sale")? this.thirdFormGroup.value.saleRange: this.thirdFormGroup.value.rentRange;

    if (value) {
      copiedInput.push(+value);
    }
    if (input) {
      input.value = '';
    }
    this.inputCtrl.setValue(null);
    console.log(this.thirdFormGroup.value);
  }

  remove(data: any, type): void {
  let copiedInput = (type =="sale")? this.thirdFormGroup.value.saleRange: this.thirdFormGroup.value.rentRange;
    const index = copiedInput.indexOf(data);

    if (index >= 0) {
      copiedInput.splice(index, 1);
    }
    console.log(this.thirdFormGroup.value);
        
  }
  
  }
