"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { DATA_PLANS } from "@/data/plans";
import { formatNaira } from "@/lib/utils";
import {
  Sparkles,
  Calculator,
} from "lucide-react";

export default function AgentHub() {
  const { user, toggleRole } = useApp();

  const [calcGb, setCalcGb] = useState<number>(30); // 30 GB daily sale simulation
  const [calcRetailPrice, setCalcRetailPrice] = useState<number>(350); // sells at 350 per GB

  const wholesaleCost = 260; // MTN SME 1GB agent price
  const profitPerGb = calcRetailPrice - wholesaleCost;
  const dailyProfit = profitPerGb * calcGb;
  const monthlyProfit = dailyProfit * 30;

  return (
    <div className="space-y-6">
      {/* Hero Agent Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
                ⭐ RESELLER & AGENT PORTAL
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Start Your Own Telecom Data Business with{" "}
              <span className="text-amber-400">KHERLEED DATA</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Buy at wholesale agent rates and resell to your clients, family, students, and
              businesses at your own retail prices. Enjoy instant wallet funding and automated top-ups.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-zinc-900/90 p-5 shrink-0 flex flex-col items-center justify-center text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Your Status</p>
            <p className="text-xl font-black text-amber-400 mt-1">{user.role} MODE</p>
            <p className="text-[11px] text-zinc-400 mt-1 mb-3">
              {user.role === "AGENT"
                ? "You currently have access to wholesale pricing."
                : "Switch to Agent to immediately unlock discounted rates."}
            </p>
            <button
              onClick={toggleRole}
              className={`w-full rounded-xl py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                user.role === "AGENT"
                  ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  : "bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md shadow-amber-500/20"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {user.role === "AGENT" ? "Switch to Customer Mode" : "Upgrade to Agent Now (Free)"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Reseller Profit Margin Calculator */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-7 shadow-xl">
        <div className="flex items-center gap-3 mb-5 border-b border-zinc-800 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Agent Profit Estimator</h4>
            <p className="text-xs text-zinc-400">
              Calculate how much you can earn every month by reselling data bundles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-zinc-300 mb-1">
                <span>Data Sold Per Day:</span>
                <span className="font-bold text-amber-400">{calcGb} GB / day</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={calcGb}
                onChange={(e) => setCalcGb(parseInt(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-300 mb-1">
                <span>Your Selling Price per GB:</span>
                <span className="font-bold text-emerald-400">{formatNaira(calcRetailPrice)}</span>
              </div>
              <input
                type="range"
                min="270"
                max="500"
                step="5"
                value={calcRetailPrice}
                onChange={(e) => setCalcRetailPrice(parseInt(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>

            <div className="text-xs text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
              <div className="flex justify-between">
                <span>Wholesale Agent Cost (MTN 1GB):</span>
                <span className="font-mono text-zinc-300">{formatNaira(wholesaleCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Profit per 1GB sold:</span>
                <span className="font-mono text-emerald-400 font-bold">+{formatNaira(profitPerGb)}</span>
              </div>
            </div>
          </div>

          {/* Result card */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center flex flex-col justify-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
              Estimated Monthly Profit
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 mt-2">
              {formatNaira(monthlyProfit)}
            </span>
            <p className="text-xs text-zinc-400 mt-2">
              Based on selling <span className="font-bold text-white">{calcGb} GB</span> daily at{" "}
              <span className="font-bold text-white">{formatNaira(calcRetailPrice)}/GB</span>.
            </p>
            <div className="mt-4 pt-3 border-t border-emerald-900/40 text-[11px] text-zinc-400">
              Daily Earnings: <span className="font-bold text-emerald-400">{formatNaira(dailyProfit)}/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side by Side Pricing Table: Customer Retail vs Agent Wholesale */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-7 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between mb-5 border-b border-zinc-800 pb-4">
          <div>
            <h4 className="text-base font-bold text-white">Price Comparison Table</h4>
            <p className="text-xs text-zinc-400">
              Customer Retail vs Reseller Agent Wholesale rates
            </p>
          </div>
          <span className="rounded bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 font-mono">
            MTN SME & CG Focus
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Network & Plan</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Customer Rate</th>
                <th className="py-3 px-3">Agent Rate (Wholesale)</th>
                <th className="py-3 px-3 text-right">Agent Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-medium">
              {DATA_PLANS.filter((p) => p.network === "MTN" || p.network === "AIRTEL")
                .slice(0, 10)
                .map((plan) => {
                  const margin = plan.customerPrice - plan.agentPrice;
                  return (
                    <tr key={plan.id} className="hover:bg-zinc-800/40 transition">
                      <td className="py-3 px-3">
                        <span className="font-bold text-white">{plan.network}</span>{" "}
                        <span className="text-zinc-300">{plan.name}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">
                          {plan.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-zinc-300">
                        {formatNaira(plan.customerPrice)}
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-400">
                        {formatNaira(plan.agentPrice)}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-amber-400">
                        +{formatNaira(margin)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
