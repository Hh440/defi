"use client";

import { TransactionTableComponent } from "@/components/transaction-table";
import WalletOverview from "@/components/wallet-overview";

export default function Table() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Wallet Overview */}
            <WalletOverview 
                address="9J569tVBvFCsUGnKwKRp6t5zcnUezAYMRb3cz6oC4rtd"
                balance={72.9969818}
                allocatedDataSize={0}
                assignedProgramId="System Program"
                executable={false}
            />

            {/* Transaction History Heading */}
            <div className="text-2xl font-semibold mt-8 mb-4 text-gray-700">
                Transaction History
            </div>
      <TransactionTableComponent />
    </div>
  );
}
