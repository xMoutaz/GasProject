export interface User{
    _id:string;
    name:string;
    email:string;
    phone:string;
    roles:[string];
    institution: string;
}
export interface Roles {
    claimnt?: boolean;
    masjid?: boolean;
    superAdmin?: boolean;
    verifier?: boolean;
}