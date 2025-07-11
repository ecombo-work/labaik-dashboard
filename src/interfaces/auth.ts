import { UserType } from "@/lib/roles";

export interface LoginResponse {
  token: string;
  user: {
    user_id: number;
    username: string;
    email: string;
    phone_number: string;
    profile_image: string;
    is_active: boolean;
    user_type: UserType;
  };
}
export interface LoginRequest {
  phone_number: string;
  password: string;
  fcm_token: string | null;
}
