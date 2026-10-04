"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatNaira } from "@/lib/utils";
import {
  Zap,
  Wallet,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  ArrowRightLeft,
  Sparkles,
  Eye,
  EyeOff,
  PlusCircle,
  User,
  Radio,
  RotateCcw,
} from "lucide-react";

export default function Header() {
  const {
    user,
    toggleRole,
    walletBalance,
    setIsVirtualModalOpen,
    setIsProfileModalOpen,
    resetWallet,
    loadDemoBalance,
    setActiveTab,
    activeTab,
  } = useApp();

  const [showBalance, setShowBalance] = useState(true);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
      {/* Alrahuzdata-style Live Network Status Marquee / Bulletin */}
      <div className="border-b border-zinc-900 bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-amber-950/30 px-4 py-1 text-[11px] text-zinc-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Radio className="h-3 w-3 text-emerald-400 shrink-0 animate-pulse" />
            <span className="font-bold text-emerald-400 shrink-0">SERVER STATUS:</span>
            <span className="text-zinc-400 text-[11px] truncate">
              MTN SME & Corporate 100% Instant • Airtel & Glo VTU Active • 9mobile Operational • Dedicated Accounts Live (Option B)
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px]">
            <span className="text-zinc-400">
              Personal Wallet: <strong className="text-white">{formatNaira(walletBalance)}</strong>
            </span>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 font-medium"
            >
              Account Profile
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20 ring-1 ring-white/20">
            <Zap className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                KHERLEED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">DATA</span>
              </span>
              <span className="hidden rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/20 sm:inline-block">
                LUXURY VTU
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Fast Automated Telecom & Data Platform</p>
          </div>
        </div>

        {/* User Role, Wallet & Profile Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Customer / Agent Role Switcher Badge */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
                user.role === "AGENT"
                  ? "border-amber-400/50 bg-amber-500/15 text-amber-300 shadow-amber-500/10 hover:bg-amber-500/20"
                  : "border-zinc-700 bg-zinc-900/90 text-zinc-300 hover:border-zinc-500 hover:text-white"
              }`}
              title="Click to toggle Customer or Agent wholesale rates"
            >
              {user.role === "AGENT" ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>AGENT (Wholesale)</span>
                </>
              ) : (
                <>
                  <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>CUSTOMER (Retail)</span>
                </>
              )}
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>

            {/* Dropdown Menu */}
            {showRoleDropdown && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-2xl border border-zinc-700 bg-zinc-900 p-2.5 shadow-2xl ring-1 ring-black/50 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setShowRoleDropdown(false)}
              >
                <div className="px-3 py-2 border-b border-zinc-800 text-left">
                  <p className="text-[11px] font-semibold text-zinc-400">Active Account Session</p>
                  <p className="text-sm font-bold text-white capitalize">{user.name}</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    Balance: {formatNaira(walletBalance)}
                  </p>
                </div>

                <div className="p-1 space-y-1">
                  <button
                    onClick={() => {
                      if (user.role !== "CUSTOMER") toggleRole();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors text-left ${
                      user.role === "CUSTOMER"
                        ? "bg-zinc-800 text-white font-bold"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="block text-zinc-200">Customer Mode</span>
                      <span className="text-[10px] text-zinc-500">Retail rates for personal top-ups</span>
                    </div>
                    {user.role === "CUSTOMER" && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => {
                      if (user.role !== "AGENT") toggleRole();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors text-left ${
                      user.role === "AGENT"
                        ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="block text-amber-300">Agent / Reseller Mode</span>
                      <span className="text-[10px] text-zinc-400">Discounted wholesale prices & profits</span>
                    </div>
                    {user.role === "AGENT" && <Sparkles className="h-4 w-4 text-amber-400" />}
                  </button>
                </div>

                {/* Quick actions inside dropdown */}
                <div className="mt-2 border-t border-zinc-800 pt-2 px-1 space-y-1">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-800 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition"
                  >
                    <User className="h-3 w-3 text-amber-400" />
                    <span>Manage Profile & PIN</span>
                  </button>

                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <button
                      onClick={() => loadDemoBalance(5000)}
                      className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 py-1 text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/20"
                    >
                      +₦5,000 Demo
                    </button>
                    <button
                      onClick={resetWallet}
                      className="rounded-lg bg-zinc-800 border border-zinc-700 py-1 text-[10px] font-semibold text-zinc-400 hover:text-white"
                    >
                      Reset ₦0.00
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wallet Header Pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 shadow-inner">
            <Wallet className="h-4 w-4 text-emerald-400" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400">Wallet:</span>
              <span className="text-xs font-black text-white tracking-wide">
                {showBalance ? formatNaira(walletBalance) : "••••••"}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-zinc-400 hover:text-zinc-200 transition"
                title={showBalance ? "Hide balance" : "Show balance"}
              >
                {showBalance ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
            <button
              onClick={() => setIsVirtualModalOpen(true)}
              className="ml-1 rounded-lg bg-emerald-500/20 p-1 text-emerald-400 hover:bg-emerald-500/30 transition"
              title="Fund Wallet"
            >
              <PlusCircle className="h-4 w-4" />
            </button>
          </div>

          {/* Profile Button */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:text-white transition"
            title="Profile & Settings"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Navigation tabs (Alrahuzdata Luxury Style) */}
      <div className="border-t border-zinc-800/80 bg-zinc-950/70 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-2.5 scrollbar-none">
          <button
            onClick={() => setActiveTab("data")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "data"
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            🌐 Buy Data (SME/CG)
          </button>

          <button
            onClick={() => setActiveTab("airtime")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "airtime"
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            📱 Buy Airtime VTU
          </button>

          <button
            onClick={() => setActiveTab("agent-hub")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "agent-hub"
                ? "bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            ⭐ Reseller / Agent Hub
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "transactions"
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            📜 Transactions Statement
          </button>

          <button
            onClick={() => setActiveTab("bills")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "bills"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-400"
            }`}
          >
            🧾 Bills <span className="rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px] px-1.5 py-0.2">Coming Soon</span>
          </button>
        </div>
      </div>
    </header>
  );
}
