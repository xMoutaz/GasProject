import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  defaulRoles= [];
  constructor() { }

  ngOnInit(): void {
    this.admin = this.roles.includes('Admin');
    this.masjid = this.roles.includes('Masjid');
    this.verifier = this.roles.includes('Verifier');
  }

  onRoleChange($event, role){
    // this.user.roles.push();
    debugger;

  }

  updatePrivileges() {
    this.assign.emit();
  }

  cancelButton() {
    this.cancel.emit();
  }

}
