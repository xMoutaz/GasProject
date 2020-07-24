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
  roles: string[];
  userlRoles: Array<string>;
  constructor() { }

  ngOnInit(): void {
  }

  onRoleChange($event, role){
    if($event.checked) {this.userlRoles.push(role);}
    console.log(role);
    console.log(this.userlRoles);
    
    if(!$event.checked) {_.pull(this.userlRoles, role);}
  }

  updatePrivileges() {
    this.assign.emit();
  }

  cancelButton() {
    this.cancel.emit();
  }

}
