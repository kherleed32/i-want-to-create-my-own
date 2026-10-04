"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { NetworkType, DataCategory } from "@/types";
import { NETWORKS, DATA_PLANS } from "@/data/plans";
import {
  detectNetwork,
  isValidNigerianPhone,
  formatNaira,
} from "@/lib/utils";
import {
  Wifi,
  Phone,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function BuyDataForm() {
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
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>("SME");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isPortedNumber, setIsPortedNumber] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("1234");

  // Determine actual available plans
  const netConfig = NETWORKS[selectedNetwork];
  const effectiveCategory: DataCategory =
    selectedCategory === "SME" && !netConfig.supportsSME
      ? "CORPORATE"
      : selectedCategory;

  const availablePlans = DATA_PLANS.filter(
    (p) => p.network === selectedNetwork && p.category === effectiveCategory
  );

  const selectedPlan =
    availablePlans.find((p) => p.id === selectedPlanId) || availablePlans[0];

  const handleNetworkSelect = (net: NetworkType) => {
    setSelectedNetwork(net);
    const newNetCfg = NETWORKS[net];
    if (selectedCategory === "SME" && !newNetCfg.supportsSME) {
      setSelectedCategory("CORPORATE");
    }
  };

  // Handle phone change & auto-detect network
  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (!isPortedNumber && val.length >= 4) {
      const detected = detectNetwork(val);
      if (detected && detected !== selectedNetwork) {
        handleNetworkSelect(detected);
      }
    }
  };

  const currentPrice = selectedPlan
    ? user.role === "AGENT"
      ? selectedPlan.agentPrice
      : selectedPlan.customerPrice
    : 0;

  const savings = selectedPlan
    ? selectedPlan.customerPrice - selectedPlan.agentPrice
    : 0;

  const hasEnoughBalance = walletBalance >= currentPrice;
  const isPhoneValid = isValidNigerianPhone(phone);

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !isPhoneValid || !hasEnoughBalance) return;
    setConfirmModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPlan) return;
    setIsSubmitting(true);

    const result = await executePurchase({
      type: "DATA",
      amount: currentPrice,
      network: selectedNetwork,
      recipientPhone: phone,
      planName: `${selectedPlan.name} (${selectedPlan.validity})`,
      discountOrProfit: user.role === "AGENT" ? savings : 0,
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
            <Wifi className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Purchase Data Bundle</h3>
            <p className="text-xs text-zinc-400">
              Instant activation on MTN, Airtel, Glo & 9mobile
            </p>
          </div>
        </div>

        {/* Pricing notice */}
        <div className="flex items-center gap-2">
          {user.role === "AGENT" ? (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3 w-3" />
              <span>Wholesale Agent Rates Active</span>
            </span>
          ) : (
            <button
              onClick={toggleRole}
              className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
            >
              <span>Switch to Agent rates (save ₦20-₦200/GB)</span>
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
              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => handleNetworkSelect(net)}
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
                    <p className="text-[10px] text-zinc-400 truncate">
                      {net === "MTN" || net === "9MOBILE" ? "SME & CG" : "Corporate"}
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

        {/* 2. Select Data Category */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
            2. Select Data Type
          </label>
          <div className="flex flex-wrap gap-2">
            {NETWORKS[selectedNetwork].supportsSME && (
              <button
                type="button"
                onClick={() => setSelectedCategory("SME")}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition border ${
                  effectiveCategory === "SME"
                    ? "bg-zinc-800 text-emerald-400 border-emerald-500/50"
                    : "bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                SME Data (Best Price)
              </button>
            )}

            {NETWORKS[selectedNetwork].supportsCorporate && (
              <button
                type="button"
                onClick={() => setSelectedCategory("CORPORATE")}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition border ${
                  effectiveCategory === "CORPORATE"
                    ? "bg-zinc-800 text-emerald-400 border-emerald-500/50"
                    : "bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                Corporate Gifting (CG)
              </button>
            )}

            {NETWORKS[selectedNetwork].supportsGifting && (
              <button
                type="button"
                onClick={() => setSelectedCategory("GIFTING")}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition border ${
                  effectiveCategory === "GIFTING"
                    ? "bg-zinc-800 text-emerald-400 border-emerald-500/50"
                    : "bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                Direct Gifting
              </button>
            )}
          </div>
        </div>

        {/* 3. Select Data Plan */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
              3. Choose Data Plan
            </label>
            <span className="text-[11px] text-zinc-400">
              {availablePlans.length} plans available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {availablePlans.map((plan) => {
              const isSelected = selectedPlan ? selectedPlan.id === plan.id : false;
              const price = user.role === "AGENT" ? plan.agentPrice : plan.customerPrice;
              const planSaving = plan.customerPrice - plan.agentPrice;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-950/20 shadow-md ring-1 ring-emerald-500"
                      : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-sm font-extrabold text-white">{plan.size}</span>
                      <p className="text-[11px] text-zinc-400">{plan.validity}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-400">
                        {formatNaira(price)}
                      </span>
                      {user.role === "AGENT" && planSaving > 0 && (
                        <p className="text-[10px] text-amber-400 font-semibold">
                          Save {formatNaira(planSaving)}
                        </p>
                      )}
                      {user.role === "CUSTOMER" && (
                        <p className="text-[10px] text-zinc-500">
                          Agent: {formatNaira(plan.agentPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                  {plan.popular && (
                    <span className="mt-2 inline-block rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                      Popular
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Recipient Phone Number */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
              4. Recipient Phone Number
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
              <span>Enter a valid 11-digit Nigerian phone number (starts with 080, 081, 070, 090, etc.)</span>
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
                    handleNetworkSelect(b.network);
                  }}
                  className="rounded-lg bg-zinc-800/80 px-2 py-1 text-zinc-300 hover:bg-zinc-700 hover:text-white transition shrink-0 font-mono text-[11px]"
                >
                  {b.phone} ({b.network})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Insufficient Balance Notice */}
        {!hasEnoughBalance && (
          <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
              <span>
                Insufficient balance. You need{" "}
                <span className="font-bold">{formatNaira(currentPrice - walletBalance)}</span> more.
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

        {/* Checkout Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 gap-4">
          <div>
            <span className="text-xs text-zinc-400">Total Price:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{formatNaira(currentPrice)}</span>
              {user.role === "AGENT" && savings > 0 && (
                <span className="text-xs font-semibold text-amber-400">
                  (Wholesale Agent Price)
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!hasEnoughBalance || !isPhoneValid || !selectedPlan}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span>Proceed to Buy</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {confirmModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-1">Confirm Data Purchase</h4>
            <p className="text-xs text-zinc-400 mb-4">
              Please verify the top-up details before confirming.
            </p>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Service:</span>
                <span className="font-semibold text-white">Data Top-up</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Network:</span>
                <span className="font-bold text-emerald-400">{selectedNetwork}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Data Plan:</span>
                <span className="font-semibold text-white">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Recipient:</span>
                <span className="font-mono font-bold text-white">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Account Type:</span>
                <span className="font-semibold text-amber-300">{user.role}</span>
              </div>
              <div className="border-t border-zinc-800 pt-2 flex justify-between text-sm font-bold">
                <span className="text-zinc-300">Amount to Deduct:</span>
                <span className="text-emerald-400">{formatNaira(currentPrice)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-zinc-500">
                <span>Remaining Balance:</span>
                <span>{formatNaira(walletBalance - currentPrice)}</span>
              </div>
            </div>

            {/* PIN input */}
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5" />
                    <span>Authorize Purchase</span>
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
