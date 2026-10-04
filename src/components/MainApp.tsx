"use client";

import React from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import Header from "@/components/Header";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import WalletCard from "@/components/WalletCard";
import BuyDataForm from "@/components/BuyDataForm";
import BuyAirtimeForm from "@/components/BuyAirtimeForm";
import BillsPreview from "@/components/BillsPreview";
import TransactionHistory from "@/components/TransactionHistory";
import AgentHub from "@/components/AgentHub";
import VirtualAccountModal from "@/components/VirtualAccountModal";
import OnlinePaymentModal from "@/components/OnlinePaymentModal";
import ReceiptModal from "@/components/ReceiptModal";
import ToastContainer from "@/components/ToastContainer";
import {
  Zap,
  ShieldCheck,
  Server,
} from "lucide-react";

function ContentRenderer() {
  const { activeTab } = useApp();

  switch (activeTab) {
    case "data":
      return <BuyDataForm />;
    case "airtime":
      return <BuyAirtimeForm />;
    case "agent-hub":
      return <AgentHub />;
    case "transactions":
      return <TransactionHistory />;
    case "bills":
      return <BillsPreview />;
    default:
      return <BuyDataForm />;
  }
}

export default function MainApp() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Architectural System Map */}
          <ArchitectureFlow />

          {/* Central Wallet Hub */}
          <WalletCard />

          {/* Active Tab View */}
          <ContentRenderer />

          {/* Feature Highlights Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-900">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Automated Instant Delivery</h5>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Direct telecom API routing delivers data & airtime to any network in 5-15 seconds.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Dedicated Virtual Accounts</h5>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Automated bank transfer accounts (Wema, Moniepoint, PalmPay) for zero-delay wallet credit.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Server className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Customer & Reseller Agent Rates</h5>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Easily switch between retail customer rates and wholesale discounted agent prices.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Global Modals & Notifications */}
        <VirtualAccountModal />
        <OnlinePaymentModal />
        <ReceiptModal />
        <ToastContainer />

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">KHERLEED DATA</span>
              <span>•</span>
              <span>VTU Telecom System</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <span>MTN</span>
              <span>•</span>
              <span>Airtel</span>
              <span>•</span>
              <span>Glo</span>
              <span>•</span>
              <span>9mobile</span>
              <span>•</span>
              <span className="text-zinc-600">Bills (Future)</span>
            </div>
            <p>© {new Date().getFullYear()} KHERLEED DATA. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
