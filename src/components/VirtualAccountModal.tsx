"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  X,
  Building2,
  Copy,
  Check,
  Zap,
  Info,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function VirtualAccountModal() {
  const {
    user,
    isVirtualModalOpen,
    setIsVirtualModalOpen,
    fundWallet,
  } = useApp();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [simAmount, setSimAmount] = useState<string>("2000");
  const [simBank, setSimBank] = useState<string>("Wema Bank");
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isVirtualModalOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSimulateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(simAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setIsSimulating(true);
    // Simulate real webhook delay
    setTimeout(async () => {
      await fundWallet(
        amountNum,
        "VIRTUAL_ACCOUNT",
        `Simulated Bank Transfer via ${simBank} (Dedicated VA)`
      );
      setIsSimulating(false);
      setIsVirtualModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dedicated Virtual Accounts</h3>
              <p className="text-xs text-zinc-400">Automated Instant Bank Transfer</p>
            </div>
          </div>
          <button
            onClick={() => setIsVirtualModalOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-300">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
          <p>
            Transfer to any of your dedicated accounts below from your bank app or USSD. Your
            KHERLEED DATA wallet will be credited automatically within seconds.
          </p>
        </div>

        {/* Virtual Accounts List */}
        <div className="mt-4 space-y-3">
          {user.virtualAccounts.map((account, idx) => (
            <div
              key={account.accountNumber}
              className="group relative rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 transition hover:border-emerald-500/40"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {account.bankName}
                  </span>
                  <p className="text-lg font-mono font-bold tracking-wider text-emerald-400 mt-0.5">
                    {account.accountNumber}
                  </p>
                  <p className="text-xs text-zinc-300 mt-1">
                    Account Name: <span className="font-semibold text-white">{account.accountName}</span>
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(account.accountNumber, idx)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    copiedIndex === idx
                      ? "bg-emerald-500 text-zinc-950"
                      : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                  }`}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How it works steps */}
        <div className="mt-5 rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-3.5 text-xs text-zinc-400">
          <p className="font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span>How Automated Funding Works:</span>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-zinc-400">
            <li>Copy your account number above</li>
            <li>Open any bank app (GTB, Kuda, Zenith, OPay, etc.) and make a transfer</li>
            <li>Our automated webhook detects the incoming credit and updates your balance immediately</li>
          </ol>
        </div>

        {/* Live Simulator for Demonstration/Testing */}
        <div className="mt-5 border-t border-zinc-800 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Test Simulator (Instant Bank Transfer)</span>
            </span>
            <span className="text-[10px] rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">
              Demo Test
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-3">
            Want to test wallet funding now? Simulate an incoming bank transfer below:
          </p>

          <form onSubmit={handleSimulateTransfer} className="flex flex-col sm:flex-row gap-2">
            <select
              value={simBank}
              onChange={(e) => setSimBank(e.target.value)}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="Wema Bank">Wema Bank</option>
              <option value="Moniepoint MFB">Moniepoint MFB</option>
              <option value="PalmPay / Squad">PalmPay / Squad</option>
            </select>

            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-xs text-zinc-400">₦</span>
              <input
                type="number"
                min="100"
                max="500000"
                step="100"
                value={simAmount}
                onChange={(e) => setSimAmount(e.target.value)}
                placeholder="Amount (e.g. 2000)"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 pl-7 pr-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSimulating}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Crediting...</span>
                </>
              ) : (
                <>
                  <span>Simulate Transfer</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
