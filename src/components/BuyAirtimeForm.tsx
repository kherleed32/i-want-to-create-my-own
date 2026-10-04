"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { NetworkType } from "@/types";
import { NETWORKS } from "@/data/plans";
import {
  detectNetwork,
  isValidNigerianPhone,
  formatNaira,
} from "@/lib/utils";
import {
  PhoneCall,
  Phone,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function BuyAirtimeForm() {
  const {
    user,
    walletBalance,
    beneficiaries,
    executePurchase,
    setIsVirtualModalOpen,
    setSelectedReceipt,
    toggleRole,
  } = useApp();

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkType>("MTN");
  const [faceAmount, setFaceAmount] = useState<number>(1000);
  const [customAmountStr, setCustomAmountStr] = useState<string>("1000");
  const [phone, setPhone] = useState<string>("");
  const [isPortedNumber, setIsPortedNumber] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("1234");

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  const netConfig = NETWORKS[selectedNetwork];
  const discountRate =
    user.role === "AGENT"
      ? netConfig.airtimeDiscountAgent
      : netConfig.airtimeDiscountCustomer;

  const discountAmount = Math.round(faceAmount * discountRate);
  const payableAmount = faceAmount - discountAmount;

  const hasEnoughBalance = walletBalance >= payableAmount;
  const isPhoneValid = isValidNigerianPhone(phone);

  const handleAmountClick = (val: number) => {
    setFaceAmount(val);
    setCustomAmountStr(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmountStr(e.target.value);
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed) && parsed > 0) {
      setFaceAmount(parsed);
    }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (!isPortedNumber && val.length >= 4) {
      const detected = detectNetwork(val);
      if (detected && detected !== selectedNetwork) {
        setSelectedNetwork(detected);
      }
    }
  };

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid || !hasEnoughBalance || faceAmount < 50) return;
    setConfirmModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    setIsSubmitting(true);

    const result = await executePurchase({
      type: "AIRTIME",
      amount: payableAmount,
      network: selectedNetwork,
      recipientPhone: phone,
      planName: `₦${faceAmount.toLocaleString()} VTU Airtime`,
      discountOrProfit: discountAmount,
    });

    setIsSubmitting(false);
    setConfirmModalOpen(false);

    if (result.success && result.transaction) {
      setSelectedReceipt(result.transaction);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Purchase Airtime VTU</h3>
            <p className="text-xs text-zinc-400">
              Instant VTU recharge with automatic discount
            </p>
          </div>
        </div>

        {/* Pricing notice */}
        <div className="flex items-center gap-2">
          {user.role === "AGENT" ? (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3 w-3" />
              <span>Wholesale {(discountRate * 100).toFixed(1)}% Discount Active</span>
            </span>
          ) : (
            <button
              onClick={toggleRole}
              className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
            >
              <span>Switch to Agent rates (up to 4.0% discount)</span>
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleOpenConfirm} className="mt-6 space-y-6">
        {/* 1. Select Network */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
            1. Select Network
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(["MTN", "AIRTEL", "GLO", "9MOBILE"] as NetworkType[]).map((net) => {
              const cfg = NETWORKS[net];
              const isSelected = selectedNetwork === net;
              const rate = user.role === "AGENT" ? cfg.airtimeDiscountAgent : cfg.airtimeDiscountCustomer;

              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => setSelectedNetwork(net)}
                  className={`relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? `${cfg.borderColor} ${cfg.bgLight} ring-2 ring-offset-2 ring-offset-zinc-900 ${
                          net === "MTN"
                            ? "ring-amber-400"
                            : net === "AIRTEL"
                            ? "ring-red-500"
                            : net === "GLO"
                            ? "ring-emerald-500"
                            : "ring-emerald-700"
                        }`
                      : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-black text-xs shadow-sm ${cfg.color}`}
                  >
                    {net === "9MOBILE" ? "9m" : net.slice(0, 3)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{cfg.name}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold truncate">
                      {(rate * 100).toFixed(1)}% Discount
                    </p>
                  </div>
                  {isSelected && (
                    <CheckCircle className={`absolute right-2.5 top-2.5 h-4 w-4 ${cfg.textColor}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Amount */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
            2. Choose or Enter Amount (Min ₦50)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleAmountClick(amt)}
                className={`rounded-lg py-2.5 text-xs font-bold transition border ${
                  faceAmount === amt
                    ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-600"
                }`}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-sm font-bold text-zinc-400">₦</span>
            <input
              type="number"
              min="50"
              max="50000"
              step="50"
              value={customAmountStr}
              onChange={handleCustomChange}
              placeholder="e.g. 1500"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-8 pr-4 py-2.5 text-sm font-bold text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* 3. Recipient Phone Number */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
              3. Recipient Phone Number
            </label>
            <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={isPortedNumber}
                onChange={(e) => setIsPortedNumber(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Ported Number</span>
            </label>
          </div>

          <div className="relative">
            <div className="absolute left-3.5 top-3 text-zinc-400">
              <Phone className="h-4 w-4" />
            </div>
            <input
              type="tel"
              maxLength={11}
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="e.g. 08031234567 (11 digits)"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-24 py-2.5 text-sm font-mono font-medium text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
              required
            />
            <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  NETWORKS[selectedNetwork].badgeBg
                }`}
              >
                {selectedNetwork}
              </span>
            </div>
          </div>

          {phone.length > 0 && !isPhoneValid && (
            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Enter a valid 11-digit Nigerian phone number</span>
            </p>
          )}

          {/* Quick Beneficiaries */}
          {beneficiaries.length > 0 && (
            <div className="mt-2.5 flex items-center gap-2 overflow-x-auto py-1 text-xs scrollbar-none">
              <span className="text-[11px] text-zinc-500 shrink-0">Recent:</span>
              {beneficiaries.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setPhone(b.phone);
                    setSelectedNetwork(b.network);
                  }}
                  className="rounded-lg bg-zinc-800/80 px-2 py-1 text-zinc-300 hover:bg-zinc-700 hover:text-white transition shrink-0 font-mono text-[11px]"
                >
                  {b.phone} ({b.network})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Breakdown Breakdown */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2 text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Airtime Face Value:</span>
            <span>{formatNaira(faceAmount)}</span>
          </div>
          <div className="flex justify-between text-emerald-400 font-semibold">
            <span>
              {user.role} Discount ({(discountRate * 100).toFixed(1)}%):
            </span>
            <span>- {formatNaira(discountAmount)}</span>
          </div>
          <div className="border-t border-zinc-800/80 pt-2 flex justify-between font-bold text-white text-sm">
            <span>Amount to Pay:</span>
            <span className="text-emerald-400">{formatNaira(payableAmount)}</span>
          </div>
        </div>

        {/* Insufficient Balance Notice */}
        {!hasEnoughBalance && (
          <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
              <span>
                Insufficient balance. You need{" "}
                <span className="font-bold">{formatNaira(payableAmount - walletBalance)}</span> more.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsVirtualModalOpen(true)}
              className="rounded-lg bg-amber-400 px-3 py-1 font-bold text-zinc-950 hover:bg-amber-300 transition"
            >
              Fund Wallet
            </button>
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 gap-4">
          <div>
            <span className="text-xs text-zinc-400">You Pay:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{formatNaira(payableAmount)}</span>
              <span className="text-xs font-semibold text-emerald-400">
                (Save {formatNaira(discountAmount)})
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!hasEnoughBalance || !isPhoneValid || faceAmount < 50}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span>Proceed to Recharge</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-1">Confirm Airtime Top-up</h4>
            <p className="text-xs text-zinc-400 mb-4">
              Please verify the airtime details before confirming.
            </p>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Network:</span>
                <span className="font-bold text-emerald-400">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Airtime Value:</span>
                <span className="font-semibold text-white">{formatNaira(faceAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Recipient Phone:</span>
                <span className="font-mono font-bold text-white">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Discount Applied:</span>
                <span className="font-semibold text-emerald-400">- {formatNaira(discountAmount)}</span>
              </div>
              <div className="border-t border-zinc-800 pt-2 flex justify-between text-sm font-bold">
                <span className="text-zinc-300">Wallet Deduction:</span>
                <span className="text-emerald-400">{formatNaira(payableAmount)}</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Transaction PIN (Default: 1234)
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center tracking-[0.5em] font-mono rounded-xl border border-zinc-700 bg-zinc-950 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setConfirmModalOpen(false)}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmPurchase}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition"
              >
                {isSubmitting ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                    <span>Recharging...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5" />
                    <span>Authorize Airtime</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
