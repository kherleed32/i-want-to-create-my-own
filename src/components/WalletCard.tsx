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
} from "lucide-react";

export default function WalletCard() {
  const {
    user,
    walletBalance,
    setIsVirtualModalOpen,
    setIsOnlinePayModalOpen,
    toggleRole,
  } = useApp();

  const [showBalance, setShowBalance] = useState(true);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const primaryVirtualAccount = user.virtualAccounts[0]; // Wema Bank

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 p-5 sm:p-6 shadow-xl shadow-black/40">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Balance & User status */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-emerald-400 border border-zinc-700">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Wallet Balance
                </span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-zinc-500 hover:text-zinc-300 transition"
                  title={showBalance ? "Hide balance" : "Show balance"}
                >
                  {showBalance ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-0.5">
                {showBalance ? formatNaira(walletBalance) : "₦ • • • • • •"}
              </h2>
            </div>
          </div>

          {/* Role badge & Upgrade banner */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                user.role === "AGENT"
                  ? "bg-amber-400/15 text-amber-300 border border-amber-400/30"
                  : "bg-zinc-800 text-zinc-300 border border-zinc-700"
              }`}
            >
              {user.role === "AGENT" ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>Agent Wholesale Account Active</span>
                </>
              ) : (
                <>
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Standard Customer Account</span>
                </>
              )}
            </span>

            {user.role === "CUSTOMER" ? (
              <button
                onClick={toggleRole}
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4 transition"
              >
                <span>Upgrade to Agent Wholesale</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            ) : (
              <span className="text-xs text-zinc-500">
                Enjoying wholesale data rates (SME & Corporate)
              </span>
            )}
          </div>
        </div>

        {/* Right: Funding Action Hub (Virtual Account & Online Payment) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Method 1: Virtual Account */}
          <button
            onClick={() => setIsVirtualModalOpen(true)}
            className="group flex flex-1 sm:flex-initial items-center gap-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 text-left transition hover:border-emerald-500/60 hover:bg-emerald-950/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 group-hover:scale-105 transition-transform">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-emerald-300">Virtual Account</span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-400">
                  Instant
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Bank Transfer Top-up</p>
            </div>
          </button>

          {/* Method 2: Online Payment */}
          <button
            onClick={() => setIsOnlinePayModalOpen(true)}
            className="group flex flex-1 sm:flex-initial items-center gap-3.5 rounded-xl border border-zinc-700 bg-zinc-800/60 p-3.5 text-left transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-700 text-zinc-200 border border-zinc-600 group-hover:scale-105 transition-transform">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Online Payment</span>
                <span className="rounded bg-zinc-700 px-1.5 py-0.2 text-[10px] font-semibold text-zinc-300">
                  Card / USSD
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Gateway Instant Credit</p>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Dedicated Virtual Account Preview Strip */}
      {primaryVirtualAccount && (
        <div className="mt-5 border-t border-zinc-800/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/40 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-2xl">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dedicated Bank Transfer Number:</span>
            <span className="font-semibold text-zinc-200">{primaryVirtualAccount.bankName}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1 rounded-md">
              {primaryVirtualAccount.accountNumber}
            </span>
            <button
              onClick={() => copyToClipboard(primaryVirtualAccount.accountNumber, primaryVirtualAccount.bankName)}
              className="flex items-center gap-1 rounded-md bg-zinc-800 hover:bg-zinc-700 px-2 py-1 text-xs text-zinc-300 transition"
              title="Copy account number"
            >
              {copiedBank === primaryVirtualAccount.bankName ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsVirtualModalOpen(true)}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-2 ml-1"
            >
              View all 3 banks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
