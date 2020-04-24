import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from '../services/apixu.service';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models/app-state-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;
  appUser: any;

  constructor(private apixuService: ApixuService, private store: Store<AppState>) { }

  ngOnInit() {
    this.sendToAPIXU();
    // TODO: -Access user from store here and display user name in welcome message
    this.store.select(store => store.User.user)
      .pipe(filter((data) => !!data))
      .subscribe(data => {
        this.appUser = data;
      });
  }

  sendToAPIXU() {
    this.apixuService
      .getWeather()
      .subscribe(data => {this.weatherData = data;});
  }


}
