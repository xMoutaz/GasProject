export interface User{
    _id:number;
    name:string;
    email:string;
    phone:string;
    role:Roles;
}
export interface Roles {
    claimnt?: boolean;
    masjid?: boolean;
    superAdmin?: boolean;
    verifier?: boolean;
}