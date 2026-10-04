"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  UserProfile,
  UserRole,
  Transaction,
  Beneficiary,
  NetworkType,
} from "@/types";
import { generateReference, createId, calculateOptionBFee, formatNaira } from "@/lib/utils";

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  walletBalance: number;
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  activeTab: "data" | "airtime" | "bills" | "transactions" | "agent-hub";
  setActiveTab: (tab: "data" | "airtime" | "bills" | "transactions" | "agent-hub") => void;
  isVirtualModalOpen: boolean;
  setIsVirtualModalOpen: (open: boolean) => void;
  isOnlinePayModalOpen: boolean;
  setIsOnlinePayModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  selectedReceipt: Transaction | null;
  setSelectedReceipt: (tx: Transaction | null) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  
  // Actions
  toggleRole: () => void;
  setRole: (role: UserRole) => void;
  resetWallet: () => void;
  loadDemoBalance: (amount?: number) => void;
  fundWallet: (
    amount: number,
    method: "VIRTUAL_ACCOUNT" | "CARD_ONLINE",
    notes?: string,
    deductFee?: boolean
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
  pin: "1234",
  tier: "VIP",
  cashbackBalance: 0,
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
  // Check whether we have initialized v2 (which cleans the old hardcoded 4720 balance)
  const isV2Ready = typeof window !== "undefined" && localStorage.getItem("kherleed_v2_clean_balance") === "true";

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

  // Default wallet balance is strictly ₦0.00 for real customer view
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        if (!isV2Ready) {
          // Clean out old demo balance 4720
          localStorage.setItem("kherleed_v2_clean_balance", "true");
          localStorage.setItem("kherleed_balance", "0");
          return 0;
        }
        const saved = localStorage.getItem("kherleed_balance");
        if (saved !== null) return parseFloat(saved);
      } catch {
        // fallback
      }
    }
    return 0;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      try {
        if (!isV2Ready) {
          localStorage.setItem("kherleed_transactions", JSON.stringify([]));
          return [];
        }
        const saved = localStorage.getItem("kherleed_transactions");
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kherleed_v2_clean_balance", "true");
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

  const updateUserProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => {
      const updatedName = data.name !== undefined ? data.name : prev.name;
      const updatedAccounts = prev.virtualAccounts.map((acc) => ({
        ...acc,
        accountName: `KHERLEED - ${updatedName}`,
      }));

      const updated = {
        ...prev,
        ...data,
        virtualAccounts: updatedAccounts,
      };
      showToast("Profile details updated successfully!", "success");
      return updated;
    });
  }, [showToast]);

  const resetWallet = useCallback(() => {
    setWalletBalance(0);
    setTransactions([]);
    try {
      localStorage.setItem("kherleed_balance", "0");
      localStorage.setItem("kherleed_transactions", JSON.stringify([]));
    } catch {
      // Ignore
    }
    showToast("Wallet reset to fresh customer balance: ₦0.00", "info");
  }, [showToast]);

  const loadDemoBalance = useCallback((amount: number = 5000) => {
    const balanceBefore = walletBalance;
    const balanceAfter = balanceBefore + amount;
    const newTx: Transaction = {
      id: createId("tx-demo"),
      reference: generateReference("KHL-DEMO"),
      type: "WALLET_FUND_ONLINE",
      title: "Test Drive Demo Credit",
      amount,
      balanceBefore,
      balanceAfter,
      status: "SUCCESS",
      paymentMethod: "WALLET",
      createdAt: new Date().toISOString(),
      notes: "Demo testing funds loaded for live simulation",
    };

    setWalletBalance(balanceAfter);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Loaded ${formatNaira(amount)} demo test funds into your wallet!`, "success");
  }, [walletBalance, showToast]);

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

  /**
   * Option B Wallet Funding:
   * A nominal processing charge applies on automated deposits.
   */
  const fundWallet = useCallback(async (
    amount: number,
    method: "VIRTUAL_ACCOUNT" | "CARD_ONLINE",
    notes?: string,
    deductFee: boolean = true
  ): Promise<Transaction> => {
    const fee = deductFee ? calculateOptionBFee(amount) : 0;
    const netCredited = amount - fee;
    const balanceBefore = walletBalance;
    const balanceAfter = balanceBefore + netCredited;

    const newTx: Transaction = {
      id: createId("tx"),
      reference: generateReference(method === "VIRTUAL_ACCOUNT" ? "KHL-VA" : "KHL-CARD"),
      type: method === "VIRTUAL_ACCOUNT" ? "WALLET_FUND_VIRTUAL" : "WALLET_FUND_ONLINE",
      title: method === "VIRTUAL_ACCOUNT" ? "Bank Transfer (Dedicated Virtual Account)" : "Online Payment Gateway",
      amount: netCredited,
      discountOrProfit: fee,
      balanceBefore,
      balanceAfter,
      status: "SUCCESS",
      paymentMethod: method,
      createdAt: new Date().toISOString(),
      notes: notes || `Option B Deposit: Gross ${formatNaira(amount)}, Fee ${formatNaira(fee)}, Net credited ${formatNaira(netCredited)}`,
    };

    setWalletBalance(balanceAfter);
    setTransactions((prev) => [newTx, ...prev]);

    if (fee > 0) {
      showToast(`Wallet credited with ${formatNaira(netCredited)}! (Option B fee: ${formatNaira(fee)})`, "success");
    } else {
      showToast(`Wallet credited with ${formatNaira(netCredited)} successfully!`, "success");
    }

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
      notes: `Automated fast delivery to ${data.recipientPhone} (${data.network})`,
    };

    setWalletBalance(balanceAfter);
    setTransactions((prev) => [newTx, ...prev]);

    // Update beneficiaries
    addBeneficiary({
      name: `${data.network} User`,
      phone: data.recipientPhone,
      network: data.network,
    });

    showToast(`${data.type === "DATA" ? "Data bundle" : "Airtime"} purchase of ${formatNaira(data.amount)} was successful!`, "success");
    return { success: true, transaction: newTx };
  }, [walletBalance, showToast, addBeneficiary]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUserProfile,
        walletBalance,
        transactions,
        beneficiaries,
        activeTab,
        setActiveTab,
        isVirtualModalOpen,
        setIsVirtualModalOpen,
        isOnlinePayModalOpen,
        setIsOnlinePayModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        selectedReceipt,
        setSelectedReceipt,
        toasts,
        showToast,
        removeToast,
        toggleRole,
        setRole,
        resetWallet,
        loadDemoBalance,
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
