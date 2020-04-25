import { Injectable } from '@angular/core';
import { Claimant } from '../models/claimant';
import { of } from 'rxjs';
import { Offender } from '../models/offender';

@Injectable({
  providedIn: 'root'
})
export class MarriageBanditService {

  constructor() { }

  getOffenders(){
    return of([
        {
            id: 1,
            firstName:"Ahmed",
            lastName: "Raza",
            alsoKnownAs:"AR",
            address:"236 Drakefell road",
            dateOfBirth: "24-09-1988",
            description: "Asian, Gold tooth",
            masjid:"Masjid Bilal",
            verified:true
        },
        {
            id: 2,
            firstName:"Mike",
            lastName: "Smith",
            alsoKnownAs: "Abdul Hakeem",
            address:"2 Friendfield road",
            dateOfBirth: "28-01-1980",
            description: "White, Blond hair, Glasses, Limp",
            masjid:"Masjid Sahabah, Masjid Ahmed",
            verified:true
        },
        {
            id: 3,
            firstName:"Jane",
            lastName: "Goodright",
            alsoKnownAs: "Khadeejah",
            address:"n/a",
            dateOfBirth: "31-01-1990",
            description: "Chinese, Ginger, Often claims to be graduate of madinah",
            masjid:"Masjid Sahabah, Masjid Ahmed",
            verified:true
        },
        {
            id: 4,
            firstName:"Jordan",
            lastName: "Lindo",
            alsoKnownAs: "Abdul Haqq",
            address:"n/a",
            dateOfBirth: "09-05-1986",
            description: "Neck Tatoo, Jamaican born",
            masjid:"Masjid Sahabah, Masjid Ahmed",
            verified:false
        }
    ]);
  }

  getClaimsView(){
      return of([
        {
            claiment_id:1,
            offender_id:2,
            firstName:"Jordan",
            lastName: "Lindo",
            address:"",
            claiment:"Jane",
            loggedTime: "25-4-2020 18:00"
        }
      ])
  }


}