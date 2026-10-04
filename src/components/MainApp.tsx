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
import ProfileModal from "@/components/ProfileModal";
import ReceiptModal from "@/components/ReceiptModal";
import ToastContainer from "@/components/ToastContainer";
import {
  Zap,
  ShieldCheck,
  Server,
  Wifi,
  PhoneCall,
  Tv,
  Lightbulb,
  GraduationCap,
  Printer,
  RefreshCw,
  Sparkles,
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
      <div className="min-h-screen flex flex-col bg-slate-950 text-zinc-100">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Central Luxury Wallet & 3 Dedicated Bank Accounts Hub */}
          <WalletCard />

          {/* Alrahuzdata-style Luxury Quick Services Grid */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-zinc-800/80 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Quick Service Portal (Alrahuz Suite)
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Fast Automated Processing
              </span>
            </div>

            <QuickServicesGrid />
          </section>

          {/* Architectural System Map */}
          <ArchitectureFlow />

          {/* Active Tab Service View (Data, Airtime, Reseller, Statement, Bills) */}
          <ContentRenderer />

          {/* Feature Highlights Grid with Realistic Wording (Fixing Points 3 & 4) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-900">
            {/* Feature 1: Fast Automated Delivery (Replaces exaggerated telecom API routing) */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Fast Automated Delivery</h5>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Fast automated delivery delivers data & airtime smoothly to any network.
                </p>
              </div>
            </div>

            {/* Feature 2: Dedicated Virtual Accounts with Option B */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Dedicated Virtual Accounts</h5>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Automated bank transfer accounts (Wema, Moniepoint, PalmPay) for fast automated wallet credit (Option B: Small nominal funding charge applies).
                </p>
              </div>
            </div>

            {/* Feature 3: Wholesale Reseller Pricing */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Retail & Reseller Agent Rates</h5>
                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                  Easily switch between retail customer prices and wholesale discounted agent margins.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Global Modals & Notifications */}
        <VirtualAccountModal />
        <OnlinePaymentModal />
        <ProfileModal />
        <ReceiptModal />
        <ToastContainer />

        {/* Luxury Footer */}
        <footer className="border-t border-zinc-900 bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">KHERLEED DATA</span>
              <span>•</span>
              <span className="text-amber-400">Luxury VTU Telecom Portal</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-xs">
              <span>MTN</span>
              <span>•</span>
              <span>Airtel</span>
              <span>•</span>
              <span>Glo</span>
              <span>•</span>
              <span>9mobile</span>
              <span>•</span>
              <span className="text-zinc-600">Option B Automated Funding</span>
            </div>
            <p>© {new Date().getFullYear()} KHERLEED DATA. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

function QuickServicesGrid() {
  const { setActiveTab, activeTab, showToast } = useApp();

  const services = [
    {
      id: "data",
      name: "Buy Data",
      desc: "SME & CG Bundles",
      icon: Wifi,
      active: true,
      color: "from-amber-500/20 to-emerald-500/20 text-emerald-400 border-emerald-500/30",
      action: () => setActiveTab("data"),
    },
    {
      id: "airtime",
      name: "Buy Airtime",
      desc: "Instant Discount VTU",
      icon: PhoneCall,
      active: true,
      color: "from-blue-500/20 to-teal-500/20 text-blue-400 border-blue-500/30",
      action: () => setActiveTab("airtime"),
    },
    {
      id: "agent-hub",
      name: "Reseller Agent",
      desc: "Wholesale Margin Hub",
      icon: Sparkles,
      active: true,
      color: "from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30",
      action: () => setActiveTab("agent-hub"),
    },
    {
      id: "cable",
      name: "Cable TV",
      desc: "DSTV, GOTV & Startimes",
      icon: Tv,
      active: false,
      color: "from-zinc-800 to-zinc-900 text-zinc-400 border-zinc-700/50",
      action: () => setActiveTab("bills"),
    },
    {
      id: "electricity",
      name: "Electricity",
      desc: "Prepaid Disco Tokens",
      icon: Lightbulb,
      active: false,
      color: "from-zinc-800 to-zinc-900 text-zinc-400 border-zinc-700/50",
      action: () => setActiveTab("bills"),
    },
    {
      id: "exams",
      name: "Exam Result PINs",
      desc: "WAEC, NECO, NABTEB",
      icon: GraduationCap,
      active: false,
      color: "from-zinc-800 to-zinc-900 text-zinc-400 border-zinc-700/50",
      action: () => showToast("Exam PIN purchase service scheduled in next sprint roadmap!", "info"),
    },
    {
      id: "recharge",
      name: "Card Printing",
      desc: "e-PIN Recharge Printing",
      icon: Printer,
      active: false,
      color: "from-zinc-800 to-zinc-900 text-zinc-400 border-zinc-700/50",
      action: () => showToast("Recharge Card Printing feature scheduled in next sprint roadmap!", "info"),
    },
    {
      id: "airtime2cash",
      name: "Airtime to Cash",
      desc: "Convert Airtime to Naira",
      icon: RefreshCw,
      active: false,
      color: "from-zinc-800 to-zinc-900 text-zinc-400 border-zinc-700/50",
      action: () => showToast("Airtime to Cash feature is scheduled in upcoming expansion!", "info"),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
      {services.map((s) => {
        const Icon = s.icon;
        const isCurrent = activeTab === s.id;

        return (
          <button
            key={s.id}
            onClick={s.action}
            className={`flex flex-col items-center justify-between rounded-xl border p-2.5 text-center transition-all ${
              isCurrent
                ? "border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500 shadow-md"
                : s.active
                ? "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900"
                : "border-zinc-800/60 bg-zinc-950/40 opacity-70 hover:opacity-90"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br border ${s.color} mb-1.5`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-[11px] font-bold text-white truncate w-full">{s.name}</p>
            <p className="text-[9px] text-zinc-400 truncate w-full mt-0.5">{s.desc}</p>
            {!s.active && (
              <span className="mt-1 rounded bg-zinc-800 px-1 py-0.2 text-[8px] text-amber-400 font-semibold">
                Soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
