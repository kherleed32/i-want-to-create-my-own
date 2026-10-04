"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  UserProfile,
  UserRole,
  Transaction,
  Beneficiary,
  NetworkType,
} from "@/types";
import { generateReference, createId } from "@/lib/utils";

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  walletBalance: number;
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  activeTab: "data" | "airtime" | "bills" | "transactions" | "agent-hub";
  setActiveTab: (tab: "data" | "airtime" | "bills" | "transactions" | "agent-hub") => void;
  isVirtualModalOpen: boolean;
  setIsVirtualModalOpen: (open: boolean) => void;
  isOnlinePayModalOpen: boolean;
  setIsOnlinePayModalOpen: (open: boolean) => void;
  selectedReceipt: Transaction | null;
  setSelectedReceipt: (tx: Transaction | null) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  
  // Actions
  toggleRole: () => void;
  setRole: (role: UserRole) => void;
  fundWallet: (
    amount: number,
    method: "VIRTUAL_ACCOUNT" | "CARD_ONLINE",
    notes?: string
  ) => Promise<Transaction>;
  executePurchase: (data: {
    type: "DATA" | "AIRTIME";
    amount: number;
    network: NetworkType;
    recipientPhone: string;
    planName?: string;
    discountOrProfit?: number;
  }) => Promise<{ success: boolean; transaction?: Transaction; error?: string }>;
  addBeneficiary: (beneficiary: Omit<Beneficiary, "id" | "lastUsed">) => void;
}

const DEFAULT_USER: UserProfile = {
  id: "usr_kherleed_01",
  name: "Khaleed S.",
  phone: "08123456789",
  email: "khaleed@kherleeddata.com",
  role: "CUSTOMER",
  createdAt: "2026-01-15T09:30:00Z",
  virtualAccounts: [
    {
      bankName: "Wema Bank",
      bankCode: "035",
      accountNumber: "7923481029",
      accountName: "KHERLEED - Khaleed S.",
    },
    {
      bankName: "Moniepoint MFB",
      bankCode: "50515",
      accountNumber: "6149204812",
      accountName: "KHERLEED - Khaleed S.",
    },
    {
      bankName: "PalmPay / Squad",
      bankCode: "999991",
      accountNumber: "8923019284",
      accountName: "KHERLEED - Khaleed S.",
    },
  ],
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-init-1",
    reference: "KHL-WEMA-98213",
    type: "WALLET_FUND_VIRTUAL",
    title: "Wallet Credit (Virtual Bank Transfer)",
    amount: 5000,
    balanceBefore: 0,
    balanceAfter: 5000,
    status: "SUCCESS",
    paymentMethod: "VIRTUAL_ACCOUNT",
    createdAt: "2026-10-03T10:00:00Z",
    notes: "Direct bank transfer received via Wema Bank Virtual Account",
  },
  {
    id: "tx-init-2",
    reference: "KHL-DAT-47291",
    type: "DATA",
    title: "MTN 1.0 GB SME Data",
    network: "MTN",
    recipientPhone: "08031234567",
    planName: "1.0 GB SME (30 Days)",
    amount: 280,
    discountOrProfit: 0,
    balanceBefore: 5000,
    balanceAfter: 4720,
    status: "SUCCESS",
    paymentMethod: "WALLET",
    createdAt: "2026-10-04T08:30:00Z",
    notes: "Direct top-up successful to 08031234567",
  },
];

const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: "ben-1",
    name: "My MTN Line",
    phone: "08031234567",
    network: "MTN",
    lastUsed: "2026-10-04T08:30:00Z",
  },
  {
    id: "ben-2",
    name: "Bro Airtel",
    phone: "08029876543",
    network: "AIRTEL",
    lastUsed: "2026-10-03T14:15:00Z",
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("kherleed_user");
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_USER;
  });

  const [walletBalance, setWalletBalance] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("kherleed_balance");
        if (saved) return parseFloat(saved);
      } catch {
        // fallback
      }
    }
    return 4720;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("kherleed_transactions");
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("kherleed_beneficiaries");
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_BENEFICIARIES;
  });

  const [activeTab, setActiveTab] = useState<"data" | "airtime" | "bills" | "transactions" | "agent-hub">("data");
  const [isVirtualModalOpen, setIsVirtualModalOpen] = useState(false);
  const [isOnlinePayModalOpen, setIsOnlinePayModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kherleed_user", JSON.stringify(user));
      localStorage.setItem("kherleed_balance", walletBalance.toString());
      localStorage.setItem("kherleed_transactions", JSON.stringify(transactions));
      localStorage.setItem("kherleed_beneficiaries", JSON.stringify(beneficiaries));
    } catch {
      // Ignore write errors
    }
  }, [user, walletBalance, transactions, beneficiaries]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = createId("toast");
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  const toggleRole = useCallback(() => {
    setUser((prev) => {
      const newRole: UserRole = prev.role === "CUSTOMER" ? "AGENT" : "CUSTOMER";
      if (newRole === "AGENT") {
        showToast("🎉 Switched to AGENT account! Wholesale rates unlocked.", "success");
      } else {
        showToast("Switched back to standard CUSTOMER account.", "info");
      }
      return { ...prev, role: newRole };
    });
  }, [showToast]);

  const setRole = useCallback((role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
  }, []);

  const fundWallet = useCallback(async (
    amount: number,
    method: "VIRTUAL_ACCOUNT" | "CARD_ONLINE",
    notes?: string
  ): Promise<Transaction> => {
    const balanceBefore = walletBalance;
    const balanceAfter = balanceBefore + amount;

    const newTx: Transaction = {
      id: createId("tx"),
      reference: generateReference(method === "VIRTUAL_ACCOUNT" ? "KHL-VA" : "KHL-CARD"),
      type: method === "VIRTUAL_ACCOUNT" ? "WALLET_FUND_VIRTUAL" : "WALLET_FUND_ONLINE",
      title: method === "VIRTUAL_ACCOUNT" ? "Bank Transfer (Virtual Account)" : "Online Payment (Card/Gateway)",
      amount,
      balanceBefore,
      balanceAfter,
      status: "SUCCESS",
      paymentMethod: method,
      createdAt: new Date().toISOString(),
      notes: notes || `Wallet top-up via ${method === "VIRTUAL_ACCOUNT" ? "Dedicated Virtual Account" : "Online Checkout"}`,
    };

    setWalletBalance(balanceAfter);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Wallet credited with ₦${amount.toLocaleString()} successfully!`, "success");
    return newTx;
  }, [walletBalance, showToast]);

  const addBeneficiary = useCallback((beneficiary: Omit<Beneficiary, "id" | "lastUsed">) => {
    setBeneficiaries((prev) => {
      const existing = prev.find((b) => b.phone === beneficiary.phone);
      if (existing) {
        return [
          { ...existing, lastUsed: new Date().toISOString(), network: beneficiary.network },
          ...prev.filter((b) => b.phone !== beneficiary.phone),
        ];
      }
      return [
        {
          id: createId("ben"),
          ...beneficiary,
          lastUsed: new Date().toISOString(),
        },
        ...prev.slice(0, 7),
      ];
    });
  }, []);

  const executePurchase = useCallback(async (data: {
    type: "DATA" | "AIRTIME";
    amount: number;
    network: NetworkType;
    recipientPhone: string;
    planName?: string;
    discountOrProfit?: number;
  }): Promise<{ success: boolean; transaction?: Transaction; error?: string }> => {
    if (walletBalance < data.amount) {
      showToast("Insufficient wallet balance. Please fund your wallet.", "error");
      return { success: false, error: "Insufficient wallet balance" };
    }

    const balanceBefore = walletBalance;
    const balanceAfter = balanceBefore - data.amount;

    const newTx: Transaction = {
      id: createId("tx"),
      reference: generateReference(data.type === "DATA" ? "KHL-DAT" : "KHL-AIR"),
      type: data.type,
      title: data.type === "DATA" ? `${data.network} ${data.planName || "Data Bundle"}` : `${data.network} Airtime VTU`,
      network: data.network,
      recipientPhone: data.recipientPhone,
      planName: data.planName,
      amount: data.amount,
      discountOrProfit: data.discountOrProfit || 0,
      balanceBefore,
      balanceAfter,
      status: "SUCCESS",
      paymentMethod: "WALLET",
      createdAt: new Date().toISOString(),
      notes: `Successful delivery to ${data.recipientPhone} (${data.network})`,
    };

    setWalletBalance(balanceAfter);
    setTransactions((prev) => [newTx, ...prev]);

    // Update beneficiaries
    addBeneficiary({
      name: `${data.network} User`,
      phone: data.recipientPhone,
      network: data.network,
    });

    showToast(`${data.type === "DATA" ? "Data" : "Airtime"} purchase of ₦${data.amount.toLocaleString()} was successful!`, "success");
    return { success: true, transaction: newTx };
  }, [walletBalance, showToast, addBeneficiary]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        walletBalance,
        transactions,
        beneficiaries,
        activeTab,
        setActiveTab,
        isVirtualModalOpen,
        setIsVirtualModalOpen,
        isOnlinePayModalOpen,
        setIsOnlinePayModalOpen,
        selectedReceipt,
        setSelectedReceipt,
        toasts,
        showToast,
        removeToast,
        toggleRole,
        setRole,
        fundWallet,
        executePurchase,
        addBeneficiary,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
