import { WithdrawalMethod, WithdrawalStatus } from "@/constants/withdrawal";
import { User } from "@/lib/apis/chat";
import { PaginationMeta } from "@/lib/apis/user";

export interface BankAccount {
  withdrawal_bank_id: number;
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  bank_country: string;
  account_currency: string;
  iban: string;
}
export interface Binance {
  withdrawal_binance_id: number;
  wallet_id: string;
}
export interface PayPal {
  withdrawal_paypal_id: number;
  paypal_email: string;
  paypal_id: string;
}
export interface WithdrawalBaseInfo {
  withdrawal_id: number;
  amount: number;
  method: WithdrawalMethod;
  status: WithdrawalStatus;
  transaction_ref: string;
  note: string;
  created_at: string;
  confirm_image: string;
}
export interface Withdrawal {
  withdrawal_id: number;
  amount: number;
  method: WithdrawalMethod;
  status: WithdrawalStatus;
  transaction_ref: string;
  confirm_image: string;
  note: string;
  created_at: string;
  updated_at: string;
  failure_reason: string;
  paypal_details: PayPal;
  binance_details: Binance;
  bank_details: BankAccount;
  user: User;
}

export interface WithdrawalResponse {
  items: Withdrawal[];
  meta: PaginationMeta;
}

export interface GetWithdrawalsParams {
  page?: string;
  limit?: string;
}
