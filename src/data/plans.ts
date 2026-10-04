import { DataPlan, NetworkType } from "@/types";

export interface NetworkConfig {
  id: NetworkType;
  name: string;
  color: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  accentHex: string;
  prefixes: string[];
  airtimeDiscountCustomer: number; // e.g. 0.02 = 2% discount
  airtimeDiscountAgent: number;    // e.g. 0.035 = 3.5% discount
  supportsSME: boolean;
  supportsCorporate: boolean;
  supportsGifting: boolean;
}

export const NETWORKS: Record<NetworkType, NetworkConfig> = {
  MTN: {
    id: "MTN",
    name: "MTN Nigeria",
    color: "bg-amber-400 text-black",
    bgLight: "bg-amber-500/10",
    borderColor: "border-amber-400",
    textColor: "text-amber-500",
    badgeBg: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    accentHex: "#FACC15",
    prefixes: ["0803", "0806", "0703", "0706", "0813", "0816", "0810", "0814", "0903", "0906", "0913", "0916"],
    airtimeDiscountCustomer: 0.02,
    airtimeDiscountAgent: 0.035,
    supportsSME: true,
    supportsCorporate: true,
    supportsGifting: true,
  },
  AIRTEL: {
    id: "AIRTEL",
    name: "Airtel Nigeria",
    color: "bg-red-600 text-white",
    bgLight: "bg-red-500/10",
    borderColor: "border-red-500",
    textColor: "text-red-500",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/30",
    accentHex: "#EF4444",
    prefixes: ["0802", "0808", "0708", "0812", "0701", "0902", "0901", "0904", "0907", "0912"],
    airtimeDiscountCustomer: 0.02,
    airtimeDiscountAgent: 0.035,
    supportsSME: false,
    supportsCorporate: true,
    supportsGifting: true,
  },
  GLO: {
    id: "GLO",
    name: "Glo Nigeria",
    color: "bg-emerald-600 text-white",
    bgLight: "bg-emerald-500/10",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    accentHex: "#10B981",
    prefixes: ["0805", "0807", "0705", "0815", "0811", "0905", "0915"],
    airtimeDiscountCustomer: 0.025,
    airtimeDiscountAgent: 0.04,
    supportsSME: false,
    supportsCorporate: true,
    supportsGifting: true,
  },
  "9MOBILE": {
    id: "9MOBILE",
    name: "9mobile",
    color: "bg-emerald-800 text-emerald-100",
    bgLight: "bg-emerald-900/10",
    borderColor: "border-emerald-700",
    textColor: "text-emerald-400",
    badgeBg: "bg-emerald-800/20 text-emerald-300 border-emerald-700/30",
    accentHex: "#047857",
    prefixes: ["0809", "0818", "0817", "0909", "0908"],
    airtimeDiscountCustomer: 0.025,
    airtimeDiscountAgent: 0.04,
    supportsSME: true,
    supportsCorporate: true,
    supportsGifting: true,
  },
};

export const DATA_PLANS: DataPlan[] = [
  // MTN SME DATA
  { id: "mtn-sme-500mb", network: "MTN", category: "SME", name: "500 MB SME", size: "500MB", validity: "30 Days", customerPrice: 145, agentPrice: 135 },
  { id: "mtn-sme-1gb", network: "MTN", category: "SME", name: "1.0 GB SME", size: "1GB", validity: "30 Days", customerPrice: 280, agentPrice: 260, popular: true },
  { id: "mtn-sme-2gb", network: "MTN", category: "SME", name: "2.0 GB SME", size: "2GB", validity: "30 Days", customerPrice: 560, agentPrice: 520, popular: true },
  { id: "mtn-sme-3gb", network: "MTN", category: "SME", name: "3.0 GB SME", size: "3GB", validity: "30 Days", customerPrice: 840, agentPrice: 780 },
  { id: "mtn-sme-5gb", network: "MTN", category: "SME", name: "5.0 GB SME", size: "5GB", validity: "30 Days", customerPrice: 1400, agentPrice: 1300, popular: true },
  { id: "mtn-sme-10gb", network: "MTN", category: "SME", name: "10.0 GB SME", size: "10GB", validity: "30 Days", customerPrice: 2800, agentPrice: 2600 },

  // MTN CORPORATE GIFTING
  { id: "mtn-cg-1gb", network: "MTN", category: "CORPORATE", name: "1.0 GB Corporate Gifting", size: "1GB", validity: "30 Days", customerPrice: 295, agentPrice: 275 },
  { id: "mtn-cg-2gb", network: "MTN", category: "CORPORATE", name: "2.0 GB Corporate Gifting", size: "2GB", validity: "30 Days", customerPrice: 590, agentPrice: 550 },
  { id: "mtn-cg-5gb", network: "MTN", category: "CORPORATE", name: "5.0 GB Corporate Gifting", size: "5GB", validity: "30 Days", customerPrice: 1475, agentPrice: 1375 },
  { id: "mtn-cg-10gb", network: "MTN", category: "CORPORATE", name: "10.0 GB Corporate Gifting", size: "10GB", validity: "30 Days", customerPrice: 2950, agentPrice: 2750 },
  { id: "mtn-cg-20gb", network: "MTN", category: "CORPORATE", name: "20.0 GB Corporate Gifting", size: "20GB", validity: "30 Days", customerPrice: 5900, agentPrice: 5500 },

  // MTN GIFTING
  { id: "mtn-gift-1.5gb", network: "MTN", category: "GIFTING", name: "1.5 GB Direct Gift", size: "1.5GB", validity: "30 Days", customerPrice: 1100, agentPrice: 1050 },
  { id: "mtn-gift-4.5gb", network: "MTN", category: "GIFTING", name: "4.5 GB Direct Gift", size: "4.5GB", validity: "30 Days", customerPrice: 2150, agentPrice: 2050 },

  // AIRTEL CORPORATE GIFTING
  { id: "airtel-cg-500mb", network: "AIRTEL", category: "CORPORATE", name: "500 MB Corporate", size: "500MB", validity: "30 Days", customerPrice: 155, agentPrice: 145 },
  { id: "airtel-cg-1gb", network: "AIRTEL", category: "CORPORATE", name: "1.0 GB Corporate", size: "1GB", validity: "30 Days", customerPrice: 290, agentPrice: 270, popular: true },
  { id: "airtel-cg-2gb", network: "AIRTEL", category: "CORPORATE", name: "2.0 GB Corporate", size: "2GB", validity: "30 Days", customerPrice: 580, agentPrice: 540 },
  { id: "airtel-cg-5gb", network: "AIRTEL", category: "CORPORATE", name: "5.0 GB Corporate", size: "5GB", validity: "30 Days", customerPrice: 1450, agentPrice: 1350, popular: true },
  { id: "airtel-cg-10gb", network: "AIRTEL", category: "CORPORATE", name: "10.0 GB Corporate", size: "10GB", validity: "30 Days", customerPrice: 2900, agentPrice: 2700 },
  { id: "airtel-cg-20gb", network: "AIRTEL", category: "CORPORATE", name: "20.0 GB Corporate", size: "20GB", validity: "30 Days", customerPrice: 5800, agentPrice: 5400 },

  // AIRTEL GIFTING
  { id: "airtel-gift-1.5gb", network: "AIRTEL", category: "GIFTING", name: "1.5 GB Direct Gift", size: "1.5GB", validity: "30 Days", customerPrice: 1150, agentPrice: 1100 },
  { id: "airtel-gift-3gb", network: "AIRTEL", category: "GIFTING", name: "3.0 GB Direct Gift", size: "3GB", validity: "30 Days", customerPrice: 1650, agentPrice: 1580 },

  // GLO CORPORATE GIFTING
  { id: "glo-cg-500mb", network: "GLO", category: "CORPORATE", name: "500 MB Corporate", size: "500MB", validity: "30 Days", customerPrice: 140, agentPrice: 130 },
  { id: "glo-cg-1gb", network: "GLO", category: "CORPORATE", name: "1.0 GB Corporate", size: "1GB", validity: "30 Days", customerPrice: 270, agentPrice: 250, popular: true },
  { id: "glo-cg-2gb", network: "GLO", category: "CORPORATE", name: "2.0 GB Corporate", size: "2GB", validity: "30 Days", customerPrice: 540, agentPrice: 500 },
  { id: "glo-cg-3gb", network: "GLO", category: "CORPORATE", name: "3.0 GB Corporate", size: "3GB", validity: "30 Days", customerPrice: 810, agentPrice: 750 },
  { id: "glo-cg-5gb", network: "GLO", category: "CORPORATE", name: "5.0 GB Corporate", size: "5GB", validity: "30 Days", customerPrice: 1350, agentPrice: 1250, popular: true },
  { id: "glo-cg-10gb", network: "GLO", category: "CORPORATE", name: "10.0 GB Corporate", size: "10GB", validity: "30 Days", customerPrice: 2700, agentPrice: 2500 },

  // GLO GIFTING
  { id: "glo-gift-1.35gb", network: "GLO", category: "GIFTING", name: "1.35 GB Direct Gift", size: "1.35GB", validity: "30 Days", customerPrice: 500, agentPrice: 475 },
  { id: "glo-gift-2.9gb", network: "GLO", category: "GIFTING", name: "2.9 GB Direct Gift", size: "2.9GB", validity: "30 Days", customerPrice: 1000, agentPrice: 950 },

  // 9MOBILE SME & CORPORATE
  { id: "9mobile-sme-1gb", network: "9MOBILE", category: "SME", name: "1.0 GB SME", size: "1GB", validity: "30 Days", customerPrice: 250, agentPrice: 230, popular: true },
  { id: "9mobile-sme-2gb", network: "9MOBILE", category: "SME", name: "2.0 GB SME", size: "2GB", validity: "30 Days", customerPrice: 500, agentPrice: 460 },
  { id: "9mobile-sme-5gb", network: "9MOBILE", category: "SME", name: "5.0 GB SME", size: "5GB", validity: "30 Days", customerPrice: 1250, agentPrice: 1150 },
  { id: "9mobile-cg-1.5gb", network: "9MOBILE", category: "CORPORATE", name: "1.5 GB Corporate", size: "1.5GB", validity: "30 Days", customerPrice: 380, agentPrice: 350 },
  { id: "9mobile-cg-3gb", network: "9MOBILE", category: "CORPORATE", name: "3.0 GB Corporate", size: "3GB", validity: "30 Days", customerPrice: 760, agentPrice: 700 },
  { id: "9mobile-cg-10gb", network: "9MOBILE", category: "CORPORATE", name: "10.0 GB Corporate", size: "10GB", validity: "30 Days", customerPrice: 2500, agentPrice: 2300 },
];
