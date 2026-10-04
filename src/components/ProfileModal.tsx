"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatNaira } from "@/lib/utils";
import {
  X,
  User,
  Phone,
  Mail,
  Lock,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function ProfileModal() {
  const {
    user,
    updateUserProfile,
    walletBalance,
    resetWallet,
    loadDemoBalance,
    isProfileModalOpen,
    setIsProfileModalOpen,
    toggleRole,
  } = useApp();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [pin, setPin] = useState(user.pin || "1234");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isProfileModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      email,
      pin,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsProfileModalOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Customer Account & Settings</h3>
                <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-zinc-400">Personalized VTU Wallet Account</p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current Balance & Account Status */}
        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Personal Wallet Balance
            </span>
            <p className="text-2xl font-black text-white mt-0.5">
              {formatNaira(walletBalance)}
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              Every customer maintains their own distinct wallet balance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleRole}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition ${
                user.role === "AGENT"
                  ? "border-amber-400/40 bg-amber-500/10 text-amber-300"
                  : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {user.role === "AGENT" ? "Agent Wholesale Active" : "Switch to Agent Mode"}
            </button>
          </div>
        </div>

        {/* Form to customize account name and details */}
        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Full Name (Used for Dedicated Virtual Accounts)
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Khaleed S."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <p className="mt-1 text-[11px] text-zinc-500 flex items-center gap-1">
              <Building2 className="h-3 w-3 text-emerald-400" />
              <span>Virtual accounts will show: </span>
              <span className="font-semibold text-zinc-300">KHERLEED - {name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08123456789"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@kherleeddata.com"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Security Transaction PIN (4 digits)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="1234"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs font-mono font-medium text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
            <p className="mt-1 text-[11px] text-zinc-500">
              Required when authorizing data and airtime purchases.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-2.5 text-xs font-bold text-zinc-950 shadow-md shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Changes Saved!</span>
                </>
              ) : (
                <span>Save Profile Details</span>
              )}
            </button>
          </div>
        </form>

        {/* Demo / Testing Controls Box */}
        <div className="mt-6 border-t border-zinc-800 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Tester & Demo Controls</span>
            </span>
            <span className="text-[10px] rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-400">
              Dev / Preview
            </span>
          </div>
          <p className="text-xs text-zinc-500 mb-3">
            Real customers start with ₦0.00. You can simulate test funds or reset to ₦0.00 at any time:
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => loadDemoBalance(5000)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 py-2 px-3 text-xs font-semibold text-emerald-300 hover:bg-emerald-950/40 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Load ₦5,000 Demo</span>
            </button>

            <button
              type="button"
              onClick={resetWallet}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 py-2 px-3 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to ₦0.00</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
