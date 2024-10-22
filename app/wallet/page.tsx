'use client'

import dynamic from "next/dynamic";

// Ensure that the imported component resolves correctly
const WalletBalance = dynamic(() => import('./component/WalletBalance').then(mod => mod.default), { ssr: false });

const WalletPage = () => {
  return (
    <div>
      <WalletBalance />
    </div>
  );
};

export default WalletPage;
