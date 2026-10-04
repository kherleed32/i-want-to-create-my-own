# KHERLEED DATA ⚡

A modern, automated Virtual Top-Up (VTU) and Telecom Data/Airtime vending platform built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS**.

---

## 🏛️ System Architecture

```text
                       KHERLEED DATA
                             │
                  ┌──────────┴──────────┐
                  │                     │
               CUSTOMER               AGENT
                  │                     │
                  └──────────┬──────────┘
                             │
                        WALLET SYSTEM
                             │
                  ┌──────────┴──────────┐
                  │                     │
           VIRTUAL ACCOUNT          ONLINE PAYMENT
                  │                     │
                  └──────────┬──────────┘
                             │
                        WALLET BALANCE
                             │
            ┌────────────────┼────────────────┐
            │                │                │
           DATA            AIRTIME         BILLS
            │                │                │
           MTN             MTN              DSTV (Future)
          Airtel           Airtel            GOTV (Future)
           Glo              Glo            Electricity (Future)
         9mobile          9mobile
```

---

## 🚀 Key Features

### 1. Dual User Roles (Customer vs Agent)
- **Customer (Retail)**: Standard end-user pricing for personal top-ups.
- **Agent (Reseller)**: Wholesale discounted pricing for data bundles and higher airtime commission (up to 4.0%), empowering users to start and scale their own VTU data reselling business.
- **Seamless Role Switching**: Easily toggle between Customer and Agent mode with real-time price updates.
- **Reseller Profit Calculator**: Interactive calculator estimating daily and monthly profits based on data volume sold.

### 2. Dual-Engine Wallet System
- **Central Wallet Balance**: Live real-time balance with hide/reveal privacy toggle.
- **Dedicated Virtual Accounts**: Auto-generated personal accounts (Wema Bank, Moniepoint MFB, PalmPay/Squad) for automated bank transfer credits. Includes a live test simulator for immediate testing.
- **Online Payment Gateway**: Instant Card, USSD, and QR payment checkout flow.

### 3. Telecom Services (Active)
- **Data Bundles**:
  - **MTN**: SME Data, Corporate Gifting (CG), Direct Gifting
  - **Airtel**: Corporate Gifting, Direct Gifting
  - **Glo**: Corporate Gifting, Direct Gifting
  - **9mobile**: SME Data, Corporate Gifting
  - **Auto Network Detection**: Automatically selects the telecom network based on the recipient's phone number prefix (e.g. `0803` for MTN, `0802` for Airtel, `0805` for Glo, `0809` for 9mobile).
  - **Beneficiary Memory**: Quickly select recent recipient numbers.
  - **Transaction PIN Protection**: PIN authorization prior to balance deduction.

- **Airtime VTU**:
  - Instant VTU top-up across MTN, Airtel, Glo, and 9mobile.
  - Automatic discount calculations (2.0% - 2.5% for Customers, 3.5% - 4.0% for Agents).

### 4. Bills Payment (Roadmap / Future Phase)
- As specified, cable TV (DSTV, GOTV) and Electricity bills are staged in the **Coming Soon** preview hub, ready for API integration in the next release.

### 5. Receipts & Auditing
- Full transaction statement and audit trail with filtering and search.
- Official printable and shareable **KHERLEED DATA** transaction receipts with reference codes and timestamps.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

---

## 💻 Getting Started

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Run linter:
```bash
npm run lint
```
