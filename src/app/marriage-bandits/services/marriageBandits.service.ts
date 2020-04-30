import { Injectable } from '@angular/core';
import { Claimant } from '../models/claimant';
import { of } from 'rxjs';
import { Offender } from '../models/offender';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/shared/services/Mongodb/api-response';

@Injectable({
  providedIn: 'root'
})
export class MarriageBanditService {
  readonly url = 'https://marriage-bandits.herokuapp.com/users';

  constructor(private http: HttpClient) { }

  // getOffenders() {
  //   this.http.get<ApiResponse<Offender>>(this.url);
  // }
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

 getClaim(){
   return of([
     {
      claiment_id:1,
      offender_id:2,
      extraDetails: "Consumated the marriage and then ran away.",
      loggedTime: "25-4-2020 18:00"
     }
   ]);
 }

  getClaimsView(){
      return of([
        {
          id:0,
          offender:{
            firstName:"Ahmed",
            lastName: "Raza",
            alsoKnownAs:"AR",
            address:"236 Drakefell road",
            dateOfBirth: "24-09-1988",
            description: "Asian, Gold tooth",
            masjid:"Masjid Bilal",
            verified:true
          },
          claimaint:{
            firstName:"Clair",
            lastName: "Barne",
            phoneNumber:"",
            email:"email@email.com"
          },
          claim:{
            extraDetails: "Consumated the marriage and then ran away.",
            loggedTime: "25-4-2020 18:00"
          }
        }
      ])
  }


}