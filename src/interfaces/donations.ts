import { PaginationMeta } from "@/lib/apis/user";

export interface IDonations {
  association_id: string;
  name: string;
  image_url: string;
  visits: number;
  created_at: string;
  link: string;
}
export interface DonationsResponse {
  items: IDonations[];
  meta: PaginationMeta;
}

export interface CreateDonationData {
  name: string;
  description: string;
  image: File | null;
  link: string;
}

export interface GetDonationsParams {
  page?: string;
  limit?: string;
}
