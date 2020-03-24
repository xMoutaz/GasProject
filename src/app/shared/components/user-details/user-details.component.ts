import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { Address } from 'src/app/shared/models/address';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { UserMdbService } from 'src/app/shared/services/Mongodb/user-mdb.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddressMdbService } from '../../services/Mongodb/address-mdb.service';
import { error } from 'protractor';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  newUser = new User();
  newAddress = new Address();
  map: mapboxgl.Map;
  
  subscription: Subscription;
  constructor(private mDBUserService: UserMdbService, private mDBAddressService: AddressMdbService, private router: Router ,private userServices: UserService, private auth: AuthService, private addressServices: AddressService) { 
  
    this.auth.user$.subscribe(user => {
      if (user) {
        console.log(user);
        // takeing userID and UserEmail from firebase and put it into User Class to enter it into a database
        this.newAddress._id = this.newUser._id = user.uid;
        this.newUser.email = user.email;
        console.log(this.newUser);
        }
    });
  }
  
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

  addUserInfo() {
    // console.log(this.newUser);
    // this.userServices.addUserInfo(this.newUser);
    // this.addUserAddressInfo(this.newAddress);

    // Saving user details
    this.mDBUserService.saveUser(this.newUser)
    .subscribe((data : User) => {
      console.log(data);
      this.router.navigate(['']); 
    }
    );

    // Saving address details
    this.mDBAddressService.saveAddress(this.newAddress)
    .subscribe((data : Address) => {
      console.log(data);
    });
    
  }

  // addUserAddressInfo(newAddress) {
  //   this.auth.user$.subscribe(user => {
  //     if(user) {this.addressServices.addAddressinfo(this.newAddress, user);}
  //   });
  // }

}

