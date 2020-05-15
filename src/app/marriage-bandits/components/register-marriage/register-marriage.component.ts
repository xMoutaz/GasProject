import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HusbandService } from '../../services/husband.service';
import { WifeService } from '../../services/wife.service';
import { WitnessService } from '../../services/witness.service';
import { MarriageService } from '../../services/marriage.service';
import { tap, switchMap, map } from 'rxjs/operators';
import { Marriage } from '../../models/marriage';
import { SpouseService } from '../../services/spouse.service';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import * as moment from 'moment-mini';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';

@Component({
  selector: 'app-register-marriage',
  templateUrl: './register-marriage.component.html',
  styleUrls: ['./register-marriage.component.css']
})
export class RegisterMarriageComponent implements OnInit {
  isLinear = true;
  selectedHusband = false;
  selectedWife = false;
  spouseFlaged: boolean = false;
  husbandFlagged: boolean = false;
  wifeFlagged: boolean = false;
  spouseNote: string= '';
  selectedFile: any;
  maleSpouseInfo: any;
  femaleSpouseInfo: any;
  HusbandFormGroup: FormGroup;
  husbandFormData = new FormData();
  wifeFormGroup: FormGroup;
  wifeFormData = new FormData();
  witness1FormGroup: FormGroup;
  witness1FormData = new FormData();
  witness2FormGroup: FormGroup;
  witness2FormData = new FormData();
  marriageFormGroup: FormGroup;
  identificationFormData = new FormData();
  marriageInfo: Marriage = { _id: '', mahr: '', institution_id: '', dateOfMarriage: '',  husbandId: '', wifeId: '', witness1Id: '', witness2Id: '' }
  maleSpouseInfo$ = new Observable<any>();
  femaleSpouseInfo$ = new Observable<any>();
  institutionName: string;

  @ViewChild('stepper') private myStepper: MatStepper;

  constructor(private router: Router, private _formBuilder: FormBuilder, private husbandService: HusbandService, private wifeService: WifeService,
    private witnessService: WitnessService, private marriageService: MarriageService, private spouseService: SpouseService, private store: Store<AppState>) { }

  dateFormat(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  ngOnInit(): void {
    this.store.select(store => store.User.user).subscribe(data => {
      this.marriageInfo.institution_id = data._id
    });
    this.maleSpouseInfo$ = this.spouseService.findMaleSpouse().pipe(map(resp => resp["data"]));
    this.femaleSpouseInfo$ = this.spouseService.findFemaleSpouse().pipe(map(resp => resp["data"]));

    this.HusbandFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      postCode: [''],
      dateOfBirth: [''],
      husbandID: ['']
    });
    this.wifeFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      postCode: [''],
      dateOfBirth: [''],
      wifeId: ['']
    });
    this.witness1FormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      postCode: [''],
      dateOfBirth: [''],
      witnessId: ['']
    });
    this.witness2FormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      postCode: [''],
      dateOfBirth: [''],
      witnessId: ['']
    });
    this.marriageFormGroup = this._formBuilder.group({
      dateOfNikkah: [''],
      mahr: [''],
      institution: [this.institutionName]
    });
  }

  clearFormData(val) {
    if (val === 'husband') {
      this.husbandFormData = new FormData();
    }
    if (val === 'wife') {
      this.wifeFormData = new FormData();
    }
    if (val === 'witness1') {

    }
    if (val === 'witness2') {

    }
    if (val === 'marriage') {

    }
  }

  createFormData(val) {
    // this.spouseFlaged = false;
    if (val === 'husband') {
      this.husbandFormData.append('firstName', this.HusbandFormGroup.get('firstName').value);
      this.husbandFormData.append('lastName', this.HusbandFormGroup.get('lastName').value);
      this.husbandFormData.append('address', this.HusbandFormGroup.get('address').value);
      this.husbandFormData.append('postCode', this.HusbandFormGroup.get('postCode').value);
      this.husbandFormData.append('dateOfBirth', this.HusbandFormGroup.get('dateOfBirth').value);
    }
    if (val === 'wife') {
      this.wifeFormData.append('firstName', this.wifeFormGroup.get('firstName').value);
      this.wifeFormData.append('lastName', this.wifeFormGroup.get('lastName').value);
      this.wifeFormData.append('address', this.wifeFormGroup.get('address').value);
      this.wifeFormData.append('postCode', this.wifeFormGroup.get('postCode').value);
      this.wifeFormData.append('dateOfBirth', this.wifeFormGroup.get('dateOfBirth').value);
    }
    if (val === 'witness1') {
      this.witness1FormData.append('firstName', this.witness1FormGroup.get('firstName').value);
      this.witness1FormData.append('lastName', this.witness1FormGroup.get('lastName').value);
      this.witness1FormData.append('address', this.witness1FormGroup.get('address').value);
      this.witness1FormData.append('postCode', this.witness1FormGroup.get('postCode').value);
      this.witness1FormData.append('dateOfBirth', this.witness1FormGroup.get('dateOfBirth').value);
    }
    if (val === 'witness2') {
      this.witness2FormData.append('firstName', this.witness2FormGroup.get('firstName').value);
      this.witness2FormData.append('lastName', this.witness2FormGroup.get('lastName').value);
      this.witness2FormData.append('address', this.witness2FormGroup.get('address').value);
      this.witness2FormData.append('postCode', this.witness2FormGroup.get('postCode').value);
      this.witness2FormData.append('dateOfBirth', this.witness2FormGroup.get('dateOfBirth').value);
    }
    if (val === 'marriage') {
      this.marriageInfo.dateOfMarriage = this.marriageFormGroup.get('dateOfNikkah').value;
      this.marriageInfo.mahr = this.marriageFormGroup.get('mahr').value;
    }
  }

  selectImage(event, val) {
    if (event.target.files.length > 0) {
      if (val === 'husband') {
        const file = event.target.files[0];
        this.selectedFile = file;
        this.husbandFormData.append('myFile', this.selectedFile);
      }
      if (val === 'wife') {
        const file = event.target.files[0];
        this.selectedFile = file;
        this.wifeFormData.append('myFile', this.selectedFile);
      }
      if (val === 'witness1') {
        const file = event.target.files[0];
        this.selectedFile = file;
        this.witness1FormData.append('myFile', this.selectedFile);
      }
      if (val === 'witness2') {
        const file = event.target.files[0];
        this.selectedFile = file;
        this.witness2FormData.append('myFile', this.selectedFile);
      }
    }
  }

  selectedSpouse(val, spouse) {
    if (!spouse.isFlagged) {
      if (val === 'husband') {
        this.HusbandFormGroup.controls['firstName'].setErrors(null);
        this.HusbandFormGroup.controls['lastName'].setErrors(null);
        this.myStepper.next();
        this.selectedHusband = true;
        this.marriageInfo.husbandId = spouse._id;
      }
      if (val === 'wife') {
        this.wifeFormGroup.controls['firstName'].setErrors(null);
        this.wifeFormGroup.controls['lastName'].setErrors(null);
        this.myStepper.next();
        this.selectedWife = true;
        this.marriageInfo.wifeId = spouse._id;
      }
    }
    if (spouse.isFlagged) {
      this.spouseFlaged = true;
      this.spouseNote = spouse.note;
      if (val === 'husband') {
        this.husbandFlagged= true;
        this.HusbandFormGroup.controls['firstName'].setErrors(null);
        this.HusbandFormGroup.controls['lastName'].setErrors(null);
        // this.myStepper.next();
        this.selectedHusband = true;
        this.marriageInfo.husbandId = spouse._id;
      }
      if (val === 'wife') {
        this.wifeFlagged =true;
        this.wifeFormGroup.controls['firstName'].setErrors(null);
        this.wifeFormGroup.controls['lastName'].setErrors(null);
        // this.myStepper.next();
        this.selectedWife = true;
        this.marriageInfo.wifeId = spouse._id;
      }
    }
  }

  registerMarriage() {
    if (this.selectedHusband && !this.selectedWife) {
      this.wifeService.createWife(this.wifeFormData).pipe(
        (tap((data: any) => { this.marriageInfo.wifeId = data.data._id })),
        switchMap(() => this.witnessService.createWitness(this.witness1FormData)),
        (tap((data: any) => { this.marriageInfo.witness1Id = data.data._id })),
        switchMap(() => this.witnessService.createWitness(this.witness2FormData)),
        (tap((data: any) => { this.marriageInfo.witness2Id = data.data._id })),
        switchMap(() => this.marriageService.registerMarriage(this.marriageInfo))
      ).subscribe((data: any) => {
        this.router.navigate([`marriageView/${data.data._id}`]);
        console.log(data)
      });
    }
    if (this.selectedWife && !this.selectedHusband) {
      this.husbandService.createHusband(this.husbandFormData).pipe(
        (tap((data: any) => { this.marriageInfo.husbandId = data.data._id })),
        switchMap(() => this.witnessService.createWitness(this.witness1FormData)),
        (tap((data: any) => { this.marriageInfo.witness1Id = data.data._id })),
        switchMap(() => this.witnessService.createWitness(this.witness2FormData)),
        (tap((data: any) => { this.marriageInfo.witness2Id = data.data._id })),
        switchMap(() => this.marriageService.registerMarriage(this.marriageInfo))
      ).subscribe((data: any) => {
        this.router.navigate([`marriageView/${data.data._id}`]);
        console.log(data)
      });
    }
    if ((this.selectedHusband && this.selectedWife)) {
      this.witnessService.createWitness(this.witness1FormData).pipe(
        (tap((data: any) => { this.marriageInfo.witness1Id = data.data._id })),
        switchMap(() => this.witnessService.createWitness(this.witness2FormData)),
        (tap((data: any) => { this.marriageInfo.witness2Id = data.data._id })),
        switchMap(() => this.marriageService.registerMarriage(this.marriageInfo))
      ).subscribe(data => {
        this.router.navigate([`marriageView/${data.data._id}`])
        console.log(data)
      });
    }
    if (!(this.selectedHusband || this.selectedWife)) {
      this.husbandService.createHusband(this.husbandFormData).pipe(
        (tap((data: any) => { this.marriageInfo.husbandId = data.data._id })),
        switchMap(() => this.wifeService.createWife(this.wifeFormData)),
        (tap((data: any) => { this.marriageInfo.wifeId = data.data._id })),
        switchMap(() => this.witnessService.createWitness(this.witness1FormData)),
        (tap((data: any) => { this.marriageInfo.witness1Id = data.data._id })),
        switchMap(() => this.witnessService.createWitness(this.witness2FormData)),
        (tap((data: any) => { this.marriageInfo.witness2Id = data.data._id })),
        switchMap(() => this.marriageService.registerMarriage(this.marriageInfo))
      ).subscribe(data => {
        this.router.navigate([`marriageView/${data.data._id}`])
        console.log(data)
      });
    }
  }

 
}
