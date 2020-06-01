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

@Component({
  selector: 'app-search-properties-for-sale',
  templateUrl: './search-properties-for-sale.component.html',
  styleUrls: ['./search-properties-for-sale.component.css']
})
export class SearchPropertiesForSaleComponent implements OnInit {

  searchedProperty = {} as SearchedProperty;
  geoCoder: any;
  test: string;

  constructor(private searchForSaleService: SearchForSaleService, private router: Router) {
  }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoieG1vdXRheiIsImEiOiJjazVvM3RubzUxMXppM21ydzQ5dDI4ZnY3In0.4gqa8rQR0W0VXixe51JxbA';
    this.geoCoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'country,region,place,postcode,locality,neighborhood'
    });

    this.geoCoder.addTo('#geocoder');
  }


  searchForSale() {
    this.router.navigate(['/view-for-sale',
        {'addedd':this.searchedProperty.addedd,
        'location[0]':this.geoCoder._typeahead.selected.center[0],
        'location[1]':this.geoCoder._typeahead.selected.center[1],
        'minPrice':this.searchedProperty.minPrice,
        'maxPrice':this.searchedProperty.maxPrice,
        'sortedBy':this.searchedProperty.sortedBy,
        'bedRooms':this.searchedProperty.bedRooms,
        'propertyType':this.searchedProperty.propertyType,
        'distanceFromLocation':this.searchedProperty.distanceFromLocation
        }
      ]);
  }

}
