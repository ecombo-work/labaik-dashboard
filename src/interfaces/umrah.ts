import {
  Gender,
  OfferStatus,
  PersonStatus,
  UmrahAction,
  UmrahStatus,
} from "@/constants/umrah";
import { PaginationMeta } from "@/lib/apis/user";
import { CountryCode } from "libphonenumber-js";

export interface UmrahRequest {
  umrah_id: number;
  price: string;
  status: UmrahStatus;
  created_at: Date | string;
  created_by: {
    user_id: string;
    username: string;
  };
  assigned_to?: {
    user_id: string;
    username: string;
  };
}
export interface CurrentUmrahRequestResponse {
  items: UmrahRequest[];
  meta: PaginationMeta;
}
export interface CurrentUmrahRequestParams {
  page?: string;
  limit?: string;
  umrah_id?: string;
  created_by?: string;
  assigned_to?: string;
  from?: string;
  to?: string;
}
// export interface UmrahDetailsResponse {
interface User {
  user_id: number;
  username: string;
  email: string;
  phone_number: string;
  profile_image: string;
  country: CountryCode;
}

interface Offer {
  offer_id: number;
  status: OfferStatus;
  price: string;
  date: string;
  time: string;
  created_at: string;
  created_by: User;
  notes?: string;
}

interface UmrahProgress {
  umrah_progress_id: number;
  ihram: string;
  ihram_started_at: string | null;
  ihram_completed_at: string | null;
  tawaf: string;
  tawaf_started_at: string | null;
  tawaf_completed_at: string | null;
  sai: string;
  sai_started_at: string | null;
  sai_completed_at: string | null;
  haircut: string;
  haircut_started_at: string | null;
  haircut_completed_at: string | null;
  notes: string | null;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

interface HistoryItem {
  history_id: number;
  action: UmrahAction;
  created_at: string;
  performed_by: User;
}
interface Person {
  name: string;
  gender: Gender;
  status: PersonStatus;
  note: string;
}
export interface UmrahPricing {
  platform_fee: string;
  performer_fee: string;
  subtotal: string;
  vat_percentage: string;
  vat_amount: string;
  original_price: string;
  discount_amount: string;
  total_price: string;
}
export interface UmrahDetailsResponse {
  umrah_id: number;
  status: UmrahStatus;
  price: string;
  created_at: string;
  created_by: User;
  pricing: UmrahPricing;
  assigned_to: User;
  offers: Offer[];
  person: Person;
  progress: UmrahProgress;
  history: HistoryItem[];
}
