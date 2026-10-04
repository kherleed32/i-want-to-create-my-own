import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NetworkType } from "@/types";
import { NETWORKS } from "@/data/plans";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace("NGN", "₦");
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-NG").format(amount);
}

/**
 * Option B Funding Fee Calculation:
 * A nominal processing charge on automated bank deposits / online gateways.
 * E.g., 1.2% (min ₦20, capped at ₦60) or flat nominal fee.
 */
export const OPTION_B_FEE_PERCENT = 0.012; // 1.2%
export const OPTION_B_MIN_FEE = 20; // ₦20 minimum
export const OPTION_B_MAX_FEE = 65; // ₦65 maximum cap

export function calculateOptionBFee(amount: number): number {
  if (amount <= 0) return 0;
  const rawFee = Math.round(amount * OPTION_B_FEE_PERCENT);
  return Math.min(Math.max(rawFee, OPTION_B_MIN_FEE), OPTION_B_MAX_FEE);
}

/**
 * Detects the Nigerian network based on the first 4 or 5 digits of the phone number.
 */
export function detectNetwork(phone: string): NetworkType | null {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  if (cleanPhone.length < 4) return null;

  // Normalize: if it starts with 234, convert 23480... to 080...
  let normalized = cleanPhone;
  if (cleanPhone.startsWith("234") && cleanPhone.length >= 6) {
    normalized = "0" + cleanPhone.slice(3);
  }

  const prefix = normalized.slice(0, 4);

  for (const [netKey, netConfig] of Object.entries(NETWORKS)) {
    if (netConfig.prefixes.includes(prefix)) {
      return netKey as NetworkType;
    }
  }

  return null;
}

/**
 * Validates a Nigerian phone number.
 * Accepts: 0803XXXXXXX (11 digits), 234803XXXXXXX (13 digits), +234...
 */
export function isValidNigerianPhone(phone: string): boolean {
  const clean = phone.replace(/[^0-9]/g, "");
  if (clean.length === 11 && clean.startsWith("0")) {
    return true;
  }
  if (clean.length === 13 && clean.startsWith("234")) {
    return true;
  }
  return false;
}

export function createId(prefix: string = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function generateReference(prefix: string = "KHL"): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${timestamp}-${randomStr}`;
}

export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return isoString;
  }
}
