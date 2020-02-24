import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { Address } from 'src/app/shared/models/address';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddressService } from 'src/app/shared/services/address.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  newUser = new User();
  newAddress = new Address();
  map: mapboxgl.Map;
  
  constructor(private userServices: UserService, private auth: AuthService, private addressServices: AddressService) { }
  
  ngOnInit() {
    (mapboxgl as any ).accessToken 
    = environment.mapboxKey;
    this.map = new mapboxgl.Map({
    container: 'map-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-5.4014975, 35.5850629], // starting position LNG,LTD
    zoom: 16.6 // starting zoom
    });
    this.creatMarker(-5.4014975, 35.5850629);
  }
  creatMarker(lng: number, lat: number) {
   
    const marker = new mapboxgl.Marker({
      draggable: true
      }).setLngLat([lng, lat]).addTo(this.map);
      
      marker.on('drag', () => {
        let lat: any = marker.getLngLat().lat;
        let lng: any = marker.getLngLat().lng;
         this.newAddress.latitude = lat;
         this.newAddress.longitude = lng;
      })
  }

  addUserInfo(newUser: User) {
    console.log(newUser);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userServices.addUserInfo(newUser, user);
        this.addUserAddressInfo(this.newAddress);}
    });
  }

  addUserAddressInfo(newAddress) {
    this.auth.user$.subscribe(user => {
      if(user) {this.addressServices.addAddressinfo(this.newAddress, user);}
    });
  }




}

