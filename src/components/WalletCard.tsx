"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatNaira } from "@/lib/utils";
import {
  Wallet,
  Building2,
  CreditCard,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUpRight,
  Shield,
  Check,
  Copy,
  Zap,
  User,
  History,
  Info,
} from "lucide-react";

export default function WalletCard() {
  const {
    user,
    walletBalance,
    setIsVirtualModalOpen,
    setIsOnlinePayModalOpen,
    setIsProfileModalOpen,
    setActiveTab,
    toggleRole,
    showToast,
  } = useApp();

  const [showBalance, setShowBalance] = useState(true);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    showToast(`${bank} account number (${text}) copied!`, "success");
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Luxury Master Wallet Card */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 shadow-2xl shadow-black/60">
        {/* Subtle Luxury Ambient Mesh Glows */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Top Header of Card: Brand, User Greeting & Profile Switcher */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            {/* Holographic EMV Chip Icon */}
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-zinc-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-300/40">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400">
                  KHERLEED DATA
                </span>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  {user.role === "AGENT" ? "VIP RESELLER" : "SMART WALLET"}
                </span>
              </div>
              <p className="text-sm font-bold text-white mt-0.5">
                Hi, {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition"
              title="Edit Profile & Account Name"
            >
              <User className="h-3.5 w-3.5 text-amber-400" />
              <span>My Account</span>
            </button>

            <button
              onClick={toggleRole}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition shadow-sm ${
                user.role === "AGENT"
                  ? "border-amber-400/50 bg-amber-400/15 text-amber-300 hover:bg-amber-400/25"
                  : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{user.role === "AGENT" ? "Agent Wholesale Active" : "Switch to Agent Rates"}</span>
            </button>
          </div>
        </div>

        {/* Center: Large Balance Display & Quick Fund Actions */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
          {/* Left Column: Balance */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Available Wallet Balance
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-zinc-500 hover:text-zinc-300 transition"
                title={showBalance ? "Hide balance" : "Show balance"}
              >
                {showBalance ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5 text-emerald-400" />}
              </button>
            </div>

            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
                {showBalance ? formatNaira(walletBalance) : "₦ • • • • • •"}
              </h2>
            </div>

            <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
              <Shield className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>
                Personal customer wallet • Instant debit on automated purchases
              </span>
            </p>
          </div>

          {/* Right Column: Instant Action Buttons (Alrahuzdata Fintech Style) */}
          <div className="lg:col-span-6 flex flex-wrap sm:flex-nowrap items-stretch gap-3">
            {/* Action 1: Bank Transfer (Dedicated Virtual Account) */}
            <button
              onClick={() => setIsVirtualModalOpen(true)}
              className="group flex-1 flex flex-col justify-between rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-left transition-all hover:border-emerald-400 hover:bg-emerald-950/40 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  Instant
                </span>
              </div>
              <div>
                <p className="text-xs font-black text-white group-hover:text-emerald-300 transition">
                  Virtual Bank Transfer
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Wema, Moniepoint & PalmPay
                </p>
              </div>
            </button>

            {/* Action 2: Online Payment (Debit Card / USSD) */}
            <button
              onClick={() => setIsOnlinePayModalOpen(true)}
              className="group flex-1 flex flex-col justify-between rounded-2xl border border-amber-500/30 bg-amber-950/15 p-4 text-left transition-all hover:border-amber-400 hover:bg-amber-950/30 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                  Card / USSD
                </span>
              </div>
              <div>
                <p className="text-xs font-black text-white group-hover:text-amber-300 transition">
                  Online Payment
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Instant Card & USSD Top-up
                </p>
              </div>
            </button>

            {/* Action 3: Statement */}
            <button
              onClick={() => setActiveTab("transactions")}
              className="flex-none flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-center transition hover:border-zinc-600 hover:bg-zinc-800"
              title="View Transaction History"
            >
              <History className="h-5 w-5 text-zinc-400 mb-1" />
              <span className="text-[11px] font-bold text-zinc-300">Statement</span>
            </button>
          </div>
        </div>
      </div>

      {/* DEDICATED VIRTUAL ACCOUNTS SECTION: ALL 3 BANKS CLEARLY VISIBLE (Fixing Point 2 & 4) */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Dedicated Virtual Bank Accounts (All 3 Automated Banks)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Make a transfer to any of your 3 dedicated accounts below. Funds credit automatically.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVirtualModalOpen(true)}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 flex items-center gap-1 transition"
            >
              <span>Transfer Details & Simulator</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Bank Cards Grid: Wema Bank, Moniepoint MFB, PalmPay / Squad */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {user.virtualAccounts.map((account) => {
            const isCopied = copiedBank === account.bankName;

            return (
              <div
                key={account.accountNumber}
                className="relative rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 transition-all hover:border-emerald-500/50 hover:bg-zinc-950 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                      {account.bankName}
                    </span>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-emerald-400 border border-emerald-500/20">
                      Code: {account.bankCode}
                    </span>
                  </div>

                  <p className="text-xl font-mono font-extrabold tracking-wider text-emerald-400 my-1">
                    {account.accountNumber}
                  </p>

                  <p className="text-[11px] text-zinc-400 truncate">
                    Account Name:{" "}
                    <span className="font-semibold text-zinc-200">{account.accountName}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500">Zero-delay credit</span>
                  <button
                    onClick={() => copyToClipboard(account.accountNumber, account.bankName)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition shadow-sm ${
                      isCopied
                        ? "bg-emerald-500 text-zinc-950"
                        : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Account</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Option B Fee Explanation Strip */}
        <div className="mt-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 flex items-start gap-2.5 text-xs text-amber-300/90">
          <Info className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <p>
            <span className="font-bold text-white">Deposit Fee Notice (Option B):</span> As configured,
            automated deposits incur a small nominal processing charge (1.2% / capped at ₦65) rather than
            a monthly platform subscription. Net funds are instantly cleared into your wallet balance.
          </p>
        </div>
      </div>
    </div>
  );
}
