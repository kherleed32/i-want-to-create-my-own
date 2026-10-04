"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatNaira } from "@/lib/utils";
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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-white border border-zinc-700">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Online Payment Gateway</h3>
              <p className="text-xs text-zinc-400">Instant Card / USSD / QR Checkout</p>
            </div>
          </div>
          <button
            onClick={() => setIsOnlinePayModalOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
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
              {formatNaira(amount)} has been credited to your KHERLEED DATA wallet.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
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
                    className={`rounded-lg py-2 text-xs font-bold transition border ${
                      amount === q
                        ? "bg-emerald-500 text-zinc-950 border-emerald-400"
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
                <span className="absolute left-3.5 top-3 text-sm font-bold text-zinc-400">₦</span>
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
                      ? "border-emerald-500 bg-emerald-950/20 text-emerald-400"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-[11px] font-semibold">Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel("ussd")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition ${
                    channel === "ussd"
                      ? "border-emerald-500 bg-emerald-950/20 text-emerald-400"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <Smartphone className="h-5 w-5" />
                  <span className="text-[11px] font-semibold">Bank USSD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel("transfer")}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition ${
                    channel === "transfer"
                      ? "border-emerald-500 bg-emerald-950/20 text-emerald-400"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <QrCode className="h-5 w-5" />
                  <span className="text-[11px] font-semibold">Pay with QR</span>
                </button>
              </div>
            </div>

            {/* Fee summary */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-400">
                <span>Top-up Amount</span>
                <span>{formatNaira(amount)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Gateway Fee</span>
                <span className="text-emerald-400 font-semibold">₦0.00 (Zero Fee)</span>
              </div>
              <div className="border-t border-zinc-800/80 pt-1.5 flex justify-between font-bold text-white">
                <span>Total Payable</span>
                <span className="text-emerald-400">{formatNaira(amount)}</span>
              </div>
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
                  <span>Processing Checkout...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Pay {formatNaira(amount)} Now</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
              <span>Secured 256-bit SSL Payment Gateway</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
