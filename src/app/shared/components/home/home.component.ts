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
  public lat;
  public lng;

  constructor(private formBuilder: FormBuilder, private apixuService: ApixuService) { }

  ngOnInit() {
    this.getLocation();
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  sendToAPIXU(formValues) {
    this.apixuService
      .getWeather(formValues.location)
      .pipe(filter((data:any) => !data.success))
      .subscribe(data => {this.weatherData = data; console.log(data)});
  }
  sendLngLatToAPIXU(location) {
    this.apixuService
      .getWeather(location)
      .pipe(filter((data:any) => !data.success))
      .subscribe(data => {this.weatherData = data; console.log(data)});
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lng);
          let location = `${this.lat}, ${this.lng}`;
          this.sendLngLatToAPIXU(location);
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
