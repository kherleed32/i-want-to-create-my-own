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
} from "lucide-react";

export default function Header() {
  const {
    user,
    toggleRole,
    walletBalance,
    setIsVirtualModalOpen,
    setActiveTab,
    activeTab,
  } = useApp();

  const [showBalance, setShowBalance] = useState(true);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20">
            <Zap className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                KHERLEED <span className="text-emerald-400">DATA</span>
              </span>
              <span className="hidden rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 sm:inline-block">
                VTU PORTAL
              </span>
            </div>
            <p className="text-xs text-zinc-400">Data • Airtime • Instant Delivery</p>
          </div>
        </div>

        {/* User Role & Wallet Header Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Customer / Agent Role Switcher Badge */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                user.role === "AGENT"
                  ? "border-amber-400/50 bg-amber-500/15 text-amber-300 shadow-sm shadow-amber-500/10 hover:bg-amber-500/20"
                  : "border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
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
                  <UserCheck className="h-3.5 w-3.5 text-zinc-400" />
                  <span>CUSTOMER (Retail)</span>
                </>
              )}
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>

            {/* Dropdown Menu */}
            {showRoleDropdown && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl border border-zinc-700 bg-zinc-900 p-2 shadow-xl ring-1 ring-black/40 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={() => setShowRoleDropdown(false)}
              >
                <div className="px-3 py-2 border-b border-zinc-800 text-left">
                  <p className="text-xs font-medium text-zinc-400">Current Role Mode</p>
                  <p className="text-sm font-semibold text-white capitalize">{user.name}</p>
                </div>

                <div className="p-1 space-y-1">
                  <button
                    onClick={() => {
                      if (user.role !== "CUSTOMER") toggleRole();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
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
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors text-left ${
                      user.role === "AGENT"
                        ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    }`}
                  >
                    <div>
                      <span className="block text-amber-300">Agent / Reseller Mode</span>
                      <span className="text-[10px] text-zinc-400">Discounted bulk prices & profit margins</span>
                    </div>
                    {user.role === "AGENT" && <Sparkles className="h-4 w-4 text-amber-400" />}
                  </button>
                </div>

                <div className="mt-2 border-t border-zinc-800 pt-2 px-1">
                  <button
                    onClick={toggleRole}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-800 py-1.5 text-xs font-medium text-emerald-400 hover:bg-zinc-700 transition"
                  >
                    <ArrowRightLeft className="h-3 w-3" />
                    <span>Quick Switch Account Type</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wallet Header Pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-1.5">
            <Wallet className="h-4 w-4 text-emerald-400" />
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-zinc-400">Wallet:</span>
              <span className="text-xs font-bold text-white tracking-wide">
                {showBalance ? formatNaira(walletBalance) : "••••••"}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-zinc-400 hover:text-zinc-200 transition"
                title={showBalance ? "Hide balance" : "Show balance"}
              >
                {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </button>
            </div>
            <button
              onClick={() => setIsVirtualModalOpen(true)}
              className="ml-1 rounded-md bg-emerald-500/20 p-1 text-emerald-400 hover:bg-emerald-500/30 transition"
              title="Fund Wallet"
            >
              <PlusCircle className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-t border-zinc-800/80 bg-zinc-950/60 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setActiveTab("data")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "data"
                ? "bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            🌐 Buy Data
          </button>

          <button
            onClick={() => setActiveTab("airtime")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "airtime"
                ? "bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            📱 Buy Airtime
          </button>

          <button
            onClick={() => setActiveTab("agent-hub")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "agent-hub"
                ? "bg-amber-400 text-zinc-950 shadow-sm shadow-amber-400/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            ⭐ Reseller / Agent Hub
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "transactions"
                ? "bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/20"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
          >
            📜 Transactions
          </button>

          <button
            onClick={() => setActiveTab("bills")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "bills"
                ? "bg-zinc-800 text-white"
                : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-400"
            }`}
          >
            🧾 Bills <span className="rounded bg-zinc-800 text-zinc-400 text-[10px] px-1 py-0.2">Coming Soon</span>
          </button>
        </div>
      </div>
    </header>
  );
}
