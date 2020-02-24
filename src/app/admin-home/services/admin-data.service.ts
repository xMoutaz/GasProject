import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private targetedUserUid = new BehaviorSubject('');
  targetedUserUidObs = this.targetedUserUid.asObservable();

  private targetedWordKey = new BehaviorSubject('');
  targetedWordKeyObs = this.targetedUserUid.asObservable();
 
  private targetedLanguage = new BehaviorSubject('');
  targetedLanguageObs = this.targetedLanguage.asObservable();

  constructor() { }

  changeTargetUid(uid: string) {
    this.targetedUserUid.next(uid);
  }

  changeTagetWord(key: string) {
    this.targetedWordKey.next(key);
  }
  changeTargetedLnaguage(lang: string) {
    this.targetedLanguage.next(lang);
  }
}
