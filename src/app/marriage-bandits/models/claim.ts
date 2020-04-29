export interface Claim{
    claimant_id:string;
    offender_id:string;
    evidence:Blob;
    dateOfEntry:any;
    extraDetails: string;
}