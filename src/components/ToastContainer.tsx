"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start justify-between gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-200 ${
            t.type === "success"
              ? "border-emerald-500/40 bg-zinc-900/95 text-emerald-300"
              : t.type === "error"
              ? "border-red-500/40 bg-zinc-900/95 text-red-300"
              : "border-blue-500/40 bg-zinc-900/95 text-blue-300"
          }`}
        >
          <div className="flex items-start gap-2.5">
            {t.type === "success" && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
            )}
            {t.type === "error" && (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
            )}
            {t.type === "info" && (
              <Info className="h-5 w-5 shrink-0 text-blue-400 mt-0.5" />
            )}
            <p className="text-xs font-medium text-white leading-relaxed">{t.message}</p>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-zinc-500 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
