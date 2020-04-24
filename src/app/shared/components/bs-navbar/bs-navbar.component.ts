import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { Subscription, Observable, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Language } from '../../models/language';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';
import { LoadLanguages } from 'src/app/state/language.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  appUser: any;
  id: string = '';
  btnWord = '';
  subscription: Subscription;
  languages$: Observable<Array<any>>;
  selectedLanguage; 

  constructor(private translate: TranslateService, public auth: AuthService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.languages$ = this.store.select(store => store.language.list);
    this.store.select(store => store.language.error);
    this.store.dispatch(new LoadLanguages());
    this.store.select(store => this.selectedLanguage = store.selectLang.selectedLang)
      .subscribe();
      this.store.select(store => store.User.user)
      .pipe(filter((data) => !!data))
      .subscribe(data => {
        this.appUser = data;
        this.btnWord = data.name.slice(0,1);
      });
  }

  ngOnDestroy() {
  }

  logout() {
    this.auth.logout();
    this.appUser = null;
  }

  selectLanguage(language) {
    this.translate.use(language);
  }

}