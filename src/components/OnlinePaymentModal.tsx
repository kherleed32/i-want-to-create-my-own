"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatNaira, calculateOptionBFee } from "@/lib/utils";
import {
  X,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  QrCode,
  Smartphone,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function OnlinePaymentModal() {
  const {
    isOnlinePayModalOpen,
    setIsOnlinePayModalOpen,
    fundWallet,
  } = useApp();

  const [amount, setAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState<string>("2000");
  const [channel, setChannel] = useState<"card" | "ussd" | "transfer">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOnlinePayModalOpen) return null;

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmount(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const num = parseFloat(e.target.value);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const fee = calculateOptionBFee(amount);
  const netAmount = Math.max(0, amount - fee);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 100) return;

    setIsProcessing(true);

    // Simulate online gateway processing
    setTimeout(async () => {
      await fundWallet(amount, "CARD_ONLINE", `Online payment via ${channel.toUpperCase()}`);
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOnlinePayModalOpen(false);
      }, 1500);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Online Payment Gateway</h3>
              <p className="text-xs text-zinc-400">Instant Card / USSD Checkout</p>
            </div>
          </div>
          <button
            onClick={() => setIsOnlinePayModalOpen(false)}
            className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h4 className="text-xl font-bold text-white">Payment Successful!</h4>
            <p className="text-sm text-zinc-400 mt-1">
              {formatNaira(netAmount)} has been credited to your KHERLEED DATA wallet.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Quick Amount Selection */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSelectAmount(q)}
                    className={`rounded-xl py-2 text-xs font-bold transition border ${
                      amount === q
                        ? "bg-amber-400 text-zinc-950 border-amber-400"
                        : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-600"
                    }`}
                  >
                    ₦{q.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Or enter custom amount (Min ₦100)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-base font-bold text-zinc-400">₦</span>
                <input
                  type="number"
                  min="100"
                  max="1000000"
                  step="50"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-8 pr-4 py-2.5 text-base font-bold text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Payment Channel */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Payment Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setChannel("card")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition ${
                    channel === "card"
                      ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-[11px]">Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel("ussd")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition ${
                    channel === "ussd"
                      ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <Smartphone className="h-5 w-5" />
                  <span className="text-[11px]">Bank USSD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel("transfer")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition ${
                    channel === "transfer"
                      ? "border-amber-400 bg-amber-400/10 text-amber-300 font-bold"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <QrCode className="h-5 w-5" />
                  <span className="text-[11px]">Pay with QR</span>
                </button>
              </div>
            </div>

            {/* Fee summary (Option B breakdown) */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-400">
                <span>Top-up Gross Amount:</span>
                <span>{formatNaira(amount)}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Option B Gateway Fee:</span>
                <span>- {formatNaira(fee)}</span>
              </div>
              <div className="border-t border-zinc-800/80 pt-1.5 flex justify-between font-bold text-white">
                <span>Net Credited to Wallet:</span>
                <span className="text-emerald-400">{formatNaira(netAmount)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-zinc-950/60 p-2.5 text-[11px] text-zinc-400 border border-zinc-800">
              <Info className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Option B deposit fee handles gateway processing so your account maintains lifetime zero subscription fees.
              </span>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing || amount < 100}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 transition"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Authorizing Checkout...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Pay & Credit {formatNaira(netAmount)}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
              <span>Secured 256-bit SSL Gateway (Paystack/Squad/Monnify)</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
