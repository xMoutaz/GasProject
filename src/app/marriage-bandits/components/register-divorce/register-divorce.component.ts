import { Component, OnInit } from '@angular/core';
import { DivorceService } from '../../services/divorce.service';
import { ActivatedRoute } from '@angular/router';
import { Divorce } from '../../models/divorce';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-divorce',
  templateUrl: './register-divorce.component.html',
  styleUrls: ['./register-divorce.component.css']
})
export class RegisterDivorceComponent implements OnInit {
  
  divorce: Divorce = {_id: '', marriage_id:'', dateOfDivorce: '', reason: ''}

  constructor(private divorceService: DivorceService, private route: ActivatedRoute, private _location: Location) { 
    this.divorce.marriage_id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  registerDivorce() {
    this.divorceService.registerDivorce(this.divorce)
    .subscribe(data => { 
      this._location.back();
      console.log(data)});
  }

  back() {
    this._location.back();
  }
}