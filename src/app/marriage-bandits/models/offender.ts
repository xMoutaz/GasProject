export interface Offender{
    _id:number;
    firstName:string;
    lastName:string;
    alsoKnownAs:string;
    address:string;
    dateOfBirth:string;
    description:string;
    masjid:string;
    // added verified
    verified: boolean;
}