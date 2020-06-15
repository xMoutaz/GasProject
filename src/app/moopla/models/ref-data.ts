import { SaleMeta } from './sale-meta';
import { RentMeta } from './rent-meta';
import { Locale } from './local';

export interface RefData {
    saleMeta: SaleMeta;
    rentMeta: RentMeta;
    country: string;
    currencyCode: string;
    local: Locale;
    rentPeriod: string; // i.e per week, per month.. the standard per country
  }
  