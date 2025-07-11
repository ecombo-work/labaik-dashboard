import { PaginationMeta } from "@/lib/apis/user";

export interface Account {
  account_id: string;
  name: string;
  balance: string;
  created_at: string;
}
export interface AccountResponse {
  items: Account[];
  meta: PaginationMeta;
}
export interface CreateAccountRequest {
  name: string;
  balance: string;
}

export interface GetAccountsParams {
  page?: string;
  limit?: string;
}
export interface Term {
  term_id: number;
  name: string;
  created_at: string;
}
export interface TermResponse {
  items: Term[];
  meta: PaginationMeta;
}
export interface GetTermsParams {
  page?: string;
  limit?: string;
  type?: string;
}
export interface Transaction {
  transaction_id: number;
  amount: number;
  term: Term;
  account: {
    account_id: string;
    name: string;
  };
  date: string;
  created_at: string;
}
export interface TransactionResponse {
  items: Transaction[];
  meta: PaginationMeta;
}
export interface GetTransactionsParams {
  page?: string;
  limit?: string;
  type?: string;
}
// export interface CreateTransactionRequest {
export interface CreateTermRequest {
    name: string;
    type: string;
}