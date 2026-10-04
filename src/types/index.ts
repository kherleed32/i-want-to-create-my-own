export type UserRole = "CUSTOMER" | "AGENT";

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  virtualAccounts: VirtualAccount[];
  createdAt: string;
}

export interface VirtualAccount {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export type NetworkType = "MTN" | "AIRTEL" | "GLO" | "9MOBILE";

export type DataCategory = "SME" | "GIFTING" | "CORPORATE";

export interface DataPlan {
  id: string;
  network: NetworkType;
  category: DataCategory;
  name: string;
  size: string;
  validity: string;
  customerPrice: number;
  agentPrice: number;
  popular?: boolean;
}

export type TransactionType = "DATA" | "AIRTIME" | "WALLET_FUND_VIRTUAL" | "WALLET_FUND_ONLINE";

export type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";

export interface Transaction {
  id: string;
  reference: string;
  type: TransactionType;
  title: string;
  network?: NetworkType;
  recipientPhone?: string;
  planName?: string;
  amount: number;
  discountOrProfit?: number;
  balanceBefore: number;
  balanceAfter: number;
  status: TransactionStatus;
  paymentMethod?: "VIRTUAL_ACCOUNT" | "CARD_ONLINE" | "WALLET";
  createdAt: string;
  notes?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  network: NetworkType;
  lastUsed: string;
}
