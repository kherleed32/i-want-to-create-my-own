"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { TransactionType } from "@/types";
import { formatNaira, formatDateTime } from "@/lib/utils";
import {
  Search,
  Wifi,
  PhoneCall,
  Building2,
  CreditCard,
  FileText,
  Clock,
} from "lucide-react";

export default function TransactionHistory() {
  const { transactions, setSelectedReceipt } = useApp();
  const [filterType, setFilterType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = transactions.filter((tx) => {
    // Type filter
    if (filterType === "DATA" && tx.type !== "DATA") return false;
    if (filterType === "AIRTIME" && tx.type !== "AIRTIME") return false;
    if (filterType === "FUNDING" && !tx.type.startsWith("WALLET_FUND")) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRef = tx.reference.toLowerCase().includes(q);
      const matchPhone = tx.recipientPhone ? tx.recipientPhone.includes(q) : false;
      const matchTitle = tx.title.toLowerCase().includes(q);
      return matchRef || matchPhone || matchTitle;
    }

    return true;
  });

  const getIcon = (type: TransactionType) => {
    switch (type) {
      case "DATA":
        return <Wifi className="h-4 w-4 text-emerald-400" />;
      case "AIRTIME":
        return <PhoneCall className="h-4 w-4 text-blue-400" />;
      case "WALLET_FUND_VIRTUAL":
        return <Building2 className="h-4 w-4 text-purple-400" />;
      case "WALLET_FUND_ONLINE":
        return <CreditCard className="h-4 w-4 text-amber-400" />;
      default:
        return <FileText className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-7 shadow-xl">
      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Transaction Statement</h3>
          <p className="text-xs text-zinc-400">
            Real-time ledger of your wallet fundings and top-up orders
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "DATA", "AIRTIME", "FUNDING"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                filterType === f
                  ? "bg-emerald-500 text-zinc-950 font-bold"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="mt-4 relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by reference, recipient phone, or service..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
        />
      </div>

      {/* Transaction List */}
      <div className="mt-4 divide-y divide-zinc-800/80">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-zinc-500">
            <Clock className="mx-auto h-8 w-8 opacity-40 mb-2" />
            <p className="text-sm font-medium">No transactions found</p>
            <p className="text-xs text-zinc-600 mt-1">
              Top up data, airtime or fund your wallet to see records here.
            </p>
          </div>
        ) : (
          filtered.map((tx) => {
            const isCredit = tx.type.startsWith("WALLET_FUND");

            return (
              <div
                key={tx.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-3.5 px-2 hover:bg-zinc-800/30 rounded-xl transition gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                      isCredit
                        ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400"
                        : "bg-zinc-800 border-zinc-700 text-zinc-300"
                    }`}
                  >
                    {getIcon(tx.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                        {tx.title}
                      </p>
                      <span className="rounded bg-zinc-800 px-1.5 py-0.2 text-[9px] font-mono text-zinc-400">
                        {tx.reference}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      <span>{formatDateTime(tx.createdAt)}</span>
                      {tx.recipientPhone && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-zinc-300">{tx.recipientPhone}</span>
                        </>
                      )}
                      {tx.network && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-emerald-400">{tx.network}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 ml-13 sm:ml-0">
                  <div className="text-right">
                    <p
                      className={`text-sm font-black ${
                        isCredit ? "text-emerald-400" : "text-white"
                      }`}
                    >
                      {isCredit ? "+" : "-"}
                      {formatNaira(tx.amount)}
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                      {tx.status}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedReceipt(tx)}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 hover:text-white transition flex items-center gap-1 shrink-0"
                  >
                    <FileText className="h-3 w-3" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
