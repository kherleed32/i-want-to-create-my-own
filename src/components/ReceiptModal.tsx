"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatNaira, formatDateTime } from "@/lib/utils";
import {
  X,
  Printer,
  Copy,
  Check,
  CheckCircle2,
  Share2,
} from "lucide-react";

export default function ReceiptModal() {
  const { selectedReceipt, setSelectedReceipt, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!selectedReceipt) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(selectedReceipt.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `KHERLEED DATA RECEIPT\nReference: ${selectedReceipt.reference}\nService: ${selectedReceipt.title}\nAmount: ${formatNaira(selectedReceipt.amount)}\nRecipient: ${selectedReceipt.recipientPhone || "Wallet"}\nStatus: SUCCESS\nDate: ${formatDateTime(selectedReceipt.createdAt)}`;
    if (navigator.share) {
      navigator.share({
        title: "Kherleed Data Receipt",
        text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast("Receipt details copied to clipboard!", "success");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 print:bg-white print:p-0">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Close Button (Hidden on Print) */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Transaction Receipt
          </span>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div className="pt-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 print:border-emerald-600">
            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
          </div>

          <h3 className="mt-3 text-lg font-black tracking-tight text-white print:text-black">
            KHERLEED <span className="text-emerald-400">DATA</span>
          </h3>
          <p className="text-xs text-zinc-400 print:text-zinc-600">
            VTU & Telecom Top-up Services
          </p>

          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left space-y-2.5 text-xs print:bg-zinc-50 print:border-zinc-300 print:text-black">
            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-zinc-600">Reference:</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-white print:text-black">
                  {selectedReceipt.reference}
                </span>
                <button
                  onClick={handleCopyRef}
                  className="print:hidden text-zinc-400 hover:text-white transition"
                  title="Copy reference"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-zinc-600">Date & Time:</span>
              <span className="font-medium text-zinc-200 print:text-black">
                {formatDateTime(selectedReceipt.createdAt)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-zinc-600">Service:</span>
              <span className="font-semibold text-white print:text-black">
                {selectedReceipt.title}
              </span>
            </div>

            {selectedReceipt.network && (
              <div className="flex justify-between">
                <span className="text-zinc-400 print:text-zinc-600">Network:</span>
                <span className="font-bold text-emerald-400 print:text-emerald-700">
                  {selectedReceipt.network}
                </span>
              </div>
            )}

            {selectedReceipt.recipientPhone && (
              <div className="flex justify-between">
                <span className="text-zinc-400 print:text-zinc-600">Recipient Phone:</span>
                <span className="font-mono font-bold text-white print:text-black">
                  {selectedReceipt.recipientPhone}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-zinc-600">Payment Channel:</span>
              <span className="text-zinc-200 print:text-black">
                {selectedReceipt.paymentMethod || "WALLET"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400 print:text-zinc-600">Status:</span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400 print:text-emerald-700 uppercase">
                {selectedReceipt.status}
              </span>
            </div>

            <div className="border-t border-zinc-800 pt-2.5 flex justify-between text-sm font-black print:border-zinc-300">
              <span className="text-zinc-300 print:text-zinc-800">Amount:</span>
              <span className="text-emerald-400 print:text-emerald-700">
                {formatNaira(selectedReceipt.amount)}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-zinc-500 print:text-zinc-600">
              <span>New Wallet Balance:</span>
              <span>{formatNaira(selectedReceipt.balanceAfter)}</span>
            </div>
          </div>

          <p className="mt-4 text-[10px] text-zinc-500 print:text-zinc-500">
            Thank you for choosing Kherleed Data • Fast, Secure & Automated VTU
          </p>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="mt-6 flex items-center gap-2 print:hidden">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
