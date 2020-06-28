import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RefDataService } from 'src/app/moopla/services/ref-data.service';
import { LocalService } from 'src/app/shared/services/local.service';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private refDataService: RefDataService, private localService: LocalService) { }

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
      local_id: ['']
    });

  }




  createRefData() {
    this.localService.createLocal(this.firstFormGroup.value).pipe(
      (tap((data: any) => {
        console.log(data);
        this.secondFormGroup.patchValue({local_id: data._id})
      })
      ),
      switchMap(data => this.refDataService.creatRefData(this.secondFormGroup.value))
    ).subscribe(data => {
      console.log(data);
      this.router.navigate(['']);
    })
  }

  }
