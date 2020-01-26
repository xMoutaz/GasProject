import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private targetedUserUid = new BehaviorSubject('');
  targetedUserUidObs = this.targetedUserUid.asObservable();

  constructor() { }

  changeTargetUid(uid: string) {
    this.targetedUserUid.next(uid);
  }
}
