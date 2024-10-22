'use client'

import dynamic from "next/dynamic";
import '@solana/wallet-adapter-react-ui/styles.css';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Ensure that the imported component resolves correctly
const WalletBalance = dynamic(() => import('@/components/WalletBalance').then(mod => mod.default), { ssr: false });

const WalletPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100" style={{ width: '75vw' }}>
      <ConnectionProvider endpoint={'https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="w-full flex justify-center px-0">
              <div className="w-full max-w-7xl"> {/* Restrict max width if needed */}
                <WalletBalance />
              </div>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default WalletPage;
