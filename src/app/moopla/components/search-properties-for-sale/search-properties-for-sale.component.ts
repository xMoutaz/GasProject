import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SearchedProperty } from '../../models/for-sale';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MapboxService } from '../../services/mapbox.service';
import { citiesService } from '../../cities/morocco.service';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { SearchForSaleService } from '../../services/search-for-sale.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-properties-for-sale',
  templateUrl: './search-properties-for-sale.component.html',
  styleUrls: ['./search-properties-for-sale.component.css']
})
export class SearchPropertiesForSaleComponent implements OnInit {

  geoCoder: any;
  // minPrices= [1000, 10000, 100000];
  minPrices= [
    {'id': 100, 'value': '100'},
    {'id': 1000, 'value': '1K'},
    {'id': 10000, 'value': '10K'}
  ];
  maxPrices= [
    {'id': 1000, 'value': '1K'},
    {'id': 10000, 'value': '10K'},
    {'id': 10000000, 'value': '10M'}
  ];
  propertyTypes= ['HOUSE', 'APARTMENT', 'LAND'];
  bedrooms= [1 , 2 , 3];
  distances= ['10', '20', '50'];
  searchFormGroup: FormGroup;
  coordinates: Array<any>;
  
  constructor(private _formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.coordinates = [position.coords.longitude, position.coords.latitude];
    });

    this.searchFormGroup = this._formBuilder.group({
     minPrice: ['', Validators.required],
     maxPrice: ['', Validators.required],
     propertyType: ['', Validators.required],
     bedRooms: ['', Validators.required],
     distanceFromLocation: ['', Validators.required],
    });

    (mapboxgl as any).accessToken = 'pk.eyJ1IjoieG1vdXRheiIsImEiOiJjazVvM3RubzUxMXppM21ydzQ5dDI4ZnY3In0.4gqa8rQR0W0VXixe51JxbA';
    this.geoCoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'country,region,place,postcode,locality,neighborhood'
    });
    this.geoCoder.addTo('#geocoder');
  }


  searchForSale() {
    this.router.navigate(['/view-for-sale',
        {
        addedd: 'undefined',
        'location0': (this.geoCoder._typeahead.selected)? this.geoCoder._typeahead.selected.center[0]: this.coordinates[0],
        'location1': (this.geoCoder._typeahead.selected)? this.geoCoder._typeahead.selected.center[1]: this.coordinates[1],
        minPrice: this.searchFormGroup.value.minPrice,
        maxPrice: this.searchFormGroup.value.maxPrice,
        sortedBy: this.searchFormGroup.value.sortedBy,
        bedRooms: this.searchFormGroup.value.bedRooms,
        propertyType: this.searchFormGroup.value.propertyType,
        distanceFromLocation: this.searchFormGroup.value.distanceFromLocation
        }
      ]);
  }

  test() {
    console.log(this.geoCoder._typeahead.selected.center)
  }
}
