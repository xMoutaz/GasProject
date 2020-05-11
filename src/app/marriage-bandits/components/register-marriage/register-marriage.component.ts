import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HusbandService } from '../../services/husband.service';
import { WifeService } from '../../services/wife.service';
import { WitnessService } from '../../services/witness.service';
import { MarriageService } from '../../services/marriage.service';
import { tap, switchMap } from 'rxjs/operators';
import { Marriage } from '../../models/marriage';

@Component({
  selector: 'app-register-marriage',
  templateUrl: './register-marriage.component.html',
  styleUrls: ['./register-marriage.component.css']
})
export class RegisterMarriageComponent implements OnInit {
  isLinear = true;
  HusbandFormGroup: FormGroup;
  husbandFormData = new FormData();
  wifeFormGroup: FormGroup;
  wifeFormData = new FormData();
  witness1FormGroup: FormGroup;
  witness1FormData = new FormData();
  witness2FormGroup: FormGroup;
  witness2FormData = new FormData();
  marriageFormGroup: FormGroup;
  selectedFile: any;
  identificationFormData = new FormData();
  marriageInfo: Marriage = { _id: '', mahr: '', dateOfMarriage: '', institution: '', husbandId: '', wifeId: '', witness1Id: '', witness2Id: '' }

  constructor(private _formBuilder: FormBuilder, private husbandService: HusbandService, private wifeService: WifeService,
    private witnessService: WitnessService, private marriageService: MarriageService) { }

  ngOnInit(): void {
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
      institution: ['']
    });
  }

  submitClaim() {

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
      this.marriageInfo.institution = this.marriageFormGroup.get('institution').value;
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

  registerMarriage() {
    this.husbandService.createHusband(this.husbandFormData).pipe(
      (tap((data: any) => { this.marriageInfo.husbandId = data.data._id })),
      switchMap(() => this.wifeService.createWife(this.wifeFormData)),
      (tap((data: any) => { this.marriageInfo.wifeId = data.data._id })),
      switchMap(() => this.witnessService.createWitness(this.witness1FormData)),
      (tap((data: any) => { this.marriageInfo.witness1Id = data.data._id })),
      switchMap(() => this.witnessService.createWitness(this.witness2FormData)),
      (tap((data: any) => { this.marriageInfo.witness2Id = data.data._id })),
      switchMap(() => this.marriageService.registerMarriage(this.marriageInfo))
    ).subscribe(data => console.log(data));
  }
}
