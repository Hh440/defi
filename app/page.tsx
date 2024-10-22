'use client'

import '@solana/wallet-adapter-react-ui/styles.css';

import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Homepage from './Components/HomePage';

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-row relative">



      <section className="flex flex-col  w-full gap-5 ml-20">

        <ConnectionProvider endpoint={'https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
           <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
              <Homepage/>

              </WalletModalProvider>
           </WalletProvider>
        </ConnectionProvider>

        

      </section>

    </main>
  );
}
