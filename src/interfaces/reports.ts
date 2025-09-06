export interface UsersReportResponse {
  users: string;
  active_users: number;
  top_15_users: {
    user_id: string;
    username: string;
    country: string;
    completed_count: number;
  }[];
}
export interface ReportQueryParams {
  from: string;
  to: string;
}

export interface UmrahReportResponse {
  summary: {
    total_umrah_count: string;
    scheduled_count: string;
    completed_count: string;
    cancelled_count: string;
    company_revenue: string;
    performer_revenue: string;
    vat: string;
  };
  daily_counts: {
    date: string;
    count: string;
  }[];
}
export interface IncomeReportResponse {
  total_price: string;
  total_platform_fee: string;
  total_performer_fee: string;
  total_vat_amount: string;
  total_credit: string;
  profit: string;
}

export interface ExpenseReportResponse {
  term_id: number;
  name: string;
  total_expense: string;
}