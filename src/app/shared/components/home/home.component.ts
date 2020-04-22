import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService } from '../services/apixu.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData: any;

  constructor(private apixuService: ApixuService) { }

  ngOnInit() {
    this.sendToAPIXU('Tetouan');
    // TODO: -Access user from store here and display user name in welcome message
  }

  sendToAPIXU(location) {
    this.apixuService
      .getWeather(location)
      .subscribe(data => {this.weatherData = data; console.log(data)});
  }


}
