import { Owner } from './owner';
import { PropertyImage } from './property-image';

export interface Property{
    id: number;
    location: { 
        long:number;
        lat:number;
    };
    bedrooms: number;
    bathrooms: number;
    receptionRooms: number;
    features: Array<string>;
    description: string;
    owner: Owner;
    addressLine1:string;
    addressLine2:string;
    postCode: string;
    image: PropertyImage;
    furnished: boolean;
}