import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { Address } from 'src/app/shared/models/address';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { Subscription } from 'rxjs';
import {  map, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  newUser = new User();
  newAddress = new Address();
  map: mapboxgl.Map;
  search: string;
  subscription: Subscription;
  addresses: any;
  selectedAddress: [number, number];
  center: any;
  features: Feature[];
  selectedFeature: Feature;
  selectedIndex: number;

  constructor(private http: HttpClient, private mDBUserService: UserMdbService, private mDBAddressService: AddressMdbService, private router: Router ,private auth: AuthService) { 
    this.auth.appUser$.pipe(
      tap(appUser => this.newUser = appUser),
      switchMap(appUser =>
        this.mDBUserService.get(appUser._id))
    ).subscribe(
      (address: Address) => {
        this.newAddress = address
      },
      err => { console.log(err) }
    );
  }
  
  ngOnInit() {
    (mapboxgl as any ).accessToken 
    = environment.mapboxKey;
    this.map = new mapboxgl.Map({
    container: 'map-mapbox',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-5.4014975, 35.5850629],
    zoom: 12
    });
  }

  search_word(event) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.searchMap(searchTerm)
      .subscribe((features: Feature[]) => {
       this.features = features;
      })
    }  else {
      this.features = null;
    }
  }
  onSelect() {
    this.selectedFeature  = this.features[this.selectedIndex];
    let lng = this.selectedFeature.center[0];
    let lat = this.selectedFeature.center[1];
    this.creatMarker(lng, lat);
    this.features = null;
  }

  creatMarker(lng: number, lat: number) {
    const marker = new mapboxgl.Marker({
      draggable: true
      }).setLngLat([lng, lat]).addTo(this.map);
      marker.on('drag', () => {
        let lat: any = marker.getLngLat().lat;
        let lng: any = marker.getLngLat().lng;
        console.log(lng, lat);
        
         this.newAddress.latitude = lat;
         this.newAddress.longitude = lng;
      })
  }

  addUserInfo() {
    this.mDBUserService.updateUserInfo(this.newUser).pipe(
      switchMap(() => this.mDBAddressService.updateAddress(this.newAddress._id, this.newAddress))
    ).subscribe(success => { console.log(success); },
      err => { console.log(err); }
    );
  
  }

  searchMap(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?access_token='+ environment.mapboxKey)
    .pipe(map((res: MapboxOutput) => {
      return res.features;
    }));
  }
}

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: any;
  center: [number, number];
}

