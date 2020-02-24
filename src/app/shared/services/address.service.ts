import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private db: AngularFireDatabase) { }

  addAddressinfo(newAddress: Address, user) {
    this.db.object('/Addresses/' + user.uid).update({
      zip: newAddress.zip,
      addressLine1: newAddress.addressLine1,
      addressLine2: newAddress.addressLine2,
      longitude: newAddress.longitude,
      latitude: newAddress.latitude
    });
  }
  updateAddressInfo(newAddress: Address, uid) {
    this.db.object('/Addresses/' + uid).update({
      zip: newAddress.zip,
      addressLine1: newAddress.addressLine1,
      addressLine2: newAddress.addressLine2,
      longitude: newAddress.longitude,
      latitude: newAddress.latitude
    });
  }

  // get(UserId) {
  //   return this.db.object('/Addressess/'+ UserId )
  // }

}
