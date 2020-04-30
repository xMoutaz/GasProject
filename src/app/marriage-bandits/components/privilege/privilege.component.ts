import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  @Output() assign: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  roles = [];
  admin: Boolean; 
  masjid: Boolean;
  verifier: Boolean;
  userlRoles= [];
  constructor() { }

  ngOnInit(): void {
    this.admin = this.userlRoles.includes('Admin');
    this.masjid = this.userlRoles.includes('Masjid');
    this.verifier = this.userlRoles.includes('Verifier');
  }

  onRoleChange($event, role){
    console.log($event);
    console.log(role);
    if($event.checked) {this.userlRoles.push(role);}
    if(!$event.checked) {_.pull(this.userlRoles, role);}
    // this.user.roles.push();
  }

  updatePrivileges() {
    this.assign.emit();
  }

  cancelButton() {
    this.cancel.emit();
  }

}
