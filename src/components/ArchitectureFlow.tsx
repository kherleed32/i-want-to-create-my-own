"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  ChevronDown,
  ChevronUp,
  Zap,
  Building2,
  CreditCard,
  Wallet,
  Wifi,
  PhoneCall,
  Clock,
} from "lucide-react";

export default function ArchitectureFlow() {
  const { user, activeTab, setActiveTab, setIsVirtualModalOpen, setIsOnlinePayModalOpen } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-emerald-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            System Architecture & Flow Map
          </h4>
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
            Live Interactive
          </span>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition"
        >
          <span>{collapsed ? "Show Map" : "Hide Map"}</span>
          {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>
      </div>

      {!collapsed && (
        <div className="mt-4 overflow-x-auto py-2">
          <div className="min-w-[640px] flex flex-col items-center text-center text-xs">
            {/* Level 1: Brand */}
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-5 py-2 font-black tracking-wide text-white shadow-md">
              KHERLEED <span className="text-emerald-400">DATA</span>
            </div>

            {/* Vertical connector */}
            <div className="h-4 w-px bg-zinc-700" />

            {/* Level 2: Roles (CUSTOMER / AGENT) */}
            <div className="relative flex justify-center items-center gap-8 w-full max-w-sm">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-zinc-700" />
              <div
                className={`relative z-10 rounded-lg px-4 py-2 border transition ${
                  user.role === "CUSTOMER"
                    ? "border-emerald-500 bg-emerald-500/20 text-white font-bold ring-1 ring-emerald-500"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400"
                }`}
              >
                CUSTOMER (Retail)
              </div>

              <div
                className={`relative z-10 rounded-lg px-4 py-2 border transition ${
                  user.role === "AGENT"
                    ? "border-amber-400 bg-amber-500/20 text-amber-300 font-bold ring-1 ring-amber-400"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400"
                }`}
              >
                AGENT (Reseller)
              </div>
            </div>

            {/* Connectors converge to Wallet System */}
            <div className="relative w-full max-w-sm flex justify-center">
              <div className="h-4 w-px bg-zinc-700" />
            </div>

            {/* Level 3: Wallet System */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-1.5 font-bold text-zinc-200">
              WALLET SYSTEM
            </div>

            {/* Connectors to funding options */}
            <div className="h-4 w-px bg-zinc-700" />
            <div className="relative flex justify-center items-center gap-6 w-full max-w-md">
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-zinc-700" />

              {/* Virtual Account */}
              <button
                onClick={() => setIsVirtualModalOpen(true)}
                className="relative z-10 flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-zinc-900 px-3 py-1.5 font-semibold text-emerald-400 hover:bg-emerald-950/40 transition"
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>VIRTUAL ACCOUNT</span>
              </button>

              {/* Online Payment */}
              <button
                onClick={() => setIsOnlinePayModalOpen(true)}
                className="relative z-10 flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-semibold text-zinc-300 hover:bg-zinc-800 transition"
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>ONLINE PAYMENT</span>
              </button>
            </div>

            {/* Converge to Wallet Balance */}
            <div className="h-4 w-px bg-zinc-700" />
            <div className="rounded-xl border border-emerald-500/60 bg-emerald-950/30 px-5 py-2 font-black text-emerald-300 shadow-sm flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-400" />
              <span>WALLET BALANCE (Central Clearing)</span>
            </div>

            {/* Connectors to Services */}
            <div className="h-4 w-px bg-zinc-700" />
            <div className="relative flex justify-around w-full max-w-2xl">
              <div className="absolute top-0 left-1/6 right-1/6 h-px bg-zinc-700" />

              {/* Service 1: DATA */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setActiveTab("data")}
                  className={`rounded-lg px-4 py-1.5 border font-bold flex items-center gap-1.5 transition ${
                    activeTab === "data"
                      ? "border-emerald-500 bg-emerald-500/20 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-300"
                  }`}
                >
                  <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                  <span>DATA (Active)</span>
                </button>
                <div className="h-3 w-px bg-zinc-800" />
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/90 p-2 text-[10px] space-y-0.5 text-zinc-400">
                  <p className="text-amber-400 font-bold">MTN (SME/CG)</p>
                  <p className="text-red-400 font-bold">Airtel (Corporate)</p>
                  <p className="text-emerald-400 font-bold">Glo (Corporate)</p>
                  <p className="text-emerald-500 font-bold">9mobile (SME)</p>
                </div>
              </div>

              {/* Service 2: AIRTIME */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setActiveTab("airtime")}
                  className={`rounded-lg px-4 py-1.5 border font-bold flex items-center gap-1.5 transition ${
                    activeTab === "airtime"
                      ? "border-emerald-500 bg-emerald-500/20 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-300"
                  }`}
                >
                  <PhoneCall className="h-3.5 w-3.5 text-blue-400" />
                  <span>AIRTIME (Active)</span>
                </button>
                <div className="h-3 w-px bg-zinc-800" />
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/90 p-2 text-[10px] space-y-0.5 text-zinc-400">
                  <p className="text-amber-400 font-bold">MTN VTU</p>
                  <p className="text-red-400 font-bold">Airtel VTU</p>
                  <p className="text-emerald-400 font-bold">Glo VTU</p>
                  <p className="text-emerald-500 font-bold">9mobile VTU</p>
                </div>
              </div>

              {/* Service 3: BILLS */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setActiveTab("bills")}
                  className="rounded-lg px-4 py-1.5 border border-zinc-800 bg-zinc-900/60 font-semibold text-zinc-500 flex items-center gap-1.5"
                >
                  <Clock className="h-3.5 w-3.5 text-amber-500/70" />
                  <span>BILLS (Future)</span>
                </button>
                <div className="h-3 w-px bg-zinc-800" />
                <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-950/60 p-2 text-[10px] space-y-0.5 text-zinc-500">
                  <p>DSTV (Coming Soon)</p>
                  <p>GOTV (Coming Soon)</p>
                  <p>Electricity (Coming Soon)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
