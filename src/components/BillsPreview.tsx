"use client";

import React from "react";
import { Tv, Lightbulb, Clock, CheckCircle2, BellRing } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function BillsPreview() {
  const { showToast } = useApp();

  const billsRoadmap = [
    {
      id: "dstv",
      name: "DSTV Subscription",
      category: "Cable TV",
      description: "Padi, Yanga, Confam, Compact, Compact Plus & Premium renewals.",
      icon: Tv,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "gotv",
      name: "GOTV Subscription",
      category: "Cable TV",
      description: "Jolli, Jinja, Max, and Supa bouquets with instant IUC activation.",
      icon: Tv,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "electricity",
      name: "Electricity Disco Bills",
      category: "Utility",
      description: "Prepaid token generation and Postpaid bills for IKEDC, EKEDC, IBEDC, AEDC, etc.",
      icon: Lightbulb,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 border border-zinc-700">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Bill Payment Services</h3>
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/30">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Per your setup: Bills are slated for future release while Data & Airtime are active now.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {billsRoadmap.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 opacity-80 transition hover:opacity-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-1">{item.name}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{item.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
                <span className="text-[11px] font-medium text-amber-400/90 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Scheduled Next</span>
                </span>

                <button
                  onClick={() =>
                    showToast(
                      `You will be notified as soon as ${item.name} launches on KHERLEED DATA!`,
                      "info"
                    )
                  }
                  className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 hover:text-white transition"
                >
                  <BellRing className="h-3 w-3" />
                  <span>Notify Me</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-400 flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-zinc-200">Focused on Core Telecom Services</p>
          <p className="text-zinc-400 mt-0.5">
            Your current deployment is fully optimized for lightning-fast MTN, Airtel, Glo, and
            9mobile Data & Airtime VTU vending with dedicated virtual account wallet funding.
          </p>
        </div>
      </div>
    </div>
  );
}
