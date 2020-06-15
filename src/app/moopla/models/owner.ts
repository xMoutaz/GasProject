import { LicenseInfo } from './license-info';

export interface Owner{
    name: string;
    isAgent: boolean;
    email: string;
    contactNumber: number;
    addressLine1: string;
    addressLine2 : string;
    postcode: string;
    licenseInfo: LicenseInfo;
}