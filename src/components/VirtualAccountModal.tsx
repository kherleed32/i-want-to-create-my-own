"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatNaira, calculateOptionBFee } from "@/lib/utils";
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
  Calculator,
} from "lucide-react";

export default function VirtualAccountModal() {
  const {
    user,
    isVirtualModalOpen,
    setIsVirtualModalOpen,
    fundWallet,
    showToast,
  } = useApp();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [simAmount, setSimAmount] = useState<string>("2000");
  const [simBank, setSimBank] = useState<string>("Wema Bank");
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isVirtualModalOpen) return null;

  const simAmountNum = parseFloat(simAmount) || 0;
  const simFee = calculateOptionBFee(simAmountNum);
  const simNet = Math.max(0, simAmountNum - simFee);

  const copyToClipboard = (text: string, index: number, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast(`${bank} account number copied!`, "success");
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSimulateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (simAmountNum < 100) {
      showToast("Minimum simulated transfer is ₦100", "error");
      return;
    }

    setIsSimulating(true);
    // Simulate real bank webhook delay
    setTimeout(async () => {
      await fundWallet(
        simAmountNum,
        "VIRTUAL_ACCOUNT",
        `Simulated Bank Transfer via ${simBank} (Dedicated VA)`
      );
      setIsSimulating(false);
      setIsVirtualModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Dedicated Virtual Bank Accounts</h3>
              <p className="text-xs text-zinc-400">Automated Instant Transfer Clearing</p>
            </div>
          </div>
          <button
            onClick={() => setIsVirtualModalOpen(false)}
            className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Option B Fee Policy Banner */}
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
          <div>
            <p className="font-bold text-white">Option B Funding Policy Active:</p>
            <p className="mt-0.5 text-zinc-300">
              Transfer to any of your 3 dedicated accounts from your bank app (GTB, OPay, PalmPay, Kuda, Zenith, etc.).
              A nominal processing charge (1.2% / capped at ₦65) is deducted, and the net funds are credited immediately.
            </p>
          </div>
        </div>

        {/* Virtual Accounts List - ALL 3 BANKS */}
        <div className="mt-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Your 3 Dedicated Bank Accounts
          </p>

          {user.virtualAccounts.map((account, idx) => (
            <div
              key={account.accountNumber}
              className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition-all hover:border-emerald-500/50"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      {account.bankName}
                    </span>
                    <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400">
                      Bank Code: {account.bankCode}
                    </span>
                  </div>

                  <p className="text-xl sm:text-2xl font-mono font-black tracking-wider text-emerald-400 my-1">
                    {account.accountNumber}
                  </p>

                  <p className="text-xs text-zinc-400">
                    Account Name: <span className="font-semibold text-white">{account.accountName}</span>
                  </p>
                </div>

                <button
                  onClick={() => copyToClipboard(account.accountNumber, idx, account.bankName)}
                  className={`self-start sm:self-center flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-sm ${
                    copiedIndex === idx
                      ? "bg-emerald-500 text-zinc-950"
                      : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
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
                      <span>Copy Account</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How it works steps */}
        <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4 text-xs text-zinc-400">
          <p className="font-bold text-zinc-200 mb-2 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span>How Automated Funding Works:</span>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-zinc-300">
            <li>Copy any of your 3 dedicated account numbers above</li>
            <li>Open your bank mobile app or USSD and make a standard transfer</li>
            <li>Recipient name will display as <span className="font-semibold text-white">KHERLEED - {user.name}</span></li>
            <li>Our automated webhook detects the incoming credit and updates your balance immediately</li>
          </ol>
        </div>

        {/* Option B Fee Breakdown & Test Simulator */}
        <div className="mt-5 border-t border-zinc-800 pt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              <Calculator className="h-4 w-4 text-amber-400" />
              <span>Option B Fee Breakdown & Test Simulator</span>
            </span>
            <span className="text-[10px] rounded bg-zinc-800 px-2 py-0.5 text-amber-300 font-semibold">
              Live Preview
            </span>
          </div>

          <p className="text-xs text-zinc-400 mb-3">
            Simulate a bank transfer to test how automated credit and Option B nominal fee deductions work:
          </p>

          <form onSubmit={handleSimulateTransfer} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Destination Bank
                </label>
                <select
                  value={simBank}
                  onChange={(e) => setSimBank(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Wema Bank">Wema Bank (035)</option>
                  <option value="Moniepoint MFB">Moniepoint MFB (50515)</option>
                  <option value="PalmPay / Squad">PalmPay / Squad (999991)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                  Transfer Amount (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-zinc-400">₦</span>
                  <input
                    type="number"
                    min="100"
                    max="500000"
                    step="100"
                    value={simAmount}
                    onChange={(e) => setSimAmount(e.target.value)}
                    placeholder="2000"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-7 pr-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Live Fee Breakdown */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs space-y-1">
              <div className="flex justify-between text-zinc-400">
                <span>Transfer Deposit:</span>
                <span className="font-mono text-white">{formatNaira(simAmountNum)}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Option B Fee (1.2%):</span>
                <span className="font-mono">- {formatNaira(simFee)}</span>
              </div>
              <div className="border-t border-zinc-800/80 pt-1 flex justify-between font-bold text-emerald-400">
                <span>Net Credited to Wallet:</span>
                <span className="font-mono">{formatNaira(simNet)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSimulating || simAmountNum < 100}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-xs font-bold text-zinc-950 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 transition"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Clearing Transfer Webhook...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Simulate Instant Deposit ({formatNaira(simNet)})</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
