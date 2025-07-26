import { DiscountType } from "@/app/[locale]/dashboard/coupons/create-new";
import { PaginationMeta } from "@/lib/apis/user";

export interface Coupon {
  coupon_id: number;
  code: string;
  used_count: number;
  is_active: boolean;
  valid_from: string | null;
  valid_to: string | null;
  max_uses: string;
  discount_type: DiscountType;
  discount_value: string;
  created_at: string;
}
export interface GetAllCouponsResponse {
  items: Coupon[];
  meta: PaginationMeta;
}
export interface GetAllCouponsParams {
  page?: string;
  limit?: string;
}
export interface CreateCouponRequest {
  valid_from: string | null;
  valid_to: string | null;
  code: string;
  discount_type: DiscountType;
  discount_value: string;
  max_uses: string;
  is_active: boolean;
}
